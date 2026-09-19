import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { Reveal } from './Reveal';

interface SectionTwoProps {
  onNavigateToStore: () => void;
  onOpenConsultationModal: () => void;
}

export const SectionTwo: React.FC<SectionTwoProps> = ({
  onNavigateToStore,
  onOpenConsultationModal,
}) => {
  const capabilities = [
    {
      index: '01',
      title: 'Real-time Energy Vision',
      body: 'Reads energetic intent as it happens and surfaces the sacred gemstone frequency you need.',
    },
    {
      index: '02',
      title: 'Layered Crystal Insight',
      body: 'Moves from rough raw mineral outline to 108 hand-knotted sacred output without losing thread resonance.',
    },
    {
      index: '03',
      title: 'Adaptive Mantra Speed',
      body: 'Learns your dhyana cadence and tightens every pass as you practice breathwork.',
    },
  ];

  return (
    <section className="min-h-screen supports-[height:100svh]:min-h-[100svh] pt-24 sm:pt-28 pb-12 md:pb-16 px-5 sm:px-8 md:px-12 flex flex-col justify-between relative z-10">
      {/* Top Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8 w-full">
        {/* Left Badge */}
        <Reveal delay={120}>
          <div className="border-l-3 border-amber-400 bg-gradient-to-r from-amber-500/20 to-white/10 px-3.5 py-1.5 backdrop-blur-md font-mono text-[11px] uppercase tracking-[0.15em] text-amber-200 border-r border-y border-amber-500/30 rounded-r-md drop-shadow-md w-fit flex items-center gap-2">
            <Sparkles size={13} className="text-amber-400" />
            <span>Sacred Energy On Demand</span>
          </div>
        </Reveal>

        {/* Right Copy */}
        <div className="max-w-sm sm:text-right">
          <Reveal delay={220}>
            <p className="text-lg sm:text-xl leading-relaxed text-white drop-shadow-md">
              Our sacred malas don't just adorn — they interpret, sharpen, and deliver the signal you need.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Bottom Area */}
      <div className="flex flex-col md:flex-row items-stretch md:items-end justify-between gap-12 lg:gap-16 w-full mt-16 md:mt-0">
        {/* Left Column */}
        <div className="flex-1 max-w-xl flex flex-col justify-end">
          {/* H2 Headline */}
          <Reveal delay={180}>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-2xl">
              <span className="gold-gradient-text font-medium">Learn to feel</span><br />
              brilliantly.
            </h2>
          </Reveal>

          {/* Body */}
          <Reveal delay={320}>
            <p className="mt-6 max-w-md text-sm sm:text-base text-white/85 drop-shadow-md leading-relaxed">
              From the first raw seed selection to the final silk knot render, Nova Mala turns spiritual intent into decisions your soul can act on — quietly, precisely, at speed.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={420}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onNavigateToStore}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 px-6 py-3 text-xs sm:text-sm font-semibold text-black hover:opacity-90 transition-all cursor-pointer shadow-lg hover:scale-105"
              >
                <Sparkles size={14} />
                <span>Explore Mala Store</span>
                <ChevronRight size={14} />
              </button>
              <button
                onClick={onOpenConsultationModal}
                className="rounded-full border border-amber-400/40 bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-3 text-xs sm:text-sm text-amber-200 hover:text-white transition-all cursor-pointer shadow-md"
              >
                Free Consultation
              </button>
            </div>
          </Reveal>
        </div>

        {/* Right — Frosted Capability Panel */}
        <div className="w-full max-w-md rounded-2xl glass-panel-gold px-5 sm:px-6 shadow-2xl">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.index} delay={300 + i * 110}>
              <div
                className={`flex gap-5 py-5 group transition-colors ${
                  i < capabilities.length - 1 ? 'border-b border-white/15' : ''
                }`}
              >
                <span className="font-mono text-[11px] tracking-[0.15em] text-amber-300/80 pt-0.5 font-bold">
                  {cap.index}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-amber-200 transition-colors">
                      {cap.title}
                    </h3>
                    <ChevronRight
                      size={16}
                      className="text-amber-400/60 group-hover:translate-x-1 group-hover:text-amber-300 transition-all"
                    />
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                    {cap.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
