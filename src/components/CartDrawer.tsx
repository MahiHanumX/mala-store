import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { MalaItem } from '../data/chateauData';

export interface CartItem {
  product: MalaItem;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 2000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
    }, 1500);
  };

  const handleFinish = () => {
    onClearCart();
    setOrderComplete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0a0a0c] border-l border-white/15 text-white flex flex-col justify-between shadow-2xl">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-serif tracking-tight text-white">Your CHÂTEAU Cart</h2>
              <span className="font-mono text-xs text-amber-300/80">({items.length} items)</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {orderComplete ? (
            /* Order Success View */
            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-4 animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-serif mb-2 text-white">Order Confirmed!</h3>
              <p className="text-xs text-white/70 mb-6 leading-relaxed">
                Thank you for your order. Your sacred Mala is being hand-knotted and blessed in Rishikesh.
              </p>
              <button
                onClick={handleFinish}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold font-mono text-xs uppercase tracking-[0.15em] hover:from-amber-300 hover:to-amber-400 transition-all cursor-pointer"
              >
                Return to CHÂTEAU Showcase
              </button>
            </div>
          ) : (
            /* Active Cart Items View */
            <>
              {/* Free Shipping Progress Bar */}
              <div className="px-6 py-3 bg-white/5 border-b border-white/10">
                <div className="flex justify-between text-xs mb-1.5 font-mono">
                  <span className="text-white/70">
                    {subtotal >= freeShippingThreshold
                      ? '✨ Free Express Shipping Unlocked!'
                      : `Add ₹${freeShippingThreshold - subtotal} more for Free Shipping`}
                  </span>
                  <span className="text-amber-400">{progressToFreeShipping.toFixed(0)}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-white/50 space-y-4">
                    <p className="text-xs font-mono uppercase tracking-widest">Your cart is currently empty.</p>
                    <button
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl border border-white/20 text-xs text-amber-200 hover:bg-white/10 cursor-pointer font-mono uppercase tracking-wider"
                    >
                      Explore Sacred Collection
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3.5 rounded-2xl bg-white/5 border border-white/10 items-center justify-between"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-white/10 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-serif text-white truncate font-bold">
                          {item.product.name}
                        </h4>
                        <span className="font-mono text-xs text-amber-400 block mb-1.5">
                          {item.product.priceFormatted}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-lg bg-white/10 text-white/70 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs font-bold px-1">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-lg bg-white/10 text-white/70 hover:text-white flex items-center justify-center text-xs cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-2 text-white/40 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Summary Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/15 bg-white/5 space-y-4">
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-white/70">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Express Shipping</span>
                      <span>{subtotal >= freeShippingThreshold ? 'FREE' : '₹149'}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-amber-400 pt-2 border-t border-white/10">
                      <span>Total</span>
                      <span>
                        ₹{(subtotal + (subtotal >= freeShippingThreshold ? 0 : 149)).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-black font-semibold font-mono text-xs uppercase tracking-[0.15em] hover:from-amber-300 hover:to-amber-400 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] disabled:opacity-50"
                  >
                    {isCheckingOut ? (
                      <span>Processing Sacred Order...</span>
                    ) : (
                      <>
                        <span>Proceed to Checkout</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/50">
                    <ShieldCheck size={12} />
                    <span>256-Bit Encrypted Secure Checkout</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
