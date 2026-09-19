import React from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { Reveal } from './Reveal';

const PORTRAIT_URL = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260728_050334_5b076e26-0ce7-4898-b432-d764190e448f.png&w=1280&q=85';

interface SectionOneProps {
  onOpenConsultationModal: () => void;
  onNavigateToStore?: () => void;
}

export const SectionOne: React.FC<SectionOneProps> = ({
  onOpenConsultationModal,
  onNavigateToStore,
}) => {
  const serviceList = [
    '/ 108 HAND-KNOTTED MALAS',
    '/ SACRED RISHIKESH BLESSING',
    '/ HEALING CRYSTAL GEMSTONES',
  ];

  return (
    <section className="min-h-screen supports-[height:100svh]:min-h-[100svh] pt-24 sm:pt-28 pb-12 md:pb-16 px-5 sm:px-8 md:px-12 flex flex-col justify-between relative z-10">
      {/* Top Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8 w-full">
        {/* Left — Service List */}
        <div className="flex flex-col gap-2">
          {serviceList.map((service, i) => (
            <Reveal key={service} delay={150 + i * 120}>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-amber-200/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                {service}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Right — Intro Text */}
        <div className="max-w-xs sm:text-right">
          <Reveal delay={300}>
            <p className="text-lg sm:text-xl leading-relaxed text-white drop-shadow-md">
              We design sacred malas that bring clarity, precision, and spiritual harmony to your daily practice.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 w-full mt-16 md:mt-0">
        {/* Left Headline & Badge */}
        <div className="flex flex-col items-start max-w-2xl">
          {/* Badge */}
          <Reveal delay={150}>
            <button
              onClick={onNavigateToStore}
              className="border-l-3 border-amber-400 bg-gradient-to-r from-amber-500/20 to-white/10 px-3.5 py-1.5 backdrop-blur-md font-mono text-[11px] uppercase tracking-[0.15em] text-amber-200 border-r border-y border-amber-500/30 rounded-r-md drop-shadow-md mb-5 flex items-center gap-2 hover:border-amber-400 transition-all cursor-pointer group"
            >
              <Sparkles size={13} className="text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>We Handcraft 100+ Sacred Malas</span>
              <ChevronRight size={12} className="text-amber-400/70" />
            </button>
          </Reveal>


          {/* H1 Headline */}
          <Reveal delay={280}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white drop-shadow-2xl">
              <span className="gold-gradient-text font-medium">Clear. Precise.</span><br />
              Sacred & Automated.
            </h1>
          </Reveal>
        </div>

        {/* Right — Glass Contact Card */}
        <Reveal delay={420}>
          <div className="flex items-center gap-4 rounded-xl glass-panel-gold p-3.5 backdrop-blur-md border border-amber-500/30 hover:border-amber-400 transition-all shadow-xl group">
            <div className="relative">
              <img
                src={PORTRAIT_URL}
                alt="Mitha, co-founder of NovaAI Mala Store"
                className="h-24 w-20 rounded-lg object-cover flex-shrink-0 border border-amber-400/40"
              />
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-black rounded-full" />
            </div>
            <div className="flex flex-col gap-1.5 pr-2">
              <span className="text-sm font-medium text-white group-hover:text-amber-200 transition-colors drop-shadow-sm">
                Talk with Mitha
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-amber-300/80">
                Co-founder & Mala Specialist
              </span>
              <button
                onClick={onOpenConsultationModal}
                className="mt-1.5 flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 px-4 py-2 text-xs font-semibold text-black hover:from-amber-200 hover:to-amber-300 transition-all cursor-pointer w-fit shadow-md hover:scale-105"
              >
                <span>Book 15-mins call</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
