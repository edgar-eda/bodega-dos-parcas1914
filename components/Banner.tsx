import React from 'react';

interface BannerProps {
  onSeeOffersClick: () => void;
}

const Banner: React.FC<BannerProps> = ({ onSeeOffersClick }) => {
  return (
    <div 
      className="relative text-white rounded-lg shadow-2xl overflow-hidden my-6 bg-cover bg-center" 
      // TODO: Você pode trocar a URL da imagem de fundo aqui. Recomendo usar imagens do Unsplash.com para alta qualidade.
      // Image of a shelf with various drinks, fitting the "bodega" theme
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1586968055324-e2d0456a0e75?q=80&w=1200&auto=format&fit=crop)' }}
    >
      {/* Grey overlay with blur effect */}
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"></div>
      
      <div className="relative p-8 md:p-12 flex flex-col items-center justify-center text-center min-h-[350px] md:min-h-[400px]">
        <img 
          src="/logo.png" 
          alt="Bodega dos Parças" 
          className="h-28 md:h-32 w-auto mb-6 drop-shadow-lg"
        />
        <h2 className="text-3xl md:text-5xl font-extrabold mb-3 drop-shadow-md">
          Bebida gelada a preço baixo!
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-sm">
          Peça agora e receba em minutos na porta da sua casa.
        </p>
        <button 
          onClick={onSeeOffersClick}
          className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-dark transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
        >
          Ver Ofertas
        </button>
      </div>
    </div>
  );
};

export default Banner;