import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { Product } from '../types';
import { supabase } from '@/src/integrations/supabase/client';

interface ProductContextType {
  products: Product[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  addProduct: (productData: Omit<Product, 'id'>, imageFile: File | null) => Promise<void>;
  updateProduct: (productData: Product, imageFile: File | null) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('product_images')
        .upload(filePath, file);

    if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return null;
    }

    const { data } = supabase.storage
        .from('product_images')
        .getPublicUrl(filePath);

    return data.publicUrl;
};

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
      setProducts(data.map(p => ({...p, imageUrl: p.image_url, promoPrice: p.promo_price })) as Product[]);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (productData: Omit<Product, 'id'>, imageFile: File | null) => {
    let imageUrl = productData.imageUrl || '';

    if (imageFile) {
        const newImageUrl = await uploadImage(imageFile);
        if (newImageUrl) {
            imageUrl = newImageUrl;
        } else {
            console.error("Image upload failed, aborting product creation.");
            return;
        }
    }

    const { name, description, price, promoPrice, category, stock } = productData;
    const { error } = await supabase.from('products').insert([{ 
        name, 
        description, 
        price, 
        promo_price: promoPrice,
        category, 
        image_url: imageUrl,
        stock
    }]);
    if (error) {
        console.error("Error adding product:", error);
    } else {
        await fetchProducts();
    }
  };

  const updateProduct = async (productData: Product, imageFile: File | null) => {
    let imageUrl = productData.imageUrl;

    if (imageFile) {
        const newImageUrl = await uploadImage(imageFile);
        if (newImageUrl) {
            imageUrl = newImageUrl;
        } else {
            console.error("Image upload failed, aborting product update.");
            return;
        }
    }

    const { id, name, description, price, promoPrice, category, stock } = productData;
    const { error } = await supabase
      .from('products')
      .update({ name, description, price, promo_price: promoPrice, category, image_url: imageUrl, stock })
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