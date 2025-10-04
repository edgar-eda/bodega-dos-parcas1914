import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { PlusIcon, MinusIcon, ChevronLeftIcon, CheckIcon } from '../components/icons';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { products } = useProducts();
  const product = products.find(p => p.id === Number(productId));
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Produto não encontrado</h2>
        <Link to="/" className="text-accent-yellow hover:underline mt-4 inline-block">Voltar para o início</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
        setIsAdded(false);
        navigate('/');
    }, 2000);
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const hasSpecifications = product.specifications && Object.keys(product.specifications).length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-300 hover:text-accent-yellow mb-6 font-semibold">
        <ChevronLeftIcon className="w-5 h-5" />
        Voltar
      </button>
      <div className="bg-primary-dark rounded-lg shadow-lg p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto rounded-lg object-cover aspect-square" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-sm font-semibold text-accent-yellow mb-2">{product.category}</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-accent-cream mb-4">{product.name}</h1>
            <p className="text-gray-400 mb-6">{product.description}</p>
            
            {hasSpecifications && (
              <div className="mb-6 border-t border-b border-green-700 py-4">
                <h3 className="text-lg font-semibold text-accent-cream mb-3">Detalhes</h3>
                <ul className="space-y-2 text-gray-300">
                  {Object.entries(product.specifications!).map(([key, value]) => (
                    <li key={key} className="flex justify-between">
                      <span className="font-semibold">{key}:</span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-6">
              {product.promoPrice ? (
                <div className="flex items-baseline gap-3">
                  <p className="text-3xl font-bold text-accent-yellow">{formatCurrency(product.promoPrice)}</p>
                  <p className="text-xl text-gray-500 line-through">{formatCurrency(product.price)}</p>
                </div>
              ) : (
                <p className="text-3xl font-bold text-accent-cream">{formatCurrency(product.price)}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <label className="font-semibold whitespace-nowrap">Quantidade:</label>
              <div className="flex items-center border border-green-700 rounded-full">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 sm:p-3 text-gray-400 hover:text-accent-yellow"><MinusIcon className="w-5 h-5"/></button>
                <span className="px-4 font-bold text-lg">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="p-2 sm:p-3 text-gray-400 hover:text-accent-yellow"><PlusIcon className="w-5 h-5"/></button>
              </div>
            </div>

            <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center py-3 px-6 rounded-full font-bold text-lg transition-all duration-300 ${isAdded ? 'bg-emerald-500 text-white' : 'bg-accent-yellow text-primary hover:bg-yellow-500'}`}
            >
              {isAdded ? (
                <>
                  <CheckIcon className="w-6 h-6 mr-2" /> Adicionado!
                </>
              ) : (
                'Adicionar ao Carrinho'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;