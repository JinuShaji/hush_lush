import React from 'react';
import { MapPin, Phone, Clock, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import { RESTAURANT_DETAILS } from '../../data/mockData';

export const OutletScreen = () => {
  return (
    <div className="pb-24 max-w-2xl mx-auto bg-slate-50 min-h-screen relative shadow-sm border-x border-slate-100">
      <div className="relative h-48 bg-slate-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop"
          alt="Restaurant Ambiance"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary text-[10px] font-bold tracking-wide uppercase mb-1">
            <Award className="w-3 h-3" /> Partnered Bistro
          </div>
          <h1 className="text-xl font-bold">{RESTAURANT_DETAILS.name}</h1>
          <p className="text-xs text-white/80">{RESTAURANT_DETAILS.tagline}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Location</h4>
              <p className="text-xs text-slate-600 mt-0.5">{RESTAURANT_DETAILS.location}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
            <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Operating Hours</h4>
              <p className="text-xs text-slate-600 mt-0.5">{RESTAURANT_DETAILS.hours}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
            <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Table Reservations & Inquiries</h4>
              <p className="text-xs text-slate-600 mt-0.5">{RESTAURANT_DETAILS.phone}</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50/60 border border-red-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2 text-primary font-bold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>Warely Pass Dining Partner</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your Hush Lush authentication or guest session enables contactless table ordering, instant kitchen dispatch, and privileged rewards across all participating dining spots.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
            <HeartHandshake className="w-5 h-5 text-primary mb-1.5" />
            <h5 className="text-xs font-bold text-slate-800">100% Halal Certified</h5>
            <p className="text-[11px] text-slate-500 mt-0.5">Finest farm-fresh ingredients</p>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
            <Award className="w-5 h-5 text-primary mb-1.5" />
            <h5 className="text-xs font-bold text-slate-800">Artisanal Kitchen</h5>
            <p className="text-[11px] text-slate-500 mt-0.5">Crafted with secret marinades</p>
          </div>
        </div>
      </div>
    </div>
  );
};
