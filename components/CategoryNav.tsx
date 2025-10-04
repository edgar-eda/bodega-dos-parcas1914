import React from 'react';
import { CATEGORY_DATA } from '../constants';
import { List } from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ selectedCategory, onSelectCategory }) => {
  
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

  return (
    <div className="py-4 sticky top-16 bg-gray-50 z-40 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-2 -mb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
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
      </div>
    </div>
  );
};

export default CategoryNav;