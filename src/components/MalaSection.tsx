import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { ParticleSystem } from './ParticleSystem';
import { THEME_COLORS, type MalaItem } from '../data/chateauData';

interface MalaSectionProps {
  item: MalaItem;
  onSetActiveTheme: (type: string) => void;
  onOpenProductModal: (item: MalaItem) => void;
  onAddToCart: (item: MalaItem, quantity: number) => void;
}

export const MalaSection: React.FC<MalaSectionProps> = ({
  item,
  onSetActiveTheme,
  onOpenProductModal,
  onAddToCart,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const sectionRef = useRef<HTMLElement | null>(null);

  // Trigger global background gradient & navbar theme change when section is in view
  useEffect(() => {
    if (inView) {
      onSetActiveTheme(item.type);
    }
  }, [inView, item.type, onSetActiveTheme]);

  // 3D Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 25 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const theme = THEME_COLORS[item.type] || THEME_COLORS.tulsi;
  const textColor = theme.text;

  return (
    <section
      id={item.id}
      ref={(node) => {
        ref(node);
        sectionRef.current = node;
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] md:h-[100dvh] w-full snap-start overflow-hidden flex items-center justify-center select-none pt-28 pb-12 md:py-0"
    >
      {/* Background Floating Particle System */}
      <ParticleSystem color={theme.particleColor} />

      {/* Layer 1: Massive Watermark Background Text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={inView ? { scale: 1, opacity: 0.08, y: 0 } : { scale: 0.9, opacity: 0, y: 50 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <span
          className="font-serif font-black text-[26vw] md:text-[24vw] leading-none tracking-[-0.08em] uppercase whitespace-nowrap opacity-40 md:opacity-100"
          style={{ color: textColor }}
        >
          {item.watermark}
        </span>
      </motion.div>

      {/* Content Wrapper Split Layout */}
      <div className="relative z-10 max-w-[1400px] w-full h-full mx-auto px-5 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-12">
        {/* Left Side: Mala Product Photo */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          <motion.div
            className="w-full flex items-center justify-center perspective-1000"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 3D Mouse Parallax & Floating Motion */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex items-center justify-center my-2 md:my-0 md:translate-y-16"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-[35vh] sm:h-[45vh] md:h-[80vh] max-h-[550px] w-auto max-w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] rounded-2xl md:rounded-3xl"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side: Editorial Typography Block */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-center gap-3.5 sm:gap-5 md:gap-7"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ color: textColor }}
        >
          {/* Subtitle Badge */}
          <div className="flex items-center gap-2">
            <span
              className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full border border-current/20 backdrop-blur-md"
              style={{ color: theme.accent }}
            >
              {item.keywords}
            </span>
          </div>

          {/* Headline Subtitle */}
          <h2 className="font-serif text-2xl sm:text-4xl md:text-6xl font-black tracking-tight leading-[1.15] whitespace-pre-line drop-shadow-md">
            {item.subtitle}
          </h2>

          {/* Body Description */}
          <p className="font-light text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line opacity-90 max-w-lg">
            {item.description}
          </p>

          {/* Benefits Checkbox List */}
          <div className="space-y-1.5 sm:space-y-2 py-1">
            {item.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-light opacity-90">
                <Check size={15} style={{ color: theme.accent }} className="flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Price & Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              {item.priceFormatted}
            </span>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => onOpenProductModal(item)}
                className="flex-1 sm:flex-initial px-5 sm:px-6 py-3 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] font-semibold transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2 group hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: textColor,
                  color: theme.isDark ? '#000000' : '#FFFFFF',
                }}
              >
                <span>Explore</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onAddToCart(item, 1)}
                className="flex-1 sm:flex-initial px-5 sm:px-6 py-3 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-[0.18em] border border-current/30 hover:bg-current/10 transition-all cursor-pointer backdrop-blur-md flex items-center justify-center gap-2 active:scale-95"
                style={{ color: textColor }}
              >
                <Sparkles size={13} style={{ color: theme.accent }} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
