import React from 'react';
import {
  Beer, CupSoda, GlassWater, Zap, PackagePlus, Wine, Pizza, Sandwich, IceCream, CakeSlice, ShoppingBasket, UtensilsCrossed
} from 'lucide-react';

export const iconMap: { [key: string]: React.ElementType } = {
  Beer: Beer,
  CupSoda: CupSoda,
  GlassWater: GlassWater,
  Zap: Zap,
  PackagePlus: PackagePlus,
  Wine: Wine,
  Pizza: Pizza,
  Sandwich: Sandwich,
  IceCream: IceCream,
  CakeSlice: CakeSlice,
  ShoppingBasket: ShoppingBasket,
  UtensilsCrossed: UtensilsCrossed,
};

export const iconList = Object.keys(iconMap);

export const IconComponent = ({ name, ...props }: { name: string, [key: string]: any }) => {
  const Icon = iconMap[name];
  return Icon ? <Icon {...props} /> : null;
};