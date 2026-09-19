import React from 'react';
import { X, Sparkles, ShieldCheck, Heart } from 'lucide-react';

interface ChateauAboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChateauAboutModal: React.FC<ChateauAboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl bg-black/90 border border-white/15 rounded-3xl p-6 sm:p-10 text-white shadow-2xl z-50">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-400/30 font-bold">
            THE CHÂTEAU CRAFT STORY
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold mb-4">
          Artisan Sacred Luxury
        </h2>

        <p className="text-sm leading-relaxed text-white/80 font-light mb-6">
          CHÂTEAU fuses haute couture luxury aesthetic with sacred Indian mala craftsmanship. Every piece is individually hand-knotted by traditional artisans using ethically sourced 108 beads, finished with authentic silk tassels.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-start gap-2">
            <Sparkles size={20} className="text-amber-400" />
            <h3 className="font-serif text-sm font-bold text-white">108 Bead Standard</h3>
            <p className="text-xs text-white/60 font-light">Precision knotted with sacred central Guru bead.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-start gap-2">
            <ShieldCheck size={20} className="text-amber-400" />
            <h3 className="font-serif text-sm font-bold text-white">Vedic Energized</h3>
            <p className="text-xs text-white/60 font-light">Traditionally blessed along the sacred Ganges river.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-start gap-2">
            <Heart size={20} className="text-rose-400" />
            <h3 className="font-serif text-sm font-bold text-white">Pure Materials</h3>
            <p className="text-xs text-white/60 font-light">100% natural Vrindavan Tulsi, Rudraksha, Sandalwood & Sphatik.</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-[0.2em] border border-white/20 transition-all cursor-pointer"
        >
          Close Craft Story
        </button>
      </div>
    </div>
  );
};
