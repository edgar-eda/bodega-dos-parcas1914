import { Product, User } from './types';

export const CATEGORIES: string[] = ["Cervejas", "Refrigerantes", "Whisky", "Energético", "Combos"];

// Mock user data
export const USERS: User[] = [
    { id: 'admin-uuid', name: 'Admin Parça', email: 'admin@bodega.com', role: 'admin' },
    { 
        id: 'client-uuid', 
        name: 'Cliente Zé', 
        email: 'cliente@email.com', 
        role: 'client',
        address: {
            cep: '50000-000',
            rua: 'Rua Fictícia de Teste',
            numero: '123',
            bairro: 'Bairro Modelo',
            complemento: 'Apto 42',
            referencia: 'Próximo à praça central'
        }
    },
];