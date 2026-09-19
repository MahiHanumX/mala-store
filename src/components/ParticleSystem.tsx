import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ParticleSystemProps {
  color: string;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ color }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 5) + 2,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.35 + 0.15,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: color,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px ${color}`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, Math.sin(p.id) * 30, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
