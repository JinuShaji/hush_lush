import React, { useState } from 'react';
import { X, Users, MapPin, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const TableSelectorModal = ({ isOpen, onClose }) => {
  const { user, updateTable } = useAuth();

  const [selectedTable, setSelectedTable] = useState(user?.table || 'Table 13');
  const [selectedPax, setSelectedPax] = useState(user?.pax || 4);

  if (!isOpen) return null;

  const tables = ['Table 02', 'Table 05', 'Table 11', 'Table 13', 'Table 18', 'Table 24'];
  const paxOptions = [1, 2, 4, 6, 8, 10];

  const handleSave = () => {
    updateTable(selectedTable, selectedPax);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-slate-900 text-base">Select Your Table</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Dining Table
          </label>
          <div className="grid grid-cols-3 gap-2">
            {tables.map((tbl) => {
              const isSelected = selectedTable === tbl;
              return (
                <button
                  key={tbl}
                  onClick={() => setSelectedTable(tbl)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary text-white shadow-xs shadow-red-500/30'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {tbl}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>Party Size (Guests / PAX)</span>
          </label>
          <div className="grid grid-cols-6 gap-1.5">
            {paxOptions.map((pax) => {
              const isSelected = selectedPax === pax;
              return (
                <button
                  key={pax}
                  onClick={() => setSelectedPax(pax)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {pax}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 bg-primary hover:bg-primary-hover active:scale-[0.99] text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-red-500/20 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
        >
          <Check className="w-4 h-4" />
          <span>Confirm Table Details</span>
        </button>
      </div>
    </div>
  );
};
