import React, { useState, useEffect } from 'react';
import { useCategories } from '../../context/CategoryContext';
import { Category } from '../../types';
import { iconList, IconComponent } from '../IconMap';

interface CategoryFormProps {
  categoryToEdit: Category | null;
  onFormSubmit: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ categoryToEdit, onFormSubmit }) => {
  const { addCategory, updateCategory } = useCategories();
  const [name, setName] = useState('');
  const [iconName, setIconName] = useState(iconList[0]);

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name);
      setIconName(categoryToEdit.icon_name);
    } else {
      setName('');
      setIconName(iconList[0]);
    }
  }, [categoryToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const categoryData = { name, icon_name: iconName };
    
    if (categoryToEdit) {
      updateCategory({ ...categoryData, id: categoryToEdit.id });
    } else {
      addCategory(categoryData);
    }
    onFormSubmit();
  };

  const inputClasses = "bg-primary p-2 border border-green-700 rounded-lg w-full focus:bg-primary-dark focus:border-accent-red focus:ring-0 focus:outline-none placeholder-gray-500 text-accent-cream transition-colors duration-200 ease-in-out";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="name" placeholder="Nome da Categoria" value={name} onChange={(e) => setName(e.target.value)} required className={inputClasses} />
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Ícone</label>
        <div className="flex items-center gap-4">
          <select name="icon_name" value={iconName} onChange={(e) => setIconName(e.target.value)} required className={`${inputClasses} flex-grow`}>
            {iconList.map(icon => <option key={icon} value={icon}>{icon}</option>)}
          </select>
          <div className="p-3 bg-primary rounded-lg border border-green-700">
            <IconComponent name={iconName} className="w-6 h-6 text-accent-cream" />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onFormSubmit} className="bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded-md hover:bg-gray-500">Cancelar</button>
        <button type="submit" className="bg-accent-red text-accent-cream font-bold py-2 px-4 rounded-md hover:bg-red-700">Salvar Categoria</button>
      </div>
    </form>
  );
};

export default CategoryForm;