import React, { useState, useEffect } from 'react';
import { useCategories } from '../../context/CategoryContext';
import { Category } from '../../../types';
import { getLucideIcon, availableIconNames } from '../../lib/lucide-icon-map';

interface CategoryFormProps {
  categoryToEdit?: Category | null;
  onFormSubmit: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ categoryToEdit, onFormSubmit }) => {
  const { addCategory, updateCategory } = useCategories();
  const [name, setName] = useState('');
  const [iconName, setIconName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name);
      setIconName(categoryToEdit.icon_name || '');
    } else {
      setName('');
      setIconName('');
    }
  }, [categoryToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('O nome da categoria é obrigatório.');
      return;
    }

    let result;
    if (categoryToEdit) {
      result = await updateCategory(categoryToEdit.id, name, iconName);
    } else {
      result = await addCategory(name, iconName);
    }

    if (result.error) {
      setError(result.error.message || 'Ocorreu um erro ao salvar a categoria.');
    } else {
      onFormSubmit();
    }
  };

  const inputClasses = "bg-primary p-2 border border-green-700 rounded-md w-full focus:ring-2 focus:ring-accent-red focus:outline-none placeholder-gray-400 text-accent-cream";
  const IconComponent = getLucideIcon(iconName);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="category-name" className="block text-sm font-medium text-gray-300 mb-1">Nome da Categoria</label>
        <input
          id="category-name"
          type="text"
          name="name"
          placeholder="Ex: Cervejas, Refrigerantes"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="icon-name" className="block text-sm font-medium text-gray-300 mb-1">Ícone (Nome Lucide React)</label>
        <div className="flex items-center gap-2">
          <select
            id="icon-name"
            name="iconName"
            value={iconName}
            onChange={(e) => setIconName(e.target.value)}
            className={inputClasses}
          >
            <option value="">Nenhum Ícone</option>
            {availableIconNames.map((icon) => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
          {IconComponent && <IconComponent className="w-6 h-6 text-accent-cream" />}
        </div>
        <p className="text-xs text-gray-500 mt-1">Escolha um ícone da biblioteca Lucide React. Ex: Beer, CupSoda, GlassWater.</p>
      </div>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onFormSubmit} className="bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded-md hover:bg-gray-500">Cancelar</button>
        <button type="submit" className="bg-accent-red text-accent-cream font-bold py-2 px-4 rounded-md hover:bg-red-700">
          {categoryToEdit ? 'Atualizar Categoria' : 'Adicionar Categoria'}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;