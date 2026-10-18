import React, { useState } from 'react';
import { Search, X, Plus } from 'lucide-react';
import { MOCK_FOOD_ITEMS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';

export const SearchModal = ({ isOpen, onClose, onSelectItem, onAddedToast }) => {
  const [query, setQuery] = useState('');
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const filteredItems = query.trim()
    ? MOCK_FOOD_ITEMS.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.ingredients?.some((ing) => ing.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const popularKeywords = ['Biryani', 'Chicken Chop', 'Burger', 'Fish', 'Platter'];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden mt-8 max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search food items, dishes, ingredients..."
            autoFocus
            className="flex-1 text-sm bg-transparent border-none focus:outline-none text-slate-900 placeholder:text-slate-400"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
          )}
        </div>

        {!query && (
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {popularKeywords.map((kw) => (
                <button
                  key={kw}
                  onClick={() => setQuery(kw)}
                  className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600 hover:border-primary hover:text-primary transition-colors cursor-pointer"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
          {query.trim() && filteredItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm font-semibold text-slate-700">No dishes found</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for "Chicken Chop", "Dum Biryani", or "Burger".
              </p>
            </div>
          ) : (
            (query.trim() ? filteredItems : MOCK_FOOD_ITEMS.slice(0, 4)).map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectItem(item);
                  onClose();
                }}
                className="py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50 px-2 rounded-xl cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                    <span className="text-xs font-bold text-primary">${item.price.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item, 1);
                    if (onAddedToast) onAddedToast(item.name);
                  }}
                  className="w-7 h-7 rounded-full bg-slate-100 hover:bg-primary hover:text-white flex items-center justify-center text-slate-700 transition-colors cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
