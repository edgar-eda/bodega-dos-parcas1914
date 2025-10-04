import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { PlusIcon, CheckIcon } from './icons';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="bg-primary-dark rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      <Link to={`/product/${product.id}`} className="block group">
        <div className="relative overflow-hidden aspect-square">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          {product.promoPrice && (
            <div className="absolute top-2 right-2 bg-accent-red text-white text-xs font-bold px-2 py-1 rounded-full z-10">PROMO</div>
          )}
        </div>
      </Link>
      <div className="p-2 sm:p-4 flex flex-col flex-grow">
        <h3 className="text-base sm:text-lg font-semibold text-accent-cream mb-1 truncate">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow hidden sm:block">{product.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <div>
            {product.promoPrice ? (
              <>
                <p className="text-base sm:text-lg font-bold text-accent-yellow">{formatCurrency(product.promoPrice)}</p>
                <p className="text-xs sm:text-sm text-gray-500 line-through">{formatCurrency(product.price)}</p>
              </>
            ) : (
              <p className="text-base sm:text-lg font-bold text-accent-cream">{formatCurrency(product.price)}</p>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full font-bold transition-all duration-300 ${isAdded ? 'bg-emerald-500 text-white' : 'bg-accent-yellow hover:bg-yellow-500 text-primary'}`}
            aria-label={isAdded ? "Adicionado" : "Adicionar ao carrinho"}
          >
            {isAdded ? <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6" /> : <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;