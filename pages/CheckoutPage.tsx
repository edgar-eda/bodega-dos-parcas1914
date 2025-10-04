import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const subtotal = cartItems.reduce((total, item) => total + (item.promoPrice || item.price) * item.quantity, 0);
  const deliveryFee = 5.00;

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };
  
  if (!user) {
    return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Acesso Negado</h1>
            <p className="text-gray-600 mb-8">Você precisa fazer login para finalizar seu pedido.</p>
            <Link to="/login" className="bg-primary text-white font-bold py-3 px-6 rounded-full hover:bg-primary-dark transition-colors">
            Ir para Login
            </Link>
      </div>
    )
  }

  const handleSendToWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
        alert("Seu carrinho está vazio!");
        navigate('/');
        return;
    }
    if (!user.address) {
        alert("Endereço de entrega não encontrado! Por favor, atualize seu cadastro.");
        // In a real app, you might redirect to a profile page.
        return;
    }

    const itemsList = cartItems.map(item => 
        `- ${item.quantity}x ${item.name} - ${formatCurrency((item.promoPrice || item.price) * item.quantity)}`
    ).join('\n');

    const paymentMethodText = {
        card: 'Cartão de Crédito/Débito',
        pix: 'PIX',
        cash: 'Dinheiro'
    }[paymentMethod] || 'Não especificado';

    const address = user.address;
    const addressText = `
Rua: ${address.rua}, Nº ${address.numero}
Bairro: ${address.bairro}
CEP: ${address.cep}
${address.complemento ? `Complemento: ${address.complemento}\n` : ''}${address.referencia ? `Referência: ${address.referencia}\n` : ''}`.trim();

    const message = `
Olá, Bodega dos Parças! 👋

Gostaria de fazer o seguinte pedido:

*Itens:*
${itemsList}

*Resumo:*
Subtotal: ${formatCurrency(subtotal)}
Taxa de entrega: ${formatCurrency(deliveryFee)}
*Total a pagar: ${formatCurrency(getTotalPrice())}*

*Endereço de Entrega:*
${addressText}

*Forma de Pagamento:*
${paymentMethodText}

Aguardando confirmação! 😊
    `.trim().replace(/^\s+/gm, '');
    
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "5581995016183";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
        clearCart();
        navigate('/');
    }, 500);
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Finalizar Pedido</h1>
      <form onSubmit={handleSendToWhatsapp} className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Form Section */}
        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-lg p-6 space-y-6 order-last lg:order-first">
          <div>
            <h2 className="text-xl font-bold mb-4">Endereço de Entrega</h2>
            {user.address ? (
                <div className="bg-gray-100 p-4 rounded-md text-gray-700 space-y-1">
                    <p><strong>Rua:</strong> {user.address.rua}, {user.address.numero}</p>
                    <p><strong>Bairro:</strong> {user.address.bairro}</p>
                    <p><strong>CEP:</strong> {user.address.cep}</p>
                    {user.address.complemento && <p><strong>Complemento:</strong> {user.address.complemento}</p>}
                    {user.address.referencia && <p><strong>Referência:</strong> {user.address.referencia}</p>}
                </div>
            ) : (
                <p className="text-red-500">Nenhum endereço cadastrado.</p>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Forma de Pagamento</h2>
            <div className="space-y-2">
              <label className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-green-50 ring-2 ring-primary' : ''}`}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={e => setPaymentMethod(e.target.value)} className="mr-3" />
                Cartão de Crédito/Débito
              </label>
              <label className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${paymentMethod === 'pix' ? 'border-primary bg-green-50 ring-2 ring-primary' : ''}`}>
                <input type="radio" name="payment" value="pix" checked={paymentMethod === 'pix'} onChange={e => setPaymentMethod(e.target.value)} className="mr-3" />
                PIX
              </label>
              <label className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-primary bg-green-50 ring-2 ring-primary' : ''}`}>
                <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={e => setPaymentMethod(e.target.value)} className="mr-3" />
                Dinheiro
              </label>
            </div>
          </div>
          {paymentMethod === 'card' && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Dados do Cartão</h3>
              <p className="text-sm text-gray-500">O pagamento será realizado na entrega.</p>
            </div>
          )}
        </div>
        
        {/* Summary Section */}
        <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-4 border-b pb-4">Resumo Final</h2>
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-2">
                {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                        <span className="flex-1 truncate pr-2">{item.quantity}x {item.name}</span>
                        <span className="flex-shrink-0">{formatCurrency((item.promoPrice || item.price) * item.quantity)}</span>
                    </div>
                ))}
            </div>
            <div className="space-y-3 mb-4 border-t pt-4">
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
                <span>Total a pagar</span>
                <span>{formatCurrency(getTotalPrice())}</span>
            </div>
            <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-full hover:bg-primary-dark transition-colors disabled:bg-gray-400" disabled={cartItems.length === 0}>
                Enviar Pedido via WhatsApp
            </button>
            </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;