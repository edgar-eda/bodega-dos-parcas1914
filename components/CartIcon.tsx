import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCartIcon } from './icons';

const CartIcon: React.FC = () => {
  const { getItemCount } = useCart();
  const { user } = useAuth();
  const itemCount = getItemCount();

  if (!user || itemCount === 0) {
    return null;
  }

  return (
    <Link to="/cart" className="relative p-2">
      <ShoppingCartIcon className="w-7 h-7 text-gray-600" />
      <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-primary text-white text-xs font-bold rounded-full">
        {itemCount}
      </span>
    </Link>
  );
};

export default CartIcon;