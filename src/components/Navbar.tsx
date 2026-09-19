import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { Reveal } from './Reveal';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAboutModal?: () => void;
  onOpenContactModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onScrollToSection,
  cartCount,
  onOpenCart,
  onOpenAboutModal,
  onOpenContactModal,
}) => {
  const navLinks = [
    { label: 'Explore', sectionId: 'hero' },
    { label: 'Malas', sectionId: 'malas-collection' },
    { label: 'About', action: onOpenAboutModal },
    { label: 'Contact', action: onOpenContactModal },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border border-white/15 bg-black/60 backdrop-blur-xl mx-3 my-3 sm:mx-6 sm:my-4 rounded-2xl transition-all shadow-2xl">
      <div className="w-full px-5 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Brand Logo 'mala' */}
        <Reveal delay={0}>
          <button
            onClick={() => onScrollToSection('hero')}
            className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity cursor-pointer group"
          >
            <div className="relative">
              <Sparkles size={16} className="text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <span className="text-xl sm:text-2xl font-serif tracking-tight text-white font-normal lowercase">
              mala
            </span>
          </button>
        </Reveal>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <Reveal key={link.label} delay={100 + i * 80}>
              <button
                onClick={() => {
                  if (link.sectionId) {
                    onScrollToSection(link.sectionId);
                  } else if (link.action) {
                    link.action();
                  }
                }}
                className="text-xs uppercase font-mono tracking-[0.15em] text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            </Reveal>
          ))}
        </nav>

        {/* Right: Cart & Shop Now CTA */}
        <div className="flex items-center gap-2.5">
          {/* Cart Icon Button */}
          <Reveal delay={350}>
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl border border-white/15 bg-white/10 hover:bg-white/20 backdrop-blur-md text-amber-200 transition-all cursor-pointer shadow-md"
              title="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-mono text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
          </Reveal>

          {/* Shop Now Button */}
          <Reveal delay={400}>
            <button
              onClick={() => onScrollToSection('malas-collection')}
              className="rounded-xl border border-white/20 bg-white/15 hover:bg-white/25 backdrop-blur-md px-4 py-2 text-xs font-mono uppercase tracking-[0.15em] text-white transition-all cursor-pointer hover:scale-105 shadow-lg"
            >
              Shop Now
            </button>
          </Reveal>
        </div>
      </div>
    </header>
  );
};
