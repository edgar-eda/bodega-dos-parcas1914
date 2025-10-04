import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { Category } from '../../types';
import { supabase } from '@/src/integrations/supabase/client';

interface CategoryContextType {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  addCategory: (name: string, iconName?: string) => Promise<{ error: any }>;
  updateCategory: (id: string, name: string, iconName?: string) => Promise<{ error: any }>;
  deleteCategory: (id: string) => Promise<{ error: any }>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error);
      return { error };
    } else {
      setCategories(data as Category[]);
      return { error: null };
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = async (name: string, iconName?: string) => {
    const { data, error } = await supabase
      .from('categories')
      .insert([{ name, icon_name: iconName }])
      .select();

    if (error) {
      console.error("Error adding category:", error);
      return { error };
    } else {
      await fetchCategories(); // Re-fetch to update state
      return { error: null };
    }
  };

  const updateCategory = async (id: string, name: string, iconName?: string) => {
    const { data, error } = await supabase
      .from('categories')
      .update({ name, icon_name: iconName })
      .eq('id', id)
      .select();

    if (error) {
      console.error("Error updating category:", error);
      return { error };
    } else {
      await fetchCategories(); // Re-fetch to update state
      return { error: null };
    }
  };

  const deleteCategory = async (id: string) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting category:", error);
      return { error };
    } else {
      await fetchCategories(); // Re-fetch to update state
      return { error: null };
    }
  };

  return (
    <CategoryContext.Provider value={{ categories, fetchCategories, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};