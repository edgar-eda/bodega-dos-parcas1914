import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Product } from '../../types';
import { CATEGORIES } from '../../constants';
import { PlusIcon, TrashIcon } from '../icons';

interface ProductFormProps {
  productToEdit: Product | null;
  onFormSubmit: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ productToEdit, onFormSubmit }) => {
  const { addProduct, updateProduct } = useProducts();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    promoPrice: '',
    category: CATEGORIES[0],
    imageUrl: '',
    stock: '0',
  });
  const [specifications, setSpecifications] = useState<{ key: string; value: string }[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (productToEdit) {
      setProductData({
        name: productToEdit.name,
        description: productToEdit.description,
        price: productToEdit.price.toString(),
        promoPrice: productToEdit.promoPrice?.toString() || '',
        category: productToEdit.category,
        imageUrl: productToEdit.imageUrl,
        stock: productToEdit.stock.toString(),
      });
      setSpecifications(productToEdit.specifications ? Object.entries(productToEdit.specifications).map(([key, value]) => ({ key, value })) : []);
      setImagePreview(productToEdit.imageUrl);
      setImageFile(null);
    } else {
      // Reset form for new product
      setProductData({
        name: '', description: '', price: '', promoPrice: '', category: CATEGORIES[0], imageUrl: '', stock: '0',
      });
      setSpecifications([]);
      setImageFile(null);
      setImagePreview(null);
    }
  }, [productToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = value;
    setSpecifications(newSpecs);
  };

  const addSpecField = () => {
    setSpecifications([...specifications, { key: '', value: '' }]);
  };

  const removeSpecField = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const specsObject = specifications.reduce((obj, item) => {
        if (item.key) obj[item.key] = item.value;
        return obj;
    }, {} as { [key: string]: string });

    const formattedData = {
        ...productData,
        price: parseFloat(productData.price),
        promoPrice: productData.promoPrice ? parseFloat(productData.promoPrice) : undefined,
        stock: parseInt(productData.stock, 10) || 0,
        specifications: specsObject,
    };
    
    if(productToEdit) {
        updateProduct({ ...formattedData, id: productToEdit.id }, imageFile);
    } else {
        addProduct(formattedData, imageFile);
    }
    onFormSubmit();
  };

  const inputClasses = "bg-primary-dark p-2 border border-green-700 rounded-md w-full focus:ring-2 focus:ring-accent-red focus:outline-none placeholder-gray-400 text-accent-cream";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="name" placeholder="Nome do Produto" value={productData.name} onChange={handleChange} required className={inputClasses} />
        <select name="category" value={productData.category} onChange={handleChange} required className={inputClasses}>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <textarea name="description" placeholder="Descrição" value={productData.description} onChange={handleChange} required className={`${inputClasses} h-24`} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="number" name="price" placeholder="Preço (Ex: 9.99)" value={productData.price} onChange={handleChange} required className={inputClasses} step="0.01" />
        <input type="number" name="promoPrice" placeholder="Preço Promocional (Opcional)" value={productData.promoPrice} onChange={handleChange} className={inputClasses} step="0.01" />
        <input type="number" name="stock" placeholder="Estoque" value={productData.stock} onChange={handleChange} required className={inputClasses} min="0" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">Especificações</h3>
        <div className="space-y-2">
          {specifications.map((spec, index) => (
            <div key={index} className="flex items-center gap-2">
              <input type="text" placeholder="Nome (Ex: Volume)" value={spec.key} onChange={(e) => handleSpecChange(index, 'key', e.target.value)} className={inputClasses} />
              <input type="text" placeholder="Valor (Ex: 350ml)" value={spec.value} onChange={(e) => handleSpecChange(index, 'value', e.target.value)} className={inputClasses} />
              <button type="button" onClick={() => removeSpecField(index)} className="p-2 text-red-400 hover:text-red-300"><TrashIcon className="w-5 h-5"/></button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addSpecField} className="mt-2 flex items-center gap-2 text-sm text-accent-red font-semibold hover:underline">
          <PlusIcon className="w-4 h-4" /> Adicionar Especificação
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Imagem do Produto</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent-red/10 file:text-accent-red hover:file:bg-accent-red/20"/>
        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-md" />}
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onFormSubmit} className="bg-gray-600 text-gray-100 font-bold py-2 px-4 rounded-md hover:bg-gray-500">Cancelar</button>
        <button type="submit" className="bg-accent-red text-accent-cream font-bold py-2 px-4 rounded-md hover:bg-red-700">Salvar Produto</button>
      </div>
    </form>
  );
};

export default ProductForm;