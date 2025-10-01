import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Product } from '../../types';
import { CATEGORIES } from '../../constants';

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
      setImagePreview(productToEdit.imageUrl);
    } else {
      // Reset form for new product
      setProductData({
        name: '', description: '', price: '', promoPrice: '', category: CATEGORIES[0], imageUrl: '', stock: '0',
      });
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
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProductData(prev => ({ ...prev, imageUrl: result }));
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
        ...productData,
        price: parseFloat(productData.price),
        promoPrice: productData.promoPrice ? parseFloat(productData.promoPrice) : undefined,
        stock: parseInt(productData.stock, 10) || 0,
    };
    
    if(productToEdit) {
        updateProduct({ ...formattedData, id: productToEdit.id });
    } else {
        addProduct(formattedData);
    }
    onFormSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="name" placeholder="Nome do Produto" value={productData.name} onChange={handleChange} required className="p-2 border rounded-md w-full" />
        <select name="category" value={productData.category} onChange={handleChange} required className="p-2 border rounded-md w-full">
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <textarea name="description" placeholder="Descrição" value={productData.description} onChange={handleChange} required className="p-2 border rounded-md w-full h-24" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="number" name="price" placeholder="Preço (Ex: 9.99)" value={productData.price} onChange={handleChange} required className="p-2 border rounded-md w-full" step="0.01" />
        <input type="number" name="promoPrice" placeholder="Preço Promocional (Opcional)" value={productData.promoPrice} onChange={handleChange} className="p-2 border rounded-md w-full" step="0.01" />
        <input type="number" name="stock" placeholder="Estoque" value={productData.stock} onChange={handleChange} required className="p-2 border rounded-md w-full" min="0" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Imagem do Produto</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover rounded-md" />}
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button type="button" onClick={onFormSubmit} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300">Cancelar</button>
        <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark">Salvar Produto</button>
      </div>
    </form>
  );
};

export default ProductForm;