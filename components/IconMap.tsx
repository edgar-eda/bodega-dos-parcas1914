import React from 'react';
import {
  Beer, CupSoda, GlassWater, Zap, PackagePlus, Wine, Martini, Cigarette, Cookie, ShoppingBag, Snowflake, Flame, Package, Candy
} from 'lucide-react';

export const iconMap: { [key: string]: React.ElementType } = {
  Água: GlassWater,
  Carvão: Flame,
  Cerveja: Beer,
  Combos: ShoppingBag,
  Conveniência: PackagePlus,
  Destilados: Martini,
  Descartáveis: Package,
  Doces: Candy,
  Energético: Zap,
  Gelo: Snowflake,
  Petiscos: Cookie,
  Refrigerante: CupSoda,
  Tabacaria: Cigarette,
  Vinho: Wine,
};

export const iconList = Object.keys(iconMap).sort();

export const IconComponent = ({ name, ...props }: { name: string, [key: string]: any }) => {
  const Icon = iconMap[name];
  return Icon ? <Icon {...props} /> : null;
};