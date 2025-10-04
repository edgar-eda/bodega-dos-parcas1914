export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  promoPrice?: number;
  category: string;
  imageUrl: string;
  stock: number;
  specifications?: { [key: string]: string };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Address {
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  referencia?: string;
}

export interface User {
  id: string; // Changed from number to string for Supabase UUID
  name: string;
  email: string;
  role: 'client' | 'admin';
  address?: Address;
  is_banned?: boolean;
}