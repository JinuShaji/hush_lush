import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export const LegalModal = ({ type, onClose }) => {
  if (!type) return null;

  const isTerms = type === 'terms';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl max-h-[80vh] flex flex-col animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-slate-900 text-base">
              {isTerms ? 'Terms of Use' : 'Privacy Policy'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto py-4 text-xs text-slate-600 leading-relaxed space-y-3">
          {isTerms ? (
            <>
              <p className="font-semibold text-slate-800">
                1. Acceptance of Terms & Warely Pass Services
              </p>
              <p>
                By accessing Hush Lush Partner Bistro applications, using guest pass features, or registering credentials, you agree to these dining service terms.
              </p>
              <p className="font-semibold text-slate-800">2. Contactless Table Ordering</p>
              <p>
                Orders placed through the digital terminal are routed immediately to kitchen display systems. Cancellation after kitchen confirmation is subject to restaurant approval.
              </p>
              <p className="font-semibold text-slate-800">3. Taxes & Pricing</p>
              <p>
                All prices are displayed in USD/AED and subject to applicable statutory value added tax (VAT 5%).
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-slate-800">1. Data Collected</p>
              <p>
                Hush Lush collects necessary table identifiers, party size, order logs, and mock profile credentials for authentication and kitchen service delivery.
              </p>
              <p className="font-semibold text-slate-800">2. Guest Access Privacy</p>
              <p>
                Guest dining sessions do not require permanent email storage and are kept solely within the active table lifecycle.
              </p>
              <p className="font-semibold text-slate-800">3. Encryption & Protection</p>
              <p>
                All session tokens and ordering data are encrypted in accordance with international digital commerce security guidelines.
              </p>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 cursor-pointer mt-2"
        >
          Understood & Close
        </button>
      </div>
    </div>
  );
};
