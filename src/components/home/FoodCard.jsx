import React, { useState } from 'react';
import { Plus, ArrowRight, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const FoodCard = ({ item, onSelect, onAddedToast }) => {
  const { addToCart } = useCart();
  const [isBouncing, setIsBouncing] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    setIsBouncing(true);
    setJustAdded(true);
    addToCart(item, 1);

    if (onAddedToast) {
      onAddedToast(item.name);
    }

    setTimeout(() => setIsBouncing(false), 400);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onSelect(item)}
      className="group bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md ${
            justAdded
              ? 'bg-emerald-600 text-white scale-110'
              : 'bg-black/45 backdrop-blur-md text-white hover:bg-primary active:scale-90'
          } ${isBouncing ? 'animate-bounce' : ''}`}
          title="Quick add to order"
          aria-label={`Add ${item.name} to cart`}
        >
          {justAdded ? <Check className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
        </button>
      </div>

      <div className="px-3.5 py-3 flex-1 flex items-center">
        <h3 className="font-bold text-slate-900 text-[13.5px] leading-snug line-clamp-2 text-left group-hover:text-primary transition-colors">
          {item.name}
        </h3>
      </div>

      <div className="bg-[#FFF5F5] px-3.5 py-2.5 flex items-center justify-between border-t border-red-50">
        <div className="flex items-baseline gap-1.5">
          <span className="font-bold text-primary text-[15px] tracking-tight">
            ${item.price.toFixed(2)}
          </span>
          {item.originalPrice && (
            <span className="text-[11px] text-slate-400 line-through">
              ${item.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="text-primary group-hover:translate-x-1 transition-transform">
          <ArrowRight className="w-4 h-4 stroke-[2.2]" />
        </div>
      </div>
    </div>
  );
};
