import { Product, User } from './types';

export const CATEGORIES: string[] = ["Cervejas", "Refrigerantes", "Whisky", "Energético", "Combos"];

export const PRODUCTS: Product[] = [
  // Cervejas
  {
    id: 9,
    name: "Heineken Long Neck 330ml",
    description: "Cerveja premium lager com sabor marcante.",
    price: 7.90,
    category: "Cervejas",
    imageUrl: "https://picsum.photos/seed/heineken/400/400",
  },
  {
    id: 10,
    name: "Budweiser Garrafa 600ml",
    description: "A King of Beers, leve e refrescante.",
    price: 9.50,
    category: "Cervejas",
    imageUrl: "https://picsum.photos/seed/budweiser/400/400",
  },
  {
    id: 11,
    name: "Original Garrafa 600ml",
    description: "Clássica cerveja pilsen brasileira.",
    price: 8.90,
    promoPrice: 7.99,
    category: "Cervejas",
    imageUrl: "https://picsum.photos/seed/original/400/400",
  },
  // Refrigerantes
  {
    id: 12,
    name: "Coca-Cola Lata 350ml",
    description: "O refrigerante mais famoso do mundo.",
    price: 4.50,
    category: "Refrigerantes",
    imageUrl: "https://picsum.photos/seed/cocacola/400/400",
  },
  {
    id: 13,
    name: "Guaraná Antarctica 2L",
    description: "O sabor original do Brasil, perfeito para a família.",
    price: 9.90,
    category: "Refrigerantes",
    imageUrl: "https://picsum.photos/seed/guarana/400/400",
  },
  // Whiskies
  {
    id: 1,
    name: "Johnnie Walker Red Label 750ml",
    description: "O whisky escocês mais vendido no mundo.",
    price: 89.90,
    category: "Whisky",
    imageUrl: "https://picsum.photos/seed/redlabel/400/400",
  },
  {
    id: 2,
    name: "Jack Daniel's Old No. 7 1L",
    description: "Tennessee whiskey com sabor suave e marcante.",
    price: 139.90,
    promoPrice: 129.90,
    category: "Whisky",
    imageUrl: "https://picsum.photos/seed/jackdaniels/400/400",
  },
  {
    id: 3,
    name: "Chivas Regal 12 Anos 750ml",
    description: "Blended Scotch whisky suave e rico.",
    price: 119.90,
    category: "Whisky",
    imageUrl: "https://picsum.photos/seed/chivas/400/400",
  },
  // Energéticos
  {
    id: 4,
    name: "Red Bull Energy Drink 250ml",
    description: "Te dá aaasas! O energético clássico.",
    price: 8.50,
    category: "Energético",
    imageUrl: "https://picsum.photos/seed/redbull/400/400",
  },
  {
    id: 5,
    name: "Monster Energy 473ml",
    description: "Sabor intenso para máxima energia.",
    price: 9.90,
    category: "Energético",
    imageUrl: "https://picsum.photos/seed/monster/400/400",
  },
   {
    id: 6,
    name: "Red Bull Tropical Edition 250ml",
    description: "O sabor de frutas tropicais.",
    price: 8.99,
    category: "Energético",
    imageUrl: "https://picsum.photos/seed/redbulltropical/400/400",
  },
  // Combos
  {
    id: 7,
    name: "Combo Red Label + 4 Energéticos",
    description: "1 Garrafa de Red Label 750ml + 4 Latas de Red Bull 250ml.",
    price: 120.00,
    promoPrice: 109.90,
    category: "Combos",
    imageUrl: "https://picsum.photos/seed/combored/400/400",
  },
  {
    id: 8,
    name: "Combo Jack Daniel's + Gelo de Coco",
    description: "1 Garrafa de Jack Daniel's 1L + 1 Pacote de Gelo de Coco 1kg.",
    price: 155.00,
    category: "Combos",
    imageUrl: "https://picsum.photos/seed/combojack/400/400",
  },
];

// Mock user data
export const USERS: User[] = [
    { id: 1, name: 'Admin Parça', email: 'admin@bodega.com', password: 'admin', role: 'admin' },
    { 
        id: 2, 
        name: 'Cliente Zé', 
        email: 'cliente@email.com', 
        password: '123', 
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