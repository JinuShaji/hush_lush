import React from 'react';
import { Search, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Header = ({ onOpenSearch, onOpenTableModal }) => {
  const { user, logout } = useAuth();

  const currentTable = user?.table || 'Table 13';
  const currentPax = user?.pax || 4;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-xs">
      {/* Left: Square HL Logo Card Badge */}
      <div className="flex items-center">
        <div className="w-11 h-11 bg-white rounded-xl shadow-md border border-slate-100 flex items-center justify-center p-1.5 transition-transform hover:scale-105">
          <svg viewBox="0 0 100 100" className="w-full h-full text-primary" fill="currentColor">
            <path
              d="M20 20 h12 v24 h26 v-24 h12 v60 h-12 v-24 h-26 v24 h-12 z"
              fill="#E52E2E"
            />
            <path
              d="M50 20 C65 8, 80 14, 88 28 C74 26, 64 34, 58 42 Z"
              fill="#E52E2E"
              opacity="0.9"
            />
            <path
              d="M58 56 h14 v16 h20 v8 h-34 z"
              fill="#E52E2E"
            />
          </svg>
        </div>
      </div>

      {/* Center: Table & PAX indicator */}
      <button
        onClick={onOpenTableModal}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-50 transition-colors group cursor-pointer"
        title="Click to change Table or PAX"
      >
        <span className="font-bold text-slate-800 text-[15px] tracking-tight">
          {currentTable} ({currentPax} PAX)
        </span>
        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
      </button>

      {/* Right: Search + Logout */}
      <div className="flex items-center gap-1">
        <button
          onClick={onOpenSearch}
          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
          aria-label="Search food items"
        >
          <Search className="w-5 h-5 stroke-[2.2]" />
        </button>
        <button
          onClick={logout}
          className="w-10 h-10 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 active:scale-95 transition-all cursor-pointer"
          aria-label="Log out"
          title="Log out"
        >
          <LogOut className="w-5 h-5 stroke-[2]" />
        </button>
      </div>
    </header>
  );
};
