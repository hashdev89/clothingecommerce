import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: contentProgress } = useScroll({
    target: contentRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 150]);
  const contentY = useTransform(contentProgress, [0, 1], [100, -50]);
  const lineScale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <section id="about" className="relative py-40 bg-black overflow-hidden" ref={containerRef}>
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          {/* Content */}
          <motion.div
            ref={contentRef}
            style={{ y: contentY }}
          >
            <motion.p 
              className="text-[10px] tracking-[0.5em] uppercase mb-8 text-white/40"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              Philosophy
            </motion.p>
            <motion.h2 
              className="text-5xl md:text-7xl tracking-tighter mb-12 text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The Art of
              <br />
              <span className="text-white/30">Intimacy</span>
            </motion.h2>
            
            <motion.div 
              className="space-y-8 text-base text-white/60 tracking-wide leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                NOCTIS was born from a singular vision: to redefine intimate wear
                through the lens of architectural minimalism and timeless elegance.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Each piece is meticulously crafted by master artisans using only the
                finest sustainable materials—silk from ethically managed farms,
                lace from century-old European ateliers.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                We believe that what touches your skin should be an extension of your
                soul. Not a costume, but a second skin that empowers, elevates, and
                celebrates the essence of who you are.
              </motion.p>
            </motion.div>
            
            <motion.button
              className="mt-16 border border-white/20 text-white px-12 py-5 tracking-[0.3em] text-xs relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
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
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                OUR STORY
              </span>
            </motion.button>
          </motion.div>

          {/* Images */}
          <div className="relative h-[600px]">
            <motion.div
              ref={image1Ref}
              className="absolute top-0 left-0 w-1/2 h-2/3 overflow-hidden bg-white/5"
              style={{ y: y1 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1666961332878-66e7641a0164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHNpbGslMjBmYWJyaWN8ZW58MXx8fHwxNzY2MjI5MjkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Fabric detail"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
            
            <motion.div
              ref={image2Ref}
              className="absolute bottom-0 right-0 w-3/5 h-3/4 overflow-hidden bg-white/5"
              style={{ y: y2 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1687716189063-55c3ccc06b8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZGFyayUyMGludGVyaW9yfGVufDF8fHx8MTc2NjIyOTI5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Detail"
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
            </motion.div>
            
            {/* Decorative Line */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"
              style={{ scaleY: lineScale }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}