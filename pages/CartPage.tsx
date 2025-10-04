import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { PlusIcon, MinusIcon, TrashIcon } from '../components/icons';
import { Tag, X } from 'lucide-react';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, applyCoupon, removeCoupon, appliedCoupon, discount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const subtotal = cartItems.reduce((total, item) => total + (item.promoPrice || item.price) * item.quantity, 0);
  const deliveryFee = 5.00;

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    const result = await applyCoupon(couponCode);
    if (result.success) {
      setCouponMessage({ type: 'success', text: result.message });
    } else {
      setCouponMessage({ type: 'error', text: result.message });
    }
    setTimeout(() => setCouponMessage(null), 3000);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponCode('');
  };
  
  if (!user) {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">Acesso Negado</h1>
            <p className="text-gray-400 mb-8">Você precisa fazer login para ver seu carrinho.</p>
            <Link to="/login" className="bg-accent-red text-accent-cream font-bold py-3 px-6 rounded-full hover:bg-red-700 transition-colors">
            Ir para Login
            </Link>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
        <p className="text-gray-400 mb-8">Que tal adicionar alguns produtos?</p>
        <Link to="/" className="bg-accent-red text-accent-cream font-bold py-3 px-6 rounded-full hover:bg-red-700 transition-colors">
          Continuar comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-accent-cream">Meu Carrinho</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items */}
        <div className="w-full lg:w-2/3 bg-primary-dark rounded-lg shadow-lg p-4 sm:p-6">
          <div className="space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-4 border-b border-green-700 pb-6 last:border-b-0">
                <img src={item.imageUrl} alt={item.name} className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-md self-center sm:self-start" />
                <div className="flex-grow flex flex-col justify-between w-full">
                  <div>
                    <h2 className="font-semibold text-lg text-accent-cream">{item.name}</h2>
                    <p className="text-gray-400 text-sm">{formatCurrency(item.promoPrice || item.price)} / unidade</p>
                  </div>
                  <div className="flex items-center justify-between mt-2 sm:mt-0">
                    <div className="flex items-center border border-green-700 rounded-full">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-gray-400 hover:text-accent-red"><MinusIcon className="w-5 h-5"/></button>
                      <span className="px-3 font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-gray-400 hover:text-accent-red"><PlusIcon className="w-5 h-5"/></button>
                    </div>
                    <p className="font-bold text-lg text-accent-red">{formatCurrency((item.promoPrice || item.price) * item.quantity)}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-accent-red p-2"><TrashIcon className="w-6 h-6"/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-primary-dark rounded-lg shadow-lg p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-4 border-b border-green-700 pb-4">Resumo do Pedido</h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-400">
                  <span>Desconto ({appliedCoupon.code})</span>
                  <span>- {formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Taxa de entrega</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-xl border-t border-green-700 pt-4 mb-6">
              <span>Total</span>
              <span className="text-accent-red">{formatCurrency(getTotalPrice())}</span>
            </div>
            
            {/* Coupon Section */}
            <div className="mb-6">
              {appliedCoupon ? (
                <div className="flex justify-between items-center bg-primary p-3 rounded-md">
                  <p className="text-sm text-emerald-300 flex items-center gap-2"><Tag size={16} /> Cupom <strong>{appliedCoupon.code}</strong> aplicado!</p>
                  <button onClick={handleRemoveCoupon} className="text-red-400 hover:text-red-300"><X size={18} /></button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Cupom de desconto"
                      className="flex-grow bg-primary border border-green-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-red"
                    />
                    <button onClick={handleApplyCoupon} className="bg-accent-yellow text-primary font-bold px-4 rounded-md hover:bg-yellow-500 transition-colors text-sm">Aplicar</button>
                  </div>
                  {couponMessage && (
                    <p className={`text-xs mt-2 ${couponMessage.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {couponMessage.text}
                    </p>
                  )}
                </div>
              )}
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-accent-red text-accent-cream font-bold py-3 rounded-full hover:bg-red-700 transition-colors">
              Finalizar Pedido
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CartPage;