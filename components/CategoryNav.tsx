import React, { useRef, useState, useEffect } from 'react';
import { CATEGORY_DATA } from '../constants';
import { List, ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ selectedCategory, onSelectCategory }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const getButtonClasses = (isActive: boolean) => {
    const baseClasses = `
      flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap flex-shrink-0
      transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 
      focus:ring-accent-yellow focus:ring-offset-2 focus:ring-offset-primary
    `;
    if (isActive) {
      return `${baseClasses} bg-accent-yellow text-primary shadow-lg shadow-yellow-900/40 scale-105`;
    }
    return `${baseClasses} bg-primary-dark text-accent-cream shadow-sm border border-green-700 hover:bg-green-900 hover:shadow-md hover:-translate-y-0.5`;
  };

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      // Initial check
      checkScrollability();

      // Listeners
      el.addEventListener('scroll', checkScrollability, { passive: true });
      window.addEventListener('resize', checkScrollability);
      
      const resizeObserver = new ResizeObserver(checkScrollability);
      resizeObserver.observe(el);

      // Cleanup
      return () => {
        el.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
        resizeObserver.disconnect();
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollAmount = el.clientWidth * 0.8;
      el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const ScrollButton = ({ direction, onClick, disabled }: { direction: 'left' | 'right', onClick: () => void, disabled: boolean }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute ${direction === 'left' ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 z-10
                 bg-primary-dark/80 backdrop-blur-sm rounded-full p-1 shadow-md border border-green-700
                 hover:bg-primary-dark transition-all duration-200
                 disabled:opacity-0 disabled:pointer-events-none
                 sm:hidden`}
      aria-label={`Scroll ${direction}`}
    >
      {direction === 'left' ? <ChevronLeft className="w-5 h-5 text-accent-cream" /> : <ChevronRight className="w-5 h-5 text-accent-cream" />}
    </button>
  );

  return (
    <div className="py-4 sticky top-16 bg-primary z-40 border-b border-green-700">
      <div className="container mx-auto px-4">
        <div className="relative">
          <div 
            ref={scrollContainerRef} 
            className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-2 -mb-2 
                       [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
          >
            <button
              onClick={() => onSelectCategory("Todos")}
              className={getButtonClasses(selectedCategory === "Todos")}
            >
              <List className="w-4 h-4" />
              <span>Todos</span>
            </button>
            {CATEGORY_DATA.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => onSelectCategory(name)}
                className={getButtonClasses(selectedCategory === name)}
              >
                <Icon className="w-4 h-4" />
                <span>{name}</span>
              </button>
            ))}
          </div>
          <ScrollButton direction="left" onClick={() => scroll('left')} disabled={!canScrollLeft} />
          <ScrollButton direction="right" onClick={() => scroll('right')} disabled={!canScrollRight} />
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;