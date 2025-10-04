import { Beer, CupSoda, GlassWater, Zap, PackagePlus } from 'lucide-react';

export const CATEGORY_DATA = [
    { name: "Cervejas", icon: Beer },
    { name: "Refrigerantes", icon: CupSoda },
    { name: "Whisky", icon: GlassWater },
    { name: "Energético", icon: Zap },
    { name: "Combos", icon: PackagePlus },
];

export const CATEGORIES: string[] = CATEGORY_DATA.map(c => c.name);