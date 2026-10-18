import React from 'react';
import { Globe, DollarSign, Bell, FileText, Lock, Info, ExternalLink } from 'lucide-react';

export const MoreScreen = ({ onShowTerms, onShowPrivacy, onCallWaiter }) => {
  return (
    <div className="pb-24 max-w-2xl mx-auto bg-slate-50 min-h-screen relative shadow-sm border-x border-slate-100 p-4 space-y-4">
      <div className="pt-2">
        <h1 className="text-xl font-bold text-slate-900">Preferences & Settings</h1>
        <p className="text-xs text-slate-500">Configure your dining preferences and access policies</p>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-primary flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">Need Table Assistance?</h4>
            <p className="text-[11px] text-slate-500">Alert our floor staff to visit Table 13</p>
          </div>
        </div>
        <button
          onClick={onCallWaiter}
          className="px-3.5 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          Call Waiter
        </button>
      </div>

      <div className="bg-white rounded-2xl p-2 border border-slate-100 shadow-xs divide-y divide-slate-100">
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
            <Globe className="w-4 h-4 text-slate-400" />
            <span>Language</span>
          </div>
          <select className="text-xs font-semibold bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700">
            <option>English (US)</option>
            <option>العربية (Arabic)</option>
          </select>
        </div>

        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
            <DollarSign className="w-4 h-4 text-slate-400" />
            <span>Currency</span>
          </div>
          <select className="text-xs font-semibold bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700">
            <option>USD ($)</option>
            <option>AED (د.إ)</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-2 border border-slate-100 shadow-xs divide-y divide-slate-100">
        <button
          onClick={onShowTerms}
          className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
            <FileText className="w-4 h-4 text-slate-400" />
            <span>Terms of Use</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <button
          onClick={onShowPrivacy}
          className="w-full p-3 flex items-center justify-between text-left hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
            <Lock className="w-4 h-4 text-slate-400" />
            <span>Privacy Policy</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>

      <div className="text-center py-4 text-xs text-slate-400 space-y-1">
        <div className="flex items-center justify-center gap-1.5 font-medium">
          <Info className="w-3.5 h-3.5" />
          <span>Hush Lush Dining Suite v1.0.0</span>
        </div>
        <p className="text-[11px] text-slate-400">All rights reserved © 2026 Hush Lush Advertising & Technologies</p>
      </div>
    </div>
  );
};
