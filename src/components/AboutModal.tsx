import React from 'react';
import { X, Sparkles, ShieldCheck, Heart } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl bg-black/90 border border-white/15 rounded-3xl p-6 sm:p-10 text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/30">
            OUR STORY
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-serif text-white font-normal mb-4">
          Crafting 108 Sacred Beads
        </h2>

        <p className="text-sm leading-relaxed text-white/80 font-light mb-6">
          Rooted in the ancient spiritual traditions of Rishikesh and Vrindavan, our malas are individually hand-knotted using authentic natural seeds, hardwoods, and high-clarity gemstones.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-start gap-2">
            <Sparkles size={20} className="text-amber-400" />
            <h3 className="font-serif text-sm font-medium text-white">108 Sacred Beads</h3>
            <p className="text-xs text-white/60 font-light">Traditional count with central Guru bead and silk tassel.</p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-start gap-2">
            <ShieldCheck size={20} className="text-amber-400" />
            <h3 className="font-serif text-sm font-medium text-white">Vedic Blessing</h3>
            <p className="text-xs text-white/60 font-light">Energized with sacred mantras along the river Ganges.</p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col items-start gap-2">
            <Heart size={20} className="text-rose-400" />
            <h3 className="font-serif text-sm font-medium text-white">Natural & Pure</h3>
            <p className="text-xs text-white/60 font-light">100% genuine Tulsi wood, Rudraksha, Sandalwood & Sphatik.</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-[0.15em] border border-white/20 transition-all cursor-pointer"
        >
          Close Story
        </button>
      </div>
    </div>
  );
};
