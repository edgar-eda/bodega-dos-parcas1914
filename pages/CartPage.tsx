import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { PlusIcon, MinusIcon, TrashIcon } from '../components/icons';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((total, item) => total + (item.promoPrice || item.price) * item.quantity, 0);
  const deliveryFee = 5.00;

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  if (!user) {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Acesso Negado</h1>
            <p className="text-gray-600 mb-8">Você precisa fazer login para ver seu carrinho.</p>
            <Link to="/login" className="bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-primary-dark transition-colors">
            Ir para Login
            </Link>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
        <p className="text-gray-600 mb-8">Que tal adicionar alguns produtos?</p>
        <Link to="/" className="bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-primary-dark transition-colors">
          Continuar comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800">Meu Carrinho</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items */}
        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-4 border-b pb-6 last:border-b-0">
                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md self-center sm:self-start" />
                <div className="flex-grow flex flex-col justify-between w-full">
                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-gray-600 text-sm">{formatCurrency(item.promoPrice || item.price)} / unidade</p>
                  </div>
                  <div className="flex items-center justify-between mt-2 sm:mt-0">
                    <div className="flex items-center border border-gray-300 rounded-full">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-gray-600 hover:text-primary"><MinusIcon className="w-5 h-5"/></button>
                      <span className="px-3 font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-gray-600 hover:text-primary"><PlusIcon className="w-5 h-5"/></button>
                    </div>
                    <p className="font-bold text-lg">{formatCurrency((item.promoPrice || item.price) * item.quantity)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500 p-2"><TrashIcon className="w-6 h-6"/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-4 border-b pb-4">Resumo do Pedido</h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de entrega</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-4 mb-6">
              <span>Total</span>
              <span>{formatCurrency(getTotalPrice())}</span>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary text-white font-bold py-3 rounded-full hover:bg-primary-dark transition-colors">
              Finalizar Pedido
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;