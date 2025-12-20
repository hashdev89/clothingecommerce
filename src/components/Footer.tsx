import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-white/5 py-24 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          {/* Brand */}
          <motion.div 
            className="md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl tracking-[0.4em] text-white/90 mb-8">NOCTIS</h3>
            <p className="text-sm text-white/40 leading-relaxed tracking-wide max-w-xs">
              Redefining intimate luxury through timeless design and uncompromising
              craftsmanship
            </p>
          </motion.div>

          {/* Shop */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="mb-8 tracking-[0.3em] text-[10px] text-white/40 uppercase">
              Shop
            </h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li>
                <a href="#" className="hover:text-white transition-colors tracking-wide">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors tracking-wide">
                  Collections
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors tracking-wide">
                  Bestsellers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors tracking-wide">
                  Gift Cards
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="mb-8 tracking-[0.3em] text-[10px] text-white/40 uppercase">
              Support
            </h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li>
                <a href="#" className="hover:text-white transition-colors tracking-wide">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors tracking-wide">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors tracking-wide">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors tracking-wide">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="mb-8 tracking-[0.3em] text-[10px] text-white/40 uppercase">
              Company
            </h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li>
                <a href="#" className="hover:text-white transition-colors tracking-wide">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors tracking-wide">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors tracking-wide">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors tracking-wide">
                  Press
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h4 className="mb-8 tracking-[0.3em] text-[10px] text-white/40 uppercase">
              Connect
            </h4>
            <div className="flex items-center gap-4 mb-6">
              <motion.a
                href="#"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={16} strokeWidth={1.5} className="text-white/60" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook size={16} strokeWidth={1.5} className="text-white/60" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter size={16} strokeWidth={1.5} className="text-white/60" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={16} strokeWidth={1.5} className="text-white/60" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div 
          className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-xs text-white/30 tracking-wider">
            © 2025 NOCTIS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8 text-xs text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors tracking-wide">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white/60 transition-colors tracking-wide">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white/60 transition-colors tracking-wide">
              Accessibility
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}