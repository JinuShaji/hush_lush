import React from 'react';
import { Store, UtensilsCrossed, User as UserIcon, Menu } from 'lucide-react';

export const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'outlet', label: 'Outlet', icon: Store },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'account', label: 'Account', icon: UserIcon },
    { id: 'more', label: 'More', icon: Menu },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center bg-transparent">
      {/* Inner container matches page content width exactly (same max-w-2xl as RestaurantHomeScreen) */}
      <div className="w-full max-w-2xl bg-white border-t border-x border-slate-200/80 shadow-nav">
        {/* Navigation items */}
        <div className="grid grid-cols-4 pt-1.5 pb-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative flex flex-col items-center justify-center py-1 transition-all duration-200 cursor-pointer ${
                  isActive ? 'text-primary' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {/* Top active red line indicator */}
                {isActive && (
                  <div className="absolute -top-1.5 left-6 right-6 h-0.5 bg-primary rounded-full transition-all duration-300" />
                )}
                <Icon className={`w-5 h-5 mb-0.5 transition-transform duration-200 ${isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'}`} />
                <span className={`text-[11px] font-medium tracking-tight ${isActive ? 'font-semibold text-primary' : 'text-slate-600'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Powered by Hush Lush Branding Footer Bar */}
        <div className="py-1 px-4 text-center border-t border-slate-100 bg-slate-50/70 flex items-center justify-center gap-1">
          <span className="text-[10px] text-slate-500 font-medium">Powered By</span>
          <span className="font-serif italic text-primary font-bold text-xs">Hush Lush</span>
        </div>
      </div>
    </div>
  );
};
