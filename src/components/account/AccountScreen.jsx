import React from 'react';
import { User, LogOut, Clock, CheckCircle2, Utensils, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export const AccountScreen = ({ onUpgradeGuest }) => {
  const { user, logout } = useAuth();
  const { orders } = useCart();

  if (!user) return null;

  return (
    <div className="pb-24 max-w-2xl mx-auto bg-slate-50 min-h-screen relative shadow-sm border-x border-slate-100">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 pt-8 rounded-b-3xl shadow-md">
        <div className="flex items-center gap-4">
          <div className="relative">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-slate-700 border-2 border-primary flex items-center justify-center">
                <User className="w-8 h-8 text-slate-300" />
              </div>
            )}
            {user.isGuest && (
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-xs">
                GUEST
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold truncate">{user.name}</h2>
            <p className="text-xs text-slate-300 truncate">
              {user.email || 'Temporary Guest Diner Session'}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] bg-white/10 px-2.5 py-0.5 rounded-full font-medium text-slate-200">
                {user.table} ({user.pax} PAX)
              </span>
              <span className="text-[11px] bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-full font-medium">
                Warely Pass Active
              </span>
            </div>
          </div>
        </div>

        {user.isGuest && onUpgradeGuest && (
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-amber-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Sign in for loyalty points
            </span>
            <button
              onClick={onUpgradeGuest}
              className="text-xs font-bold text-white bg-primary px-3 py-1 rounded-lg hover:bg-primary-hover cursor-pointer"
            >
              Sign In
            </button>
          </div>
        )}
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Utensils className="w-4 h-4 text-primary" />
              <span>Current Table Orders</span>
            </h3>
            <span className="text-xs text-slate-400 font-medium">{orders.length} orders</span>
          </div>

          {orders.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              <p>No orders placed yet for this table.</p>
              <p className="mt-1 text-[11px] text-slate-400">Your placed items and kitchen status will appear here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-800">{order.id}</span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {order.createdAt}
                    </span>
                  </div>

                  <div className="text-slate-600 space-y-1">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>
                          {item.quantity}x {item.foodItem.name}
                        </span>
                        <span className="font-semibold text-slate-700">
                          ${(item.foodItem.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-1 font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                      <CheckCircle2 className="w-3 h-3" /> {order.status}
                    </div>
                    <span className="font-extrabold text-primary text-sm">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center gap-3">
          <Shield className="w-5 h-5 text-slate-400 shrink-0" />
          <div className="text-xs text-slate-600">
            <span className="font-bold text-slate-800 block">Encrypted Session</span>
            Authenticated securely via Hush Lush Single Sign-On.
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full py-3.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-bold text-sm rounded-xl transition-all border border-slate-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out & Exit Session</span>
        </button>
      </div>
    </div>
  );
};
