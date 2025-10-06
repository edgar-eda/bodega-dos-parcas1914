import React, { useState } from 'react';
import { useCategories } from '../../context/CategoryContext';
import { Category } from '../../types';
import Modal from '../Modal';
import CategoryForm from './CategoryForm';
import { IconComponent } from '../IconMap';
import { EditIcon, PlusIcon, TrashIcon } from '../icons';
import { AlertTriangle } from 'lucide-react';

const CategoryList: React.FC = () => {
    const { categories, deleteCategory } = useCategories();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const handleOpenModalForAdd = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const handleOpenModalForEdit = (category: Category) => {
        setEditingCategory(category);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
    };
    
    const handleOpenConfirmModal = (category: Category) => {
        setCategoryToDelete(category);
        setIsConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        setCategoryToDelete(null);
        setIsConfirmModalOpen(false);
    };

    const handleConfirmDelete = () => {
        if (categoryToDelete) {
            deleteCategory(categoryToDelete.id);
            handleCloseConfirmModal();
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-accent-cream">Categorias</h2>
                <button 
                    onClick={handleOpenModalForAdd}
                    className="flex items-center justify-center sm:justify-start gap-2 bg-accent-action text-primary font-bold py-2 px-4 rounded-md hover:brightness-110 transition-all"
                >
                    <PlusIcon className="w-5 h-5" />
                    Adicionar Categoria
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-primary-dark">
                    <thead className="bg-primary">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Ícone</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Nome</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-300">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-300">
                        {categories.map(category => (
                            <tr key={category.id} className="border-b border-zinc-700 hover:bg-primary">
                                <td className="py-3 px-4">
                                    <IconComponent name={category.icon_name} className="w-6 h-6" />
                                </td>
                                <td className="py-3 px-4 font-medium text-accent-cream">{category.name}</td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleOpenModalForEdit(category)} className="text-blue-400 hover:text-blue-300 p-2"><EditIcon className="w-5 h-5" /></button>
                                        <button onClick={() => handleOpenConfirmModal(category)} className="text-red-400 hover:text-red-300 p-2"><TrashIcon className="w-5 h-5" /></button>
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
                title={editingCategory ? "Editar Categoria" : "Adicionar Nova Categoria"}
            >
                <CategoryForm categoryToEdit={editingCategory} onFormSubmit={handleCloseModal} />
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
                        Excluir Categoria
                    </h3>
                    <div className="mt-2 px-7 py-3">
                        <p className="text-sm text-gray-400">
                            Tem certeza que deseja excluir a categoria <strong>"{categoryToDelete?.name}"</strong>? Esta ação não pode ser desfeita.
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

export default CategoryList;