import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { Product } from '../types';
import { supabase } from '@/src/integrations/supabase/client';

interface ProductContextType {
  products: Product[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  addProduct: (productData: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (productData: Product) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } else {
      // Mapeia os nomes das colunas com aspas para camelCase
      const formattedData = data.map(product => ({
        ...product,
        promoPrice: product.promoPrice,
        imageUrl: product.imageUrl
      }));
      setProducts(formattedData as Product[]);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    const { name, description, price, promoPrice, category, imageUrl, stock } = productData;
    const { error } = await supabase.from('products').insert([{ 
        name, 
        description, 
        price, 
        promoPrice, // Supabase lida com undefined como NULL
        category, 
        imageUrl,
        stock
    }]);
    if (error) {
        console.error("Error adding product:", error);
    } else {
        await fetchProducts(); // Re-fetch para atualizar a lista
    }
  };

  const updateProduct = async (productData: Product) => {
    const { id, name, description, price, promoPrice, category, imageUrl, stock } = productData;
    const { error } = await supabase
      .from('products')
      .update({ name, description, price, promoPrice, category, imageUrl, stock })
      .eq('id', id);
    
    if (error) {
        console.error("Error updating product:", error);
    } else {
        await fetchProducts();
    }
  };

  const deleteProduct = async (productId: number) => {
    const { error } = await supabase.from('products').delete().eq('id', productId);
    if (error) {
        console.error("Error deleting product:", error);
    } else {
        await fetchProducts();
    }
  };

  return (
    <ProductContext.Provider value={{ products, searchTerm, setSearchTerm, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};