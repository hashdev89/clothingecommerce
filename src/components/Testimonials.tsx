import { motion, useScroll, useTransform } from 'motion/react';
import { Quote } from 'lucide-react';
import { useRef } from 'react';

const testimonials = [
  {
    id: 1,
    quote: "NOCTIS has redefined my understanding of luxury. Every piece feels like wearable art.",
    author: "Isabella Laurent",
    role: "Fashion Editor, Vogue",
  },
  {
    id: 2,
    quote: "The attention to detail is extraordinary. These pieces make me feel powerful and feminine.",
    author: "Sophia Chen",
    role: "Creative Director",
  },
  {
    id: 3,
    quote: "Finally, lingerie that celebrates rather than compromises. Pure sophistication.",
    author: "Emma Bergström",
    role: "Model & Entrepreneur",
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50 + index * 20, -50 - index * 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      className="group"
    >
      <motion.div
        className="border border-border p-10 hover:border-foreground/20 transition-all duration-500 bg-foreground/[0.02] hover:bg-foreground/[0.04]"
        whileHover={{ y: -10 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          <Quote size={32} strokeWidth={1} className="text-foreground/20 mb-8" />
        </motion.div>
        
        <motion.p 
          className="text-lg text-foreground/80 mb-8 leading-relaxed tracking-wide italic"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
        >
          "{testimonial.quote}"
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
          className="h-px w-12 bg-foreground/20 mb-6"
          style={{ originX: 0 }}
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
        >
          <p className="text-sm text-foreground/90 tracking-wide mb-1">
            {testimonial.author}
          </p>
          <p className="text-xs text-foreground/40 tracking-wider uppercase">
            {testimonial.role}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section className="relative py-40 bg-background border-y border-border overflow-hidden" ref={sectionRef}>
      {/* Animated Background */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none"
        style={{ y: backgroundY }}
      />

      <div className="max-w-[1800px] mx-auto px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="mb-32"
        >
          <motion.p 
            className="text-[10px] tracking-[0.5em] uppercase mb-6 text-foreground/40"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Testimonials
          </motion.p>
          <motion.h2 
            className="text-6xl md:text-8xl tracking-tighter text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Voices of
            <br />
            <span className="text-foreground/30">Elegance</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}