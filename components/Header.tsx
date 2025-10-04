import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchIcon } from './icons';
import CartIcon from './CartIcon';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  const { searchTerm, setSearchTerm } = useProducts();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    clearCart();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-primary-dark shadow-lg z-50">
      <div className="container mx-auto px-2 sm:px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Bodega dos Parças Logo" className="h-8 sm:h-10 w-auto" />
          <span className="hidden sm:block text-lg sm:text-2xl font-extrabold text-accent-yellow tracking-tight">
            Bodega dos Parças
          </span>
        </Link>
        <div className="flex-1 max-w-[100px] sm:max-w-xs md:max-w-lg mx-2 sm:mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-primary border-2 border-green-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-accent-yellow transition-colors text-sm sm:text-base text-accent-cream placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {user ? (
            <div className="flex items-center gap-2 sm:gap-4 text-sm">
              <span className="hidden md:inline text-accent-cream">Olá, {user.name.split(' ')[0]}</span>
              {user.role === 'admin' && (
                <Link to="/admin" className="font-semibold text-accent-yellow hover:underline whitespace-nowrap">
                  Admin
                </Link>
              )}
              <button onClick={handleLogout} className="font-semibold text-accent-cream hover:text-accent-yellow">
                Sair
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-accent-yellow text-primary font-bold py-2 px-3 rounded-full hover:bg-yellow-500 transition-colors text-sm whitespace-nowrap">
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