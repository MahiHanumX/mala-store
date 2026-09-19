import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { Reveal } from './Reveal';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  return (
    <section id="hero" className="min-h-screen relative z-10 flex flex-col justify-between pt-32 pb-16 px-6 sm:px-12 md:px-16 pointer-events-none">
      {/* Top / Left Hero Editorial Content */}
      <div className="max-w-xl flex flex-col items-start gap-6 pointer-events-auto mt-12 sm:mt-16">
        {/* Subtitle / Category tag */}
        <Reveal delay={150}>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-300/90">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>/ SACRED COLLECTION</span>
          </div>
        </Reveal>

        {/* Large Editorial Headline */}
        <Reveal delay={280}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-normal text-white leading-[1.05] tracking-tight drop-shadow-2xl">
            Discover <br />
            <span className="italic font-light text-amber-100">your mala.</span>
          </h1>
        </Reveal>

        {/* Description */}
        <Reveal delay={380}>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed max-w-md drop-shadow-md">
            Natural sacred beads crafted for prayer, meditation and daily practice.
          </p>
        </Reveal>

        {/* Glass Badge & CTA */}
        <Reveal delay={480}>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <div className="border border-white/15 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl font-mono text-[11px] uppercase tracking-[0.15em] text-amber-200 flex items-center gap-2 shadow-lg">
              <Sparkles size={13} className="text-amber-400" />
              <span>108 SACRED BEADS</span>
            </div>

            <button
              onClick={onExploreClick}
              className="border border-amber-500/40 bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:border-amber-400 backdrop-blur-md px-5 py-2.5 rounded-xl font-mono text-[11px] uppercase tracking-[0.15em] text-amber-200 transition-all cursor-pointer hover:scale-105 shadow-xl flex items-center gap-2 group"
            >
              <span>Scroll to Explore</span>
              <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </Reveal>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="flex justify-between items-end w-full pointer-events-auto">
        <Reveal delay={600}>
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
            <div className="w-8 h-[1px] bg-white/30" />
            <span>01 / 05 Mala Collection</span>
          </div>
        </Reveal>

        <Reveal delay={650}>
          <div className="flex flex-col items-center gap-2 text-white/40 text-[10px] font-mono uppercase tracking-[0.2em] animate-pulse">
            <span>Scroll</span>
            <ChevronDown size={16} />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
