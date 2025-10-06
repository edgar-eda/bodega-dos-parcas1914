import React from 'react';
import {
  Beer, CupSoda, GlassWater, Zap, PackagePlus, Wine, Pizza, Sandwich, IceCream, CakeSlice, ShoppingBasket, UtensilsCrossed,
  Martini, Coffee, Cigarette, Cookie, Beef, Salad, Soup, Candy, ShoppingBag
} from 'lucide-react';

export const iconMap: { [key: string]: React.ElementType } = {
  Cerveja: Beer,
  Refrigerante: CupSoda,
  Agua: GlassWater,
  Energetico: Zap,
  Vinho: Wine,
  Drink: Martini,
  Cafe: Coffee,
  Lanche: Sandwich,
  Pizza: Pizza,
  Refeicao: UtensilsCrossed,
  Churrasco: Beef,
  Salada: Salad,
  Caldo: Soup,
  Sorvete: IceCream,
  Sobremesa: CakeSlice,
  Doce: Candy,
  Snack: Cookie,
  Tabacaria: Cigarette,
  Conveniencia: PackagePlus,
  Cesta: ShoppingBasket,
  Kit: ShoppingBag,
};

export const iconList = Object.keys(iconMap).sort();

export const IconComponent = ({ name, ...props }: { name: string, [key: string]: any }) => {
  const Icon = iconMap[name];
  return Icon ? <Icon {...props} /> : null;
};