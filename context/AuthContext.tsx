import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User, Address } from '../types';
import { supabase } from '@/src/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string, address: Address) => Promise<{ error: any }>;
  updateUserAddress: (address: Address) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await fetchUserProfile(session.user);
      }
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await fetchUserProfile(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      setUser(null);
    } else if (profile) {
      if (profile.is_banned) {
        // If user is banned, log them out immediately.
        await supabase.auth.signOut();
        setUser(null);
        return; // Stop further execution
      }
      setUser({
        id: profile.id,
        name: profile.name,
        email: supabaseUser.email!,
        role: profile.role,
        address: profile.address,
        is_banned: profile.is_banned,
      });
    }
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { error };
    }
    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_banned')
        .eq('id', data.user.id)
        .single();
      
      if (profileError) return { error: profileError };

      if (profile?.is_banned) {
        await supabase.auth.signOut();
        return { error: { message: 'Esta conta foi suspensa.' } };
      }
    }
    return { error: null };
  };
  
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    }
    setUser(null);
  };

  const register = async (name: string, email: string, password: string, address: Address) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          address,
        },
      },
    });
    return { error };
  };

  const updateUserAddress = async (address: Address) => {
    if (!user) {
        const error = { message: "Usuário não autenticado." };
        console.error(error.message);
        return { error };
    }

    const { error } = await supabase
      .from('profiles')
      .update({ address: address })
      .eq('id', user.id);

    if (error) {
        console.error("Erro ao atualizar o endereço:", error);
    } else {
        // Update local state for immediate UI feedback
        setUser(prevUser => prevUser ? { ...prevUser, address } : null);
    }
    return { error };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUserAddress }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};