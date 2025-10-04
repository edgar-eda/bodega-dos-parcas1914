import React, { ReactNode } from 'react';
import { XIcon } from './icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" aria-modal="true" role="dialog">
      <div className="bg-primary-dark rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col border border-green-700">
        <div className="flex justify-between items-center p-4 border-b border-green-700">
          <h3 className="text-xl font-semibold text-accent-cream">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-accent-cream" aria-label="Fechar modal">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;