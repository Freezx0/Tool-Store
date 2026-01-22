import React from 'react';
import { Drill, Wrench, Hammer, Cog, Box, HardHat } from 'lucide-react';

export const CATEGORIES = [
  { name: 'Электроинструмент', icon: <Drill className="w-6 h-6" /> },
  { name: 'Ручной инструмент', icon: <Wrench className="w-6 h-6" /> },
  { name: 'Наборы', icon: <Box className="w-6 h-6" /> },
  { name: 'Строительство', icon: <HardHat className="w-6 h-6" /> },
  { name: 'Запчасти', icon: <Cog className="w-6 h-6" /> },
];

export const HERO_IMAGE = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";

export const BRAND_DETAILS = [
  {
    name: "Makita",
    image: "https://images.unsplash.com/photo-1622340332822-2612b7a9f7f4?auto=format&fit=crop&w=800&q=80",
    description: "Японское качество и инновации. Лидер в производстве аккумуляторного инструмента.",
    slogan: "Live Green. Live Makita."
  },
  {
    name: "DeWalt",
    image: "https://images.unsplash.com/photo-1540304453527-62f979a4263f?auto=format&fit=crop&w=800&q=80",
    description: "Надежность и мощь для самых суровых условий строительной площадки.",
    slogan: "Guaranteed Tough."
  },
  {
    name: "Bosch",
    image: "https://images.unsplash.com/photo-1563823251954-469b2b5f0d9c?auto=format&fit=crop&w=800&q=80",
    description: "Немецкие технологии для профессионалов. Точность в каждой детали.",
    slogan: "Invented for life."
  },
  {
    name: "Milwaukee",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80",
    description: "Революционные решения для тяжелых работ. Система M18 меняет правила игры.",
    slogan: "Nothing but Heavy Duty."
  },
  {
    name: "Stanley",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=800&q=80",
    description: "Стандарт качества ручного инструмента с 1843 года.",
    slogan: "Performance in action."
  },
  {
    name: "Hilti",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
    description: "Премиальные решения для строительства и монтажа.",
    slogan: "Outperform. Outlast."
  }
];