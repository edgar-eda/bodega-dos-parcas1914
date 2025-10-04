import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Product } from '../../types';
import Modal from '../Modal';
import ProductForm from './ProductForm';
import { EditIcon, PlusIcon, TrashIcon } from '../icons';

const ProductList: React.FC = () => {
    const { products, deleteProduct } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleOpenModalForAdd = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleOpenModalForEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };
    
    const handleDelete = (productId: number) => {
        if (window.confirm("Tem certeza que deseja excluir este produto?")) {
            deleteProduct(productId);
        }
    }
    
    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Produtos</h2>
                <button 
                    onClick={handleOpenModalForAdd}
                    className="flex items-center justify-center sm:justify-start gap-2 bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    Adicionar Produto
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Imagem</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nome</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Preço</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Estoque</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Categoria</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {products.map(product => (
                            <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4">
                                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                                </td>
                                <td className="py-3 px-4 font-medium">{product.name}</td>
                                <td className="py-3 px-4">{formatCurrency(product.promoPrice || product.price)}</td>
                                <td className="py-3 px-4">
                                    <span className={`${product.stock <= 10 && product.stock > 0 ? 'text-yellow-600 font-bold' : ''} ${product.stock === 0 ? 'text-red-600 font-bold' : ''}`}>
                                        {product.stock}
                                    </span>
                                </td>
                                <td className="py-3 px-4">{product.category}</td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleOpenModalForEdit(product)} className="text-blue-500 hover:text-blue-700 p-2"><EditIcon className="w-5 h-5" /></button>
                                        <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700 p-2"><TrashIcon className="w-5 h-5" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                title={editingProduct ? "Editar Produto" : "Adicionar Novo Produto"}
            >
                <ProductForm productToEdit={editingProduct} onFormSubmit={handleCloseModal} />
            </Modal>
        </div>
    );
};

export default ProductList;