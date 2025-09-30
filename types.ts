export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  promoPrice?: number;
  category: string;
  imageUrl: string;
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
  id: number;
  name: string;
  email: string;
  password?: string; // Password is optional for client-side representation
  role: 'client' | 'admin';
  address?: Address;
}