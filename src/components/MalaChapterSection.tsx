import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Reveal } from './Reveal';
import type { MalaProduct } from '../data/malaProducts';

interface MalaChapterSectionProps {
  product: MalaProduct;
  chapterIndex: number; // 0 to 4
  totalChapters: number;
  chapterProgress: number; // 0 to 1 for this section
  isBinduFocused: boolean;
  onOpenProductModal: (product: MalaProduct) => void;
}

export const MalaChapterSection: React.FC<MalaChapterSectionProps> = ({
  product,
  chapterIndex,
  totalChapters,
  chapterProgress,
  isBinduFocused,
  onOpenProductModal,
}) => {
  const chapterNumberStr = `0${chapterIndex + 1}`;

  return (
    <div
      id={`mala-chapter-${product.id}`}
      className="relative min-h-[220vh] w-full flex flex-col justify-between py-24 px-6 sm:px-12 md:px-16"
    >
      {/* Sticky Content Overlay container */}
      <div className="sticky top-24 z-20 w-full flex flex-col justify-between min-h-[82vh] pointer-events-none">
        {/* Top Header Row */}
        <div className="flex items-center justify-between w-full">
          {/* Left Chapter Tag */}
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-amber-400/90 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 w-fit pointer-events-auto shadow-lg">
            <span>{chapterNumberStr} / 0{totalChapters}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-white font-medium">{product.category}</span>
          </div>

          {/* Right Bead Spec Tag */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white/80 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 shadow-lg">
            <Sparkles size={13} className="text-amber-400" />
            <span>{product.beadCount} Sacred Beads</span>
          </div>
        </div>

        {/* Middle Main Content Split */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 my-auto w-full">
          {/* Left Editorial Text & Infographic Specs */}
          <div className="max-w-md flex flex-col gap-4 pointer-events-auto">
            <Reveal delay={100}>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400 font-bold bg-amber-500/10 border border-amber-400/30 px-3 py-1 rounded-md w-fit">
                {product.keywords}
              </span>
            </Reveal>

            <Reveal delay={200}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-tight">
                {product.name}
              </h2>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-xl sm:text-2xl font-serif italic text-amber-100/90 font-light border-l-2 border-amber-400/60 pl-3.5">
                {product.quote}
              </p>
            </Reveal>

            {/* Infographic Bullet Benefits List */}
            <Reveal delay={400}>
              <div className="space-y-2 mt-2 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                {product.benefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2.5 text-xs text-white/85 font-light">
                    <CheckCircle2 size={14} className="text-amber-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Side: Product Info / Bindu Reveal Panel */}
          <div className="w-full max-w-sm md:ml-auto pointer-events-auto">
            {!isBinduFocused ? (
              /* Standard Glass Product Preview Panel */
              <div className="border border-white/15 bg-black/50 backdrop-blur-2xl p-6 rounded-2xl shadow-2xl transition-all duration-500 hover:border-amber-400/40">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-serif text-xl text-white font-medium">{product.name}</h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-amber-300/80 mt-0.5">
                      {product.beadCount} Sacred Beads • {product.category}
                    </p>
                  </div>
                  <span className="font-mono text-lg font-bold text-amber-400">
                    {product.priceFormatted}
                  </span>
                </div>

                <p className="text-xs text-white/70 line-clamp-3 font-light leading-relaxed mb-5">
                  {product.description}
                </p>

                <button
                  onClick={() => onOpenProductModal(product)}
                  className="w-full py-3 px-4 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-[0.15em] transition-all flex items-center justify-between cursor-pointer group shadow-lg"
                >
                  <span>Explore Product</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-amber-400" />
                </button>
              </div>
            ) : (
              /* BINDU REVEAL CARD (Triggered at 80-90% scroll) */
              <div className="border-2 border-amber-400/70 bg-gradient-to-b from-black/90 via-black/95 to-amber-950/50 backdrop-blur-2xl p-7 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.3)] transition-all duration-500 animate-fade-in transform scale-105">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-300 font-bold bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-400/40 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    THE BINDU REVEAL
                  </span>
                  <span className="font-mono text-xl font-bold text-amber-400">
                    {product.priceFormatted}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-white font-medium mb-1">
                  {product.name}
                </h3>
                <p className="font-mono text-xs text-amber-200/80 mb-4">
                  {product.beadCount} Sacred Beads • Guru Bead Focus
                </p>

                <p className="text-xs text-white/80 font-light mb-6 leading-relaxed">
                  The Guru bead (Bindu) marks the origin and sacred completion of your 108 mantra repetitions.
                </p>

                <button
                  onClick={() => onOpenProductModal(product)}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-semibold font-mono text-xs uppercase tracking-[0.15em] transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 hover:scale-[1.02]"
                >
                  <span>View & Buy →</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div className="w-full flex items-center justify-between pointer-events-auto">
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mr-4">
            <div
              className="bg-gradient-to-r from-amber-400 to-amber-200 h-full transition-all duration-150"
              style={{ width: `${Math.min(Math.max(chapterProgress * 100, 0), 100)}%` }}
            />
          </div>
          <span className="font-mono text-[10px] text-white/50 tracking-widest whitespace-nowrap">
            {Math.round(chapterProgress * 100)}% ROTATION
          </span>
        </div>
      </div>
    </div>
  );
};
