import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useState, useRef } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="relative py-40 bg-black overflow-hidden" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <motion.div
          style={{ scale, opacity, y }}
          className="border border-white/10 p-16 lg:p-24 text-center bg-white/[0.02]"
        >
          <motion.p
            className="text-[10px] tracking-[0.5em] uppercase mb-8 text-white/40"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Join Our Circle
          </motion.p>

          <motion.h2
            className="text-5xl md:text-7xl tracking-tighter mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Stay Connected
          </motion.h2>

          <motion.p
            className="text-base text-white/60 mb-16 max-w-2xl mx-auto tracking-wide leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Subscribe to receive exclusive previews, styling insights, and early access
            to our seasonal collections
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="YOUR EMAIL ADDRESS"
                required
                className="flex-1 bg-transparent border border-white/20 px-8 py-6 text-white placeholder:text-white/30 placeholder:text-xs placeholder:tracking-[0.3em] focus:outline-none focus:border-white/40 transition-colors"
              />
              <motion.button
                type="submit"
                className="group bg-white text-black px-12 py-6 hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-3 whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="tracking-[0.3em] text-xs">
                  {submitted ? 'SUBSCRIBED' : 'SUBSCRIBE'}
                </span>
                {!submitted && (
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                )}
              </motion.button>
            </div>
          </motion.form>

          <motion.p
            className="text-xs text-white/30 mt-8 tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            We respect your privacy. Unsubscribe anytime.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}