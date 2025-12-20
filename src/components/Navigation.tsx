import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  scrolled: boolean;
}

export function Navigation({ scrolled }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16 py-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <a href="#" className="text-xl tracking-[0.4em] text-white/90 hover:text-white transition-colors">
              NOCTIS
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden lg:flex items-center gap-16 flex-1 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <a href="#collections" className="text-sm tracking-[0.2em] text-white/60 hover:text-white transition-all duration-300">
              COLLECTIONS
            </a>
            <a href="#new" className="text-sm tracking-[0.2em] text-white/60 hover:text-white transition-all duration-300">
              NEW
            </a>
            <a href="#about" className="text-sm tracking-[0.2em] text-white/60 hover:text-white transition-all duration-300">
              ABOUT
            </a>
            <a href="#contact" className="text-sm tracking-[0.2em] text-white/60 hover:text-white transition-all duration-300">
              CONTACT
            </a>
          </motion.div>

          {/* Icons */}
          <motion.div
            className="flex items-center gap-8 flex-1 justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <button className="text-white/60 hover:text-white transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="text-white/60 hover:text-white transition-colors relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] w-4 h-4 flex items-center justify-center tracking-wider">
                0
              </span>
            </button>
            <button
              className="lg:hidden text-white/60 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black border-t border-white/5"
          >
            <div className="px-8 py-8 flex flex-col gap-6">
              <a href="#collections" className="text-sm tracking-[0.2em] text-white/60 hover:text-white transition-colors">
                COLLECTIONS
              </a>
              <a href="#new" className="text-sm tracking-[0.2em] text-white/60 hover:text-white transition-colors">
                NEW
              </a>
              <a href="#about" className="text-sm tracking-[0.2em] text-white/60 hover:text-white transition-colors">
                ABOUT
              </a>
              <a href="#contact" className="text-sm tracking-[0.2em] text-white/60 hover:text-white transition-colors">
                CONTACT
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
