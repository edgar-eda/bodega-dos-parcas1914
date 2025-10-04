import React from 'react';
import { Link } from 'react-router-dom';

interface BannerProps {
  imageUrl: string;
  linkUrl?: string | null;
}

const Banner: React.FC<BannerProps> = ({ imageUrl, linkUrl }) => {
  const BannerContent = () => (
    <div 
      className="relative bg-cover bg-center rounded-lg shadow-2xl overflow-hidden my-6 min-h-[200px] sm:min-h-[250px] md:min-h-[300px]" 
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Optional: Add an overlay if needed for text readability */}
      {/* <div className="absolute inset-0 bg-black/30"></div> */}
    </div>
  );

  if (linkUrl) {
    // Check if it's an external link
    if (linkUrl.startsWith('http')) {
      return (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          <BannerContent />
        </a>
      );
    }
    // Internal link
    return (
      <Link to={linkUrl}>
        <BannerContent />
      </Link>
    );
  }

  return <BannerContent />;
};

export default Banner;