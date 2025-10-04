import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Product } from '../../types';
import Modal from '../Modal';
import ProductForm from './ProductForm';
import { EditIcon, PlusIcon, TrashIcon } from '../icons';
import { AlertTriangle } from 'lucide-react';

const ProductList: React.FC = () => {
    const { products, deleteProduct } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

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
    
    const handleOpenConfirmModal = (product: Product) => {
        setProductToDelete(product);
        setIsConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        setProductToDelete(null);
        setIsConfirmModalOpen(false);
    };

    const handleConfirmDelete = () => {
        if (productToDelete) {
            deleteProduct(productToDelete.id);
            handleCloseConfirmModal();
        }
    };
    
    const formatCurrency = (value: number) => {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-accent-cream">Produtos</h2>
                <button 
                    onClick={handleOpenModalForAdd}
                    className="flex items-center justify-center sm:justify-start gap-2 bg-accent-yellow text-primary font-bold py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    Adicionar Produto
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-primary-dark">
                    <thead className="bg-primary">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Imagem</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Nome</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Preço</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Estoque</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Categoria</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300">
                        {products.map(product => (
                            <tr key={product.id} className="border-b border-green-700 hover:bg-primary">
                                <td className="py-3 px-4">
                                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                                </td>
                                <td className="py-3 px-4 font-medium text-accent-cream">{product.name}</td>
                                <td className="py-3 px-4">{formatCurrency(product.promoPrice || product.price)}</td>
                                <td className="py-3 px-4">
                                    <span className={`${product.stock <= 10 && product.stock > 0 ? 'text-yellow-400 font-bold' : ''} ${product.stock === 0 ? 'text-red-400 font-bold' : ''}`}>
                                        {product.stock}
                                    </span>
                                </td>
                                <td className="py-3 px-4">{product.category}</td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleOpenModalForEdit(product)} className="text-blue-400 hover:text-blue-300 p-2"><EditIcon className="w-5 h-5" /></button>
                                        <button onClick={() => handleOpenConfirmModal(product)} className="text-red-400 hover:text-red-300 p-2"><TrashIcon className="w-5 h-5" /></button>
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

            <Modal
                isOpen={isConfirmModalOpen}
                onClose={handleCloseConfirmModal}
                title="Confirmar Exclusão"
            >
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-900/50">
                        <AlertTriangle className="h-6 w-6 text-red-400" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg leading-6 font-medium text-accent-cream mt-4">
                        Excluir Produto
                    </h3>
                    <div className="mt-2 px-7 py-3">
                        <p className="text-sm text-gray-400">
                            Tem certeza que deseja excluir o produto <strong>"{productToDelete?.name}"</strong>? Esta ação não pode ser desfeita.
                        </p>
                    </div>
                    <div className="items-center px-4 py-3 gap-4 flex justify-center">
                        <button
                            onClick={handleConfirmDelete}
                            className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Excluir
                        </button>
                        <button
                            onClick={handleCloseConfirmModal}
                            className="px-4 py-2 bg-gray-600 text-gray-100 text-base font-medium rounded-md w-auto shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ProductList;