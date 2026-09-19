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
      className="relative h-[100dvh] w-full snap-start overflow-hidden flex items-center justify-center select-none"
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
          className="font-serif font-black text-[32vw] md:text-[24vw] leading-none tracking-[-0.08em] uppercase whitespace-nowrap"
          style={{ color: textColor }}
        >
          {item.watermark}
        </span>
      </motion.div>

      {/* Content Wrapper Split Layout */}
      <div className="relative z-10 max-w-[1400px] w-full h-full mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
        {/* Left Side: Massive Scaled Mala Product Photo */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-end justify-center relative">
          <motion.div
            className="w-full h-full flex items-end justify-center perspective-1000"
            initial={{ opacity: 0, x: -100 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 3D Mouse Parallax & Floating Motion */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative flex items-end justify-center translate-y-8 md:translate-y-24 mb-10 md:mb-16"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-[55vh] md:h-[82vh] w-auto max-w-none object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)] rounded-3xl"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side: Editorial Typography Block */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-center gap-5 md:gap-7 pb-12 md:pb-0"
          initial={{ opacity: 0, x: 60 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ color: textColor }}
        >
          {/* Subtitle Badge */}
          <div className="flex items-center gap-2">
            <span
              className="font-mono text-xs uppercase tracking-[0.25em] font-bold px-3 py-1 rounded-full border border-current/20 backdrop-blur-md"
              style={{ color: theme.accent }}
            >
              {item.keywords}
            </span>
          </div>

          {/* Headline Subtitle */}
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] whitespace-pre-line drop-shadow-lg">
            {item.subtitle}
          </h2>

          {/* Body Description */}
          <p className="font-light text-base md:text-lg leading-relaxed whitespace-pre-line opacity-90 drop-shadow-md max-w-lg">
            {item.description}
          </p>

          {/* Benefits Checkbox List */}
          <div className="space-y-2 py-2">
            {item.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs md:text-sm font-light opacity-85">
                <Check size={16} style={{ color: theme.accent }} className="flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* Price & Action Buttons */}
          <div className="flex items-center gap-5 pt-3">
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight">
              {item.priceFormatted}
            </span>

            <button
              onClick={() => onOpenProductModal(item)}
              className="px-6 py-3.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer shadow-2xl flex items-center gap-2 group hover:scale-105"
              style={{
                backgroundColor: textColor,
                color: theme.isDark ? '#000000' : '#FFFFFF',
              }}
            >
              <span>Explore Mala</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onAddToCart(item, 1)}
              className="px-6 py-3.5 rounded-full font-mono text-xs uppercase tracking-[0.2em] border border-current/30 hover:bg-current/10 transition-all cursor-pointer backdrop-blur-md flex items-center gap-2"
              style={{ color: textColor }}
            >
              <Sparkles size={14} style={{ color: theme.accent }} />
              <span>Add to Cart</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
