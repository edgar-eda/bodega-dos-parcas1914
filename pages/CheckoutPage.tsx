import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { EditIcon } from '../components/icons';
import Modal from '../components/Modal';
import AddressForm from '../components/AddressForm';
import { Address } from '../types';

const WHATSAPP_PHONE_NUMBER = "5581995016183";

const CheckoutPage: React.FC = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, updateUserAddress } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderSent, setOrderSent] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const subtotal = cartItems.reduce((total, item) => total + (item.promoPrice || item.price) * item.quantity, 0);
  const deliveryFee = 5.00;

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleAddressUpdate = async (newAddress: Address) => {
    const { error } = await updateUserAddress(newAddress);
    if (error) {
        alert('Ocorreu um erro ao atualizar o endereço. Tente novamente.');
    } else {
        setIsAddressModalOpen(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Acesso Negado</h1>
        <p className="text-gray-400 mb-8">Você precisa fazer login para finalizar seu pedido.</p>
        <Link to="/login" className="bg-accent-red text-accent-cream font-bold py-3 px-6 rounded-full hover:bg-red-700 transition-colors">
          Ir para Login
        </Link>
      </div>
    );
  }

  const handleSendToWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Seu carrinho está vazio!");
      navigate('/');
      return;
    }
    if (!user.address || !user.address.rua) {
      alert("Endereço de entrega não encontrado! Por favor, adicione um endereço para continuar.");
      setIsAddressModalOpen(true);
      return;
    }

    const itemsList = cartItems.map(item =>
      `*${item.quantity}x* ${item.name} ........ ${formatCurrency((item.promoPrice || item.price) * item.quantity)}`
    ).join('\n');

    const paymentMethodText = {
      card: '💳 Cartão de Crédito/Débito',
      pix: '✨ PIX',
      cash: '💵 Dinheiro'
    }[paymentMethod] || 'Não especificado';

    const address = user.address;
    const addressText = `
${address.rua}, Nº ${address.numero}
${address.bairro} - CEP: ${address.cep}
${address.complemento ? `Comp: ${address.complemento}\n` : ''}${address.referencia ? `Ref: ${address.referencia}\n` : ''}`.trim();

    const message = `
🧾 *=== COMPROVANTE DE PEDIDO ===* 🧾

Olá, *Bodega dos Parças*!
Gostaria de fazer um novo pedido.

🛵 *DETALHES DA ENTREGA*
-----------------------------------
*Endereço:*
${addressText}

📦 *ITENS DO PEDIDO*
-----------------------------------
${itemsList}

💰 *RESUMO FINANCEIRO*
-----------------------------------
Subtotal: ${formatCurrency(subtotal)}
Taxa de Entrega: ${formatCurrency(deliveryFee)}
-----------------------------------
*TOTAL:* *${formatCurrency(getTotalPrice())}*

💳 *FORMA DE PAGAMENTO*
-----------------------------------
${paymentMethodText}

Agradeço e aguardo a confirmação! 😊
    `.trim().replace(/^\s+/gm, '');

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    setOrderSent(true);

    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 5000); // 5 seconds delay
  };

  if (orderSent) {
    return (
      <div className="container mx-auto px-4 py-12 text-center flex flex-col items-center">
        <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
        <h1 className="text-3xl font-bold text-accent-cream mb-4">Pedido Pronto para Envio!</h1>
        <p className="text-gray-400 mb-6 max-w-lg">
          Abrimos o WhatsApp em uma nova aba com sua mensagem de pedido. Por favor, verifique e envie a mensagem para finalizar.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          Seu carrinho será limpo e você será redirecionado para a página inicial em breve.
        </p>
        <Link to="/" className="bg-accent-red text-accent-cream font-bold py-3 px-6 rounded-full hover:bg-red-700 transition-colors">
          Voltar para o Início
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-accent-cream">Finalizar Pedido</h1>
      <form onSubmit={handleSendToWhatsapp} className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-2/3 bg-primary-dark rounded-lg shadow-lg p-6 space-y-6 order-last lg:order-first">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Endereço de Entrega</h2>
              <button type="button" onClick={() => setIsAddressModalOpen(true)} className="flex items-center gap-2 text-sm text-accent-red font-semibold hover:underline">
                <EditIcon className="w-4 h-4" />
                {user.address ? 'Editar' : 'Adicionar'}
              </button>
            </div>
            {user.address && user.address.rua ? (
              <div className="bg-primary p-4 rounded-md text-gray-300 space-y-1">
                <p><strong>Rua:</strong> {user.address.rua}, {user.address.numero}</p>
                <p><strong>Bairro:</strong> {user.address.bairro}</p>
                <p><strong>CEP:</strong> {user.address.cep}</p>
                {user.address.complemento && <p><strong>Complemento:</strong> {user.address.complemento}</p>}
                {user.address.referencia && <p><strong>Referência:</strong> {user.address.referencia}</p>}
              </div>
            ) : (
              <div className="bg-red-900/50 border-l-4 border-red-500 text-red-300 p-4" role="alert">
                <p className="font-bold">Nenhum endereço cadastrado.</p>
                <p>Por favor, adicione um endereço para continuar.</p>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Forma de Pagamento</h2>
            <div className="space-y-2">
              <label className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-accent-red bg-green-900/50 ring-2 ring-accent-red' : 'border-green-700'}`}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={e => setPaymentMethod(e.target.value)} className="mr-3 form-radio bg-primary border-green-600 text-accent-red focus:ring-accent-red" />
                Cartão de Crédito/Débito
              </label>
              <label className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${paymentMethod === 'pix' ? 'border-accent-red bg-green-900/50 ring-2 ring-accent-red' : 'border-green-700'}`}>
                <input type="radio" name="payment" value="pix" checked={paymentMethod === 'pix'} onChange={e => setPaymentMethod(e.target.value)} className="mr-3 form-radio bg-primary border-green-600 text-accent-red focus:ring-accent-red" />
                PIX
              </label>
              <label className={`flex items-center p-4 border rounded-md cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-accent-red bg-green-900/50 ring-2 ring-accent-red' : 'border-green-700'}`}>
                <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={e => setPaymentMethod(e.target.value)} className="mr-3 form-radio bg-primary border-green-600 text-accent-red focus:ring-accent-red" />
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
        <div className="w-full lg:w-1/3">
          <div className="bg-primary-dark rounded-lg shadow-lg p-6 h-fit sticky top-24">
            <h2 className="text-xl font-bold mb-4 border-b border-green-700 pb-4">Resumo Final</h2>
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="flex-1 truncate pr-2">{item.quantity}x {item.name}</span>
                  <span className="flex-shrink-0">{formatCurrency((item.promoPrice || item.price) * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3 mb-4 border-t border-green-700 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa de entrega</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-xl border-t border-green-700 pt-4 mb-6">
              <span>Total a pagar</span>
              <span className="text-accent-red">{formatCurrency(getTotalPrice())}</span>
            </div>
            <button type="submit" className="w-full bg-accent-red text-accent-cream font-bold py-3 rounded-full hover:bg-red-700 transition-colors disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed" disabled={cartItems.length === 0 || !user.address}>
              Enviar Pedido via WhatsApp
            </button>
          </div>
        </div>
      </form>

      <Modal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        title={user.address ? "Editar Endereço" : "Adicionar Endereço"}
      >
        <AddressForm
            initialAddress={user.address}
            onSubmit={handleAddressUpdate}
            onCancel={() => setIsAddressModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default CheckoutPage;