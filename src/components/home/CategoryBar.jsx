import React from 'react';
import { CATEGORIES } from '../../data/mockData';

export const CategoryBar = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-full bg-white py-3 border-b border-slate-100 select-none">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-4 scroll-smooth">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-primary text-white shadow-xs shadow-red-500/25 scale-[1.02]'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};
