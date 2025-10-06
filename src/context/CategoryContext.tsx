import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { Category } from '../types';
import { supabase } from '@/src/integrations/supabase/client';

interface CategoryContextType {
  categories: Category[];
  addCategory: (categoryData: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (categoryData: Category) => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;
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
      setCategories([]);
    } else {
      setCategories(data as Category[]);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = async (categoryData: Omit<Category, 'id'>) => {
    const { error } = await supabase.from('categories').insert([categoryData]);
    if (error) {
      console.error("Error adding category:", error);
    } else {
      await fetchCategories();
    }
  };

  const updateCategory = async (categoryData: Category) => {
    const { id, ...updateData } = categoryData;
    const { error } = await supabase
      .from('categories')
      .update(updateData)
      .eq('id', id);
    
    if (error) {
      console.error("Error updating category:", error);
    } else {
      await fetchCategories();
    }
  };

  const deleteCategory = async (categoryId: string) => {
    const { error } = await supabase.from('categories').delete().eq('id', categoryId);
    if (error) {
      console.error("Error deleting category:", error);
    } else {
      await fetchCategories();
    }
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory }}>
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