import React, { useState, useEffect } from 'react';
import { supabase } from '@/src/integrations/supabase/client';

interface StaticBannerProps {
  onSeeOffersClick: () => void;
}

const StaticBanner: React.FC<StaticBannerProps> = ({ onSeeOffersClick }) => {
  const [bgImageUrl, setBgImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchBgImage = async () => {
      const { data } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'static_banner_bg_url')
        .single();
      
      if (data && data.value) {
        setBgImageUrl(data.value);
      }
    };
    fetchBgImage();
  }, []);

  const bannerStyle = bgImageUrl ? { backgroundImage: `url(${bgImageUrl})` } : {};

  return (
    <div 
      className={`relative rounded-lg shadow-2xl my-6 p-8 flex flex-col items-center justify-center text-center overflow-hidden min-h-[300px] ${!bgImageUrl ? 'bg-primary-dark' : 'bg-cover bg-center'}`}
      style={bannerStyle}
    >
      {/* Adiciona um overlay escuro para garantir a legibilidade do texto sobre qualquer imagem */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      
      {/* Logo como marca d'água */}
      <img 
        src="/logo.png" 
        alt="" 
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain object-center m-auto opacity-10 z-0"
      />

      {/* Conteúdo do banner fica em um z-index maior */}
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-accent-cream drop-shadow-lg">
          Bebida gelada a preço baixo!
        </h2>
        <p className="text-md md:text-lg text-gray-300 mt-2 mb-6 drop-shadow-md max-w-lg">
          Peça agora e receba em minutos na porta da sua casa.
        </p>
        <button
          onClick={onSeeOffersClick}
          className="bg-primary/80 backdrop-blur-sm hover:bg-primary text-accent-cream font-bold py-3 px-8 rounded-full transition-colors border border-zinc-700"
        >
          Ver Ofertas
        </button>
      </div>
    </div>
  );
};

export default StaticBanner;