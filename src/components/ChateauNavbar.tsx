import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled ? 'py-4' : 'py-7'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Name */}
        <button
          onClick={() => onScrollToSection('tulsi')}
          className="flex items-center gap-3 transition-transform hover:scale-105 cursor-pointer group"
          style={{ color: textColor }}
        >
          <Sparkles size={20} style={{ color: themeConfig.accent }} className="group-hover:rotate-45 transition-transform duration-300" />
          <span className="font-serif font-bold text-xl md:text-2xl tracking-[0.2em] uppercase">
            CHÂTEAU
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-10">
          {['tulsi', 'rudraksha', 'sandalwood', 'sphatik'].map((malaId) => (
            <button
              key={malaId}
              onClick={() => onScrollToSection(malaId)}
              className="text-xs uppercase font-mono tracking-[0.2em] transition-opacity cursor-pointer hover:opacity-100 opacity-70"
              style={{
                color: textColor,
                fontWeight: currentTheme === malaId ? 700 : 400,
              }}
            >
              {malaId}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenAboutModal}
            className="hidden sm:block text-xs uppercase font-mono tracking-[0.2em] transition-opacity cursor-pointer hover:opacity-100 opacity-70"
            style={{ color: textColor }}
          >
            Craft Story
          </button>

          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full transition-all cursor-pointer hover:scale-110"
            style={{
              color: textColor,
              backgroundColor: themeConfig.isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(42, 24, 16, 0.08)',
            }}
            title="Shopping Cart"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 font-mono text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: themeConfig.accent,
                  color: '#ffffff',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
