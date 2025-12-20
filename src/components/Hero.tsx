import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black z-10" />
        <motion.img
          src="https://images.unsplash.com/photo-1762843353166-e0542bba1a66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbGluZ2VyaWUlMjBtb2RlbHxlbnwxfHx8fDE3NjYyMjg5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Hero"
          className="w-full h-full object-cover opacity-40"
          style={{ y }}
        />
      </motion.div>

      {/* Animated Lines */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1, duration: 1.5, ease: [0.6, 0.05, 0.01, 0.9] }}
          style={{ left: '10%' }}
        />
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1, duration: 1.5, ease: [0.6, 0.05, 0.01, 0.9] }}
          style={{ right: '10%' }}
        />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-[1800px] mx-auto px-8 lg:px-16 text-center"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.p
            className="text-[10px] tracking-[0.5em] uppercase mb-12 text-white/40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Winter Collection 2025
          </motion.p>
          
          <motion.h1
            className="text-7xl md:text-9xl lg:text-[12rem] mb-12 tracking-tighter text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            ETERNAL
            <br />
            <span className="text-white/30">ELEGANCE</span>
          </motion.h1>
          
          <motion.p
            className="text-base md:text-lg max-w-xl mx-auto mb-16 text-white/60 tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Where sophistication meets sensuality in every stitch
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.button
              className="group relative inline-flex items-center gap-4 border border-white/20 text-white px-12 py-6 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />
              <span className="relative z-10 tracking-[0.3em] text-xs group-hover:text-black transition-colors duration-300">
                DISCOVER
              </span>
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className="relative z-10 group-hover:translate-x-1 group-hover:text-black transition-all duration-300"
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{ opacity }}
      >
        <div className="flex flex-col items-center gap-4 text-white/30">
          <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <motion.div
            className="w-px h-20 bg-white/20"
            animate={{ height: [80, 40, 80] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}