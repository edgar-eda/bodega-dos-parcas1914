import React from 'react';

interface BannerProps {
  onSeeOffersClick: () => void;
}

const Banner: React.FC<BannerProps> = ({ onSeeOffersClick }) => {
  return (
    <div className="bg-primary text-white rounded-lg shadow-lg overflow-hidden my-6">
      <div className="p-6 md:p-12 flex flex-col md:flex-row items-center justify-between bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/seed/banner/1200/400)'}}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center md:text-left flex flex-col items-center md:items-start w-full">
          <img src="/logo.png" alt="Bodega dos Parças" className="h-16 md:h-20 w-auto mb-4" />
          <h2 className="text-2xl md:text-4xl font-extrabold mb-2">Bebida gelada a preço baixo!</h2>
          <p className="text-base md:text-lg mb-6">Peça agora e receba em minutos na porta da sua casa.</p>
          <button 
            onClick={onSeeOffersClick}
            className="bg-white text-primary font-bold py-3 px-6 rounded-full hover:bg-gray-200 transition-transform transform hover:scale-105 w-full sm:w-auto">
            Ver Ofertas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;