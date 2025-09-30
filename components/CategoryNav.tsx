
import React from 'react';
import { CATEGORIES } from '../constants';

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="py-4 sticky top-16 bg-gray-50 z-40 border-b">
      <div className="container mx-auto px-4">
        <div className="flex space-x-4 overflow-x-auto pb-2 -mb-2">
          <button
            onClick={() => onSelectCategory("Todos")}
            className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${selectedCategory === "Todos" ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
          >
            Todos
          </button>
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-colors ${selectedCategory === category ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
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
