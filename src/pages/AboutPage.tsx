import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto bg-primary-dark p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-accent-cream mb-6 border-b border-green-700 pb-4">Sobre a Bodega dos Parças</h1>
        
        <div className="space-y-6 text-gray-300">
          <p className="text-lg">
            A Bodega dos Parças nasceu da paixão por celebrar os bons momentos. Seja um happy hour depois do trabalho, um churrasco no fim de semana ou aquela reunião espontânea com os amigos, acreditamos que toda ocasião merece uma bebida gelada, entregue com rapidez e sem complicação.
          </p>
          
          <p>
            Somos mais do que um simples delivery; somos seus parceiros de copo cheio. Nossa missão é garantir que sua única preocupação seja aproveitar o momento. Com um catálogo selecionado das melhores cervejas, destilados, vinhos e refrigerantes, estamos sempre prontos para abastecer a sua festa.
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-accent-cream mb-3">Nossos Valores</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-bold">Velocidade:</span> Entregamos sua bebida na temperatura ideal e no menor tempo possível. Porque sede não espera.</li>
              <li><span className="font-bold">Preço Justo:</span> Oferecemos preços competitivos para que você possa brindar sem pesar no bolso.</li>
              <li><span className="font-bold">Confiança:</span> Somos seus "parças" de confiança. Pode contar com a gente para chegar junto em qualquer ocasião.</li>
              <li><span className="font-bold">Variedade:</span> Do clássico ao artesanal, nosso portfólio é pensado para agradar todos os gostos e sedes.</li>
            </ul>
          </div>

          <p>
            Então, da próxima vez que o copo esvaziar, lembre-se: a Bodega dos Parças está a apenas um clique de distância para salvar a sua celebração.
          </p>

          <p className="font-bold text-center text-accent-red text-xl pt-4">
            Um brinde aos bons momentos! 🍻
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;