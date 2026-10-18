import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Header } from '../common/Header';
import { HeroBanner } from './HeroBanner';
import { CategoryBar } from './CategoryBar';
import { FoodCard } from './FoodCard';
import { FoodDetailModal } from './FoodDetailModal';
import { SearchModal } from './SearchModal';
import { TableSelectorModal } from './TableSelectorModal';
import { MOCK_FOOD_ITEMS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';

export const RestaurantHomeScreen = ({ onShowToast }) => {
  const { totalCount, setIsCartOpen } = useCart();

  // State
  const [selectedCategory, setSelectedCategory] = useState('Chicken Chop');
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  // Filter items by category
  const displayedItems = MOCK_FOOD_ITEMS.filter((item) => {
    if (selectedCategory === 'For You') {
      return item.isPopular;
    }
    return item.category === selectedCategory;
  });

  return (
    <div className="pb-24 max-w-2xl mx-auto bg-slate-50 min-h-screen relative shadow-sm border-x border-slate-100">
      {/* Top App Header with Table and Search */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTableModal={() => setIsTableModalOpen(true)}
      />

      {/* Hero Promotional Banner */}
      <HeroBanner />

      {/* Horizontal Category Pill Bar */}
      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Menu Grid Header & Count */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <h2 className="text-base font-extrabold text-slate-800 tracking-tight">
          {selectedCategory}
        </h2>
        <span className="text-xs text-slate-500 font-medium">
          {displayedItems.length} dishes available
        </span>
      </div>

      {/* 2-Column Responsive Food Card Grid */}
      <div className="px-3.5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-3.5">
        {displayedItems.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
            onSelect={(food) => setSelectedFoodItem(food)}
            onAddedToast={(name) => onShowToast(`Added ${name} to order`)}
          />
        ))}
      </div>

      {/* Floating Action Button: Shopping Cart */}
      <div className="fixed bottom-20 right-5 z-40">
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative w-14 h-14 rounded-full bg-neutral-600/85 hover:bg-neutral-700/90 backdrop-blur-md text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
          aria-label="View order cart"
        >
          <ShoppingCart className="w-6 h-6 stroke-[2]" />

          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-in zoom-in">
              {totalCount}
            </span>
          )}
        </button>
      </div>

      {/* Modals */}
      <FoodDetailModal
        item={selectedFoodItem}
        onClose={() => setSelectedFoodItem(null)}
        onAddedToast={(name) => onShowToast(`Added ${name} to order`)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectItem={(item) => setSelectedFoodItem(item)}
        onAddedToast={(name) => onShowToast(`Added ${name} to order`)}
      />

      <TableSelectorModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
      />
    </div>
  );
};
