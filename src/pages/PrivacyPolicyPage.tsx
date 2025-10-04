import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-primary-dark p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-accent-cream mb-6 border-b border-green-700 pb-4">Política de Privacidade</h1>
        <div className="space-y-6 text-gray-300 prose-invert">
          <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <h2 className="text-xl font-semibold text-accent-cream">1. Coleta de Informações</h2>
          <p>Coletamos informações que você nos fornece diretamente ao criar uma conta, como nome, e-mail e endereço. Essas informações são essenciais para processar e entregar seus pedidos.</p>

          <h2 className="text-xl font-semibold text-accent-cream">2. Uso das Informações</h2>
          <p>As informações coletadas são usadas para:</p>
          <ul className="list-disc list-inside">
            <li>Processar e gerenciar seus pedidos.</li>
            <li>Comunicar-se com você sobre seu pedido ou conta.</li>
            <li>Personalizar sua experiência de compra.</li>
            <li>Cumprir requisitos legais e regulatórios.</li>
          </ul>

          <h2 className="text-xl font-semibold text-accent-cream">3. Compartilhamento de Dados</h2>
          <p>A Bodega dos Parças não vende, aluga ou compartilha suas informações pessoais com terceiros para fins de marketing. Seus dados de entrega (nome e endereço) são compartilhados apenas com nossos entregadores para a finalidade exclusiva de realizar a entrega do seu pedido.</p>

          <h2 className="text-xl font-semibold text-accent-cream">4. Segurança dos Dados</h2>
          <p>Implementamos medidas de segurança para proteger suas informações pessoais contra acesso, alteração, divulgação ou destruição não autorizada. Utilizamos a plataforma Supabase, que oferece recursos de segurança robustos para proteger os dados dos usuários.</p>

          <h2 className="text-xl font-semibold text-accent-cream">5. Seus Direitos</h2>
          <p>Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento. Isso pode ser feito através das configurações da sua conta ou entrando em contato conosco.</p>

          <h2 className="text-xl font-semibold text-accent-cream">6. Cookies</h2>
          <p>Nosso site pode usar cookies para melhorar a experiência do usuário, como manter seu carrinho de compras ativo entre as sessões. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar a funcionalidade de algumas partes do nosso site.</p>

          <h2 className="text-xl font-semibold text-accent-cream">7. Alterações na Política</h2>
          <p>Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos sobre quaisquer alterações publicando a nova política nesta página. Recomendamos que você revise esta política regularmente.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;