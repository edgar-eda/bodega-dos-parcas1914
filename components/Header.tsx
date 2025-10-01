import React from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from './icons';
import CartIcon from './CartIcon';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  const { searchTerm, setSearchTerm } = useProducts();

  const handleLogout = () => {
    clearCart();
    logout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-2 sm:px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-extrabold text-emerald-900 tracking-tight">
            Bodega dos Parças
          </span>
        </Link>
        <div className="flex-1 max-w-xs sm:max-w-lg mx-2 sm:mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-gray-100 border-2 border-gray-200 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-4">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-4 text-sm">
              <span className="hidden md:inline">Olá, {user.name.split(' ')[0]}</span>
              {user.role === 'admin' && (
                <Link to="/admin" className="font-semibold text-primary hover:underline whitespace-nowrap">
                  Admin
                </Link>
              )}
              <button onClick={handleLogout} className="font-semibold text-gray-600 hover:text-primary">
                Sair
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-primary text-white font-bold py-2 px-3 sm:px-4 rounded-full hover:bg-primary-dark transition-colors text-sm whitespace-nowrap">
              Entrar
            </Link>
          )}
          <CartIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;