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
      flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap 
      transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 
      focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-50
    `;
    if (isActive) {
      return `${baseClasses} bg-primary text-white shadow-lg shadow-primary/40 scale-105`;
    }
    return `${baseClasses} bg-white text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-100 hover:shadow-md hover:-translate-y-0.5`;
  };

  const checkScrollability = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setCanScrollLeft(el.scrollLeft > 0);
      // A small buffer (1px) helps with precision issues in some browsers
      setCanScrollRight(hasOverflow && el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      checkScrollability();
      el.addEventListener('scroll', checkScrollability, { passive: true });
      window.addEventListener('resize', checkScrollability);
      
      const resizeObserver = new ResizeObserver(checkScrollability);
      resizeObserver.observe(el);

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
      const scrollAmount = el.clientWidth * 0.8; // Scroll by 80% of the visible width
      el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const ScrollButton = ({ direction, onClick }: { direction: 'left' | 'right', onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`absolute ${direction === 'left' ? 'left-0 -ml-2' : 'right-0 -mr-2'} top-1/2 -translate-y-1/2 z-10
                 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-md border border-gray-200
                 hover:bg-white transition-all duration-200
                 sm:hidden`}
      aria-label={`Scroll ${direction}`}
    >
      {direction === 'left' ? <ChevronLeft className="w-5 h-5 text-gray-700" /> : <ChevronRight className="w-5 h-5 text-gray-700" />}
    </button>
  );

  return (
    <div className="py-4 sticky top-16 bg-gray-50 z-40 border-b border-gray-200">
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
          {canScrollLeft && <ScrollButton direction="left" onClick={() => scroll('left')} />}
          {canScrollRight && <ScrollButton direction="right" onClick={() => scroll('right')} />}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;