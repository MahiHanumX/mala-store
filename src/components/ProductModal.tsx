import React, { useState } from 'react';
import { X, ShieldCheck, Heart, Sparkles, ShoppingBag, Check, Zap } from 'lucide-react';
import type { MalaItem } from '../data/chateauData';

interface ProductModalProps {
  product: MalaItem | null;
  onClose: () => void;
  onAddToCart: (product: MalaItem, quantity: number) => void;
  onInstantBuy?: (product: MalaItem, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onInstantBuy,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const handleBuyNow = () => {
    onAddToCart(product, quantity);
    if (onInstantBuy) {
      onInstantBuy(product, quantity);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
      {/* Overlay Card Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto border border-white/15 bg-black/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 text-white shadow-[0_0_50px_rgba(0,0,0,0.8)] no-scrollbar z-50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer z-10"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column: Mala Image Showcase */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/15 bg-white/5 shadow-2xl">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 border border-amber-400/40 bg-black/60 backdrop-blur-md text-amber-300 font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Sparkles size={12} className="text-amber-400" />
                {product.beadCount} Sacred Beads
              </span>
            </div>

            {/* Authenticity guarantee badge */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
              <ShieldCheck size={22} className="text-amber-400 flex-shrink-0" />
              <div>
                <span className="font-semibold text-white block">Authentic Rishikesh Blessing</span>
                <span className="text-white/60">Hand-knotted with natural silk thread & guru bead</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Specs & Actions */}
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* Category & Keywords */}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 border border-amber-400/30 bg-amber-500/10 px-2.5 py-1 rounded-md">
                  {product.keywords}
                </span>
              </div>

              {/* Title & Price */}
              <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold leading-tight mb-2">
                {product.name}
              </h2>
              <p className="text-xs font-serif italic text-white/70 whitespace-pre-line mb-5">{product.subtitle}</p>

              <div className="flex items-baseline gap-3 pb-4 mb-5 border-b border-white/10">
                <span className="text-3xl font-mono font-bold text-amber-400">
                  {product.priceFormatted}
                </span>
              </div>

              {/* Product Description */}
              <p className="text-sm leading-relaxed text-white/80 font-light whitespace-pre-line mb-6">
                {product.description}
              </p>

              {/* Mantra & Quote Info Card */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 mb-6">
                <div className="flex items-center gap-2 text-xs">
                  <Sparkles size={14} className="text-amber-400 flex-shrink-0" />
                  <span className="font-mono text-white/60">Sacred Mantra:</span>
                  <span className="font-medium text-amber-200">{product.mantra}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Heart size={14} className="text-rose-400 flex-shrink-0" />
                  <span className="font-mono text-white/60">Guiding Vision:</span>
                  <span className="text-white/90 italic">{product.quote}</span>
                </div>
              </div>
            </div>

            {/* Quantity Selector & Dual Buy Action Buttons */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-white/70">Quantity</span>
                <div className="flex items-center rounded-xl border border-white/20 bg-white/10 px-3 py-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-white/70 hover:text-white px-2 font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-mono font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-white/70 hover:text-white px-2 font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {/* ADD TO CART */}
                <button
                  onClick={handleAdd}
                  className={`py-3.5 px-5 rounded-xl font-mono text-xs uppercase tracking-[0.15em] font-medium transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                    isAdded
                      ? 'bg-emerald-500 text-white border-emerald-400'
                      : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check size={16} />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      <span>ADD TO CART</span>
                    </>
                  )}
                </button>

                {/* BUY NOW */}
                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-semibold font-mono text-xs uppercase tracking-[0.15em] transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <Zap size={16} className="fill-black" />
                  <span>BUY NOW</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
