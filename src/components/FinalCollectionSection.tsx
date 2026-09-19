import React from 'react';
import { Sparkles, ArrowUp, ShoppingBag } from 'lucide-react';
import { Reveal } from './Reveal';
import type { MalaProduct } from '../data/malaProducts';

interface FinalCollectionSectionProps {
  products: MalaProduct[];
  onSelectMalaSelector: (productId: string) => void;
  onOpenProductModal: (product: MalaProduct) => void;
  onOpenCart: () => void;
}

export const FinalCollectionSection: React.FC<FinalCollectionSectionProps> = ({
  products,
  onSelectMalaSelector,
  onOpenProductModal,
  onOpenCart,
}) => {
  return (
    <section id="final-collection" className="relative z-10 min-h-screen py-28 px-6 sm:px-12 md:px-16 flex flex-col justify-between bg-gradient-to-b from-transparent via-black/80 to-[#080808]">
      {/* Top Header */}
      <div className="max-w-2xl flex flex-col gap-4 mx-auto text-center items-center">
        <Reveal delay={100}>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-400/30">
            <Sparkles size={13} className="text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>SACRED COLLECTION</span>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <h2 className="text-4xl sm:text-6xl font-serif text-white font-normal tracking-tight">
            Find your sacred beads.
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p className="text-lg sm:text-xl font-serif italic text-amber-100/90 font-light">
            Five natural malas. One timeless ritual.
          </p>
        </Reveal>
      </div>

      {/* Five Product Selectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto w-full my-16">
        {products.map((product, idx) => (
          <Reveal key={product.id} delay={150 + idx * 80}>
            <div className="border border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur-xl p-5 rounded-2xl transition-all duration-300 hover:border-amber-400/60 group flex flex-col justify-between h-full shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
                    0{idx + 1} / {product.category}
                  </span>
                  <span className="font-mono text-xs font-bold text-white">
                    {product.priceFormatted}
                  </span>
                </div>

                <div className="aspect-square rounded-xl overflow-hidden mb-4 border border-white/10 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-wider text-white/90 font-medium">
                    108 Beads
                  </span>
                </div>

                <h3 className="font-serif text-lg text-white font-medium group-hover:text-amber-200 transition-colors mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-white/60 font-light line-clamp-2 mb-4">
                  {product.editorialSubtitle}
                </p>
              </div>

              {/* Selector Action Buttons */}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
                <button
                  onClick={() => onSelectMalaSelector(product.id)}
                  className="w-full py-2 px-3 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 text-white font-mono text-[10px] uppercase tracking-[0.15em] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ArrowUp size={12} className="text-amber-400" />
                  <span>3D View</span>
                </button>

                <button
                  onClick={() => onOpenProductModal(product)}
                  className="w-full py-2 px-3 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-semibold font-mono text-[10px] uppercase tracking-[0.15em] transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>View & Buy →</span>
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Final CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto w-full">
        <Reveal delay={600}>
          <button
            onClick={() => onSelectMalaSelector('tulsi-108')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-[0.15em] transition-all cursor-pointer backdrop-blur-md shadow-xl hover:scale-105"
          >
            Explore the collection
          </button>
        </Reveal>

        <Reveal delay={650}>
          <button
            onClick={onOpenCart}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-semibold font-mono text-xs uppercase tracking-[0.15em] transition-all cursor-pointer shadow-[0_0_25px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 hover:scale-105"
          >
            <ShoppingBag size={16} />
            <span>Shop Now</span>
          </button>
        </Reveal>
      </div>

      {/* Footer copyright */}
      <div className="text-center pt-16 font-mono text-[10px] text-white/40 uppercase tracking-[0.2em]">
        © {new Date().getFullYear()} MALA — SACRED 108 BEADS STORE. ALL RIGHTS RESERVED.
      </div>
    </section>
  );
};
