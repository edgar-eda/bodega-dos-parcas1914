import React from 'react';
import { CATEGORIES } from '../constants';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ selectedCategory, onSelectCategory }) => {
  const getButtonClasses = (category: string) => {
    const baseClasses = "px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2";
    if (selectedCategory === category) {
      return `${baseClasses} bg-primary text-white shadow-md`;
    }
    return `${baseClasses} bg-white text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-100 hover:shadow-md`;
  };

  return (
    <div className="py-4 sticky top-16 bg-gray-50 z-40 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-2 -mb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <button
            onClick={() => onSelectCategory("Todos")}
            className={getButtonClasses("Todos")}
          >
            Todos
          </button>
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={getButtonClasses(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;