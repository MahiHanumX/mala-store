import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Menu, X } from 'lucide-react';
import { THEME_COLORS } from '../data/chateauData';

interface ChateauNavbarProps {
  currentTheme: string;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAboutModal: () => void;
  onScrollToSection: (id: string) => void;
}

export const ChateauNavbar: React.FC<ChateauNavbarProps> = ({
  currentTheme,
  cartCount,
  onOpenCart,
  onOpenAboutModal,
  onScrollToSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themeConfig = THEME_COLORS[currentTheme] || THEME_COLORS.tulsi;
  const textColor = themeConfig.text;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out ${
        isScrolled ? 'py-3 md:py-4 bg-white/10 backdrop-blur-md shadow-sm' : 'py-4 md:py-7'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 flex items-center justify-between">
        {/* Brand Name */}
        <button
          onClick={() => onScrollToSection('tulsi')}
          className="flex items-center gap-2.5 transition-transform hover:scale-105 cursor-pointer group"
          style={{ color: textColor }}
        >
          <Sparkles size={18} style={{ color: themeConfig.accent }} className="group-hover:rotate-45 transition-transform duration-300" />
          <span className="font-serif font-bold text-lg md:text-2xl tracking-[0.2em] uppercase">
            CHÂTEAU
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {['tulsi', 'rudraksha', 'sandalwood', 'sphatik'].map((malaId) => (
            <button
              key={malaId}
              onClick={() => onScrollToSection(malaId)}
              className="text-xs uppercase font-mono tracking-[0.2em] transition-all cursor-pointer hover:opacity-100 opacity-75"
              style={{
                color: textColor,
                fontWeight: currentTheme === malaId ? 700 : 400,
                borderBottom: currentTheme === malaId ? `2px solid ${themeConfig.accent}` : 'none',
                paddingBottom: '2px',
              }}
            >
              {malaId}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={onOpenAboutModal}
            className="hidden sm:block text-xs uppercase font-mono tracking-[0.2em] transition-opacity cursor-pointer hover:opacity-100 opacity-75"
            style={{ color: textColor }}
          >
            Craft Story
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2 md:p-2.5 rounded-full transition-all cursor-pointer hover:scale-110 active:scale-95"
            style={{
              color: textColor,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 font-mono text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: themeConfig.accent,
                  color: '#ffffff',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full transition-all cursor-pointer"
            style={{ color: textColor }}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Quick Navigation Pills Bar */}
      <div className="md:hidden w-full px-4 pt-2.5 pb-1 overflow-x-auto no-scrollbar flex items-center gap-2">
        {['tulsi', 'rudraksha', 'sandalwood', 'sphatik'].map((malaId) => {
          const isActive = currentTheme === malaId;
          return (
            <button
              key={malaId}
              onClick={() => {
                onScrollToSection(malaId);
                setIsMobileMenuOpen(false);
              }}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'shadow-sm font-bold scale-105'
                  : 'opacity-70 border border-current/20'
              }`}
              style={{
                color: textColor,
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.35)' : 'transparent',
              }}
            >
              {malaId}
            </button>
          );
        })}
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 text-white shadow-2xl animate-fade-in"
        >
          <div className="flex flex-col gap-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/50 font-semibold">
              Select Collection
            </span>
            {['tulsi', 'rudraksha', 'sandalwood', 'sphatik'].map((malaId) => (
              <button
                key={malaId}
                onClick={() => {
                  onScrollToSection(malaId);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left text-base font-serif tracking-widest uppercase py-2 transition-all ${
                  currentTheme === malaId ? 'text-amber-400 font-bold pl-2 border-l-2 border-amber-400' : 'text-white/80'
                }`}
              >
                {malaId} Mala
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenAboutModal();
                setIsMobileMenuOpen(false);
              }}
              className="text-xs uppercase font-mono tracking-widest text-amber-300 hover:underline"
            >
              Our Craft Story →
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
