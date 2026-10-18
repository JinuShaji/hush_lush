import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, CheckCircle, ArrowRight, ChefHat, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { RESTAURANT_DETAILS } from '../../data/mockData';

export const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, clearCart, subtotal, tax, total, placeOrder } = useCart();
  const { user } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  if (!isCartOpen) return null;

  const currentTable = user?.table || RESTAURANT_DETAILS.tableNumber;
  const customerName = user?.name || 'Guest Diner';

  const handleCheckout = async () => {
    setIsSubmitting(true);
    try {
      const order = await placeOrder(currentTable, customerName);
      setOrderSuccess(order.id);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-primary" />
            <div>
              <h2 className="font-bold text-slate-900 text-base">Your Table Order</h2>
              <p className="text-xs text-slate-500 font-medium">
                {currentTable} • {customerName}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setOrderSuccess(null);
            }}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {orderSuccess ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-md">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Order Sent to Kitchen!</h3>
            <p className="text-xs text-slate-500 mb-4">
              Order Ref: <span className="font-mono font-bold text-slate-700">{orderSuccess}</span>
            </p>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 w-full text-xs text-slate-600 space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Table:</span>
                <span className="font-bold text-slate-800">{currentTable}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Prep Time:</span>
                <span className="font-bold text-primary">15–20 minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Kitchen Status:</span>
                <span className="inline-flex items-center gap-1 font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3" /> Preparing Fresh
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setOrderSuccess(null);
              }}
              className="w-full py-3 bg-primary text-white font-bold rounded-xl text-sm shadow-md hover:bg-primary-hover cursor-pointer"
            >
              Continue Exploring Menu
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-red-50 text-primary rounded-full flex items-center justify-center mb-4">
              <ChefHat className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Your Order is Empty</h3>
            <p className="text-xs text-slate-500 max-w-xs mb-6">
              Explore our chef specialties and tap "+" to add freshly prepared dishes to your table.
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 cursor-pointer"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.foodItem.id} className="py-3 flex items-center gap-3">
                  <img
                    src={item.foodItem.image}
                    alt={item.foodItem.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{item.foodItem.name}</h4>
                    <span className="text-xs font-bold text-primary">
                      ${(item.foodItem.price * item.quantity).toFixed(2)}
                    </span>
                    {item.specialInstructions && (
                      <p className="text-[10px] text-slate-400 italic truncate mt-0.5">
                        Note: {item.specialInstructions}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.foodItem.id, -1)}
                      className="w-6 h-6 bg-white rounded flex items-center justify-center text-slate-700 hover:bg-slate-200 cursor-pointer shadow-2xs"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-slate-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.foodItem.id, 1)}
                      className="w-6 h-6 bg-white rounded flex items-center justify-center text-slate-700 hover:bg-slate-200 cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.foodItem.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-50/80 border-t border-slate-200/70 space-y-2.5">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>UAE VAT (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-1 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={clearCart}
                  className="px-3 py-3 border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-medium cursor-pointer"
                >
                  Clear
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-primary hover:bg-primary-hover active:scale-[0.99] text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-red-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Sending to Kitchen...</span>
                  ) : (
                    <>
                      <span>Place Table Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
