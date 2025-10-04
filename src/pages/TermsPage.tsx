import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Termos de Serviço</h1>
        <div className="space-y-6 text-gray-700 prose">
          <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <h2 className="text-xl font-semibold">1. Aceitação dos Termos</h2>
          <p>Ao acessar e usar o serviço da Bodega dos Parças, você concorda em cumprir e estar vinculado a estes Termos de Serviço. Se você não concorda com estes termos, por favor, não use nossos serviços.</p>

          <h2 className="text-xl font-semibold">2. Restrição de Idade</h2>
          <p>Nossos serviços destinam-se exclusivamente a usuários com 18 anos de idade ou mais. Ao fazer um pedido, você confirma que possui idade legal para consumir bebidas alcoólicas. Nossos entregadores estão autorizados a solicitar um documento de identificação no momento da entrega.</p>

          <h2 className="text-xl font-semibold">3. Pedidos e Pagamentos</h2>
          <p>Todos os pedidos são finalizados através do WhatsApp para garantir um contato direto e eficiente. As formas de pagamento aceitas (Cartão, PIX, Dinheiro) são processadas no momento da entrega. Os preços dos produtos e taxas de entrega estão sujeitos a alterações sem aviso prévio.</p>

          <h2 className="text-xl font-semibold">4. Entrega</h2>
          <p>Nosso objetivo é entregar seu pedido o mais rápido possível dentro de nossa área de cobertura. Os tempos de entrega são estimativas e podem variar devido a fatores externos como trânsito e condições climáticas. Não nos responsabilizamos por entregas em endereços fornecidos incorretamente pelo usuário.</p>

          <h2 className="text-xl font-semibold">5. Conduta do Usuário</h2>
          <p>Você concorda em não usar nosso serviço para fins ilegais ou não autorizados. O fornecimento de informações falsas, incluindo comprovante de idade, resultará na suspensão da sua conta e no cancelamento do pedido.</p>

          <h2 className="text-xl font-semibold">6. Limitação de Responsabilidade</h2>
          <p>A Bodega dos Parças não será responsável por quaisquer danos diretos ou indiretos resultantes do uso ou da incapacidade de usar nosso serviço. Beba com moderação. Se beber, não dirija.</p>

          <h2 className="text-xl font-semibold">7. Alterações nos Termos</h2>
          <p>Reservamo-nos o direito de modificar estes Termos de Serviço a qualquer momento. A versão mais recente estará sempre disponível em nosso site. O uso contínuo do serviço após quaisquer alterações constitui sua aceitação dos novos termos.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;