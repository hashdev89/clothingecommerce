import { motion, useScroll, useTransform } from 'motion/react';
import { Heart } from 'lucide-react';
import { useState, useRef } from 'react';

const products = [
  {
    id: 1,
    name: 'Obsidian Bralette',
    collection: 'Midnight Silk',
    price: 189,
    image: 'https://images.unsplash.com/photo-1631695117568-c56a4e039ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1pbmluZSUyMGVsZWdhbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjYyMjg5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: 'NEW',
  },
  {
    id: 2,
    name: 'Eclipse Bodysuit',
    collection: 'Noir Lace',
    price: 245,
    image: 'https://images.unsplash.com/photo-1700150595270-499a1ce07804?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjYxOTY1NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: 'BESTSELLER',
  },
  {
    id: 3,
    name: 'Shadow Chemise',
    collection: 'Minimal Dark',
    price: 198,
    image: 'https://images.unsplash.com/photo-1762843353166-e0542bba1a66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbGluZ2VyaWUlMjBtb2RlbHxlbnwxfHx8fDE3NjYyMjg5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: 'LIMITED',
  },
  {
    id: 4,
    name: 'Velvet Night Set',
    collection: 'Midnight Silk',
    price: 275,
    image: 'https://images.unsplash.com/photo-1738248000125-94846d75c783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwZGFya3xlbnwxfHx8fDE3NjYyMjUyNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: 'EXCLUSIVE',
  },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className="group"
    >
      <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-white/5">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          style={{ y }}
        />
        
        {/* Tag */}
        {product.tag && (
          <motion.div 
            className="absolute top-6 left-6 border border-white/20 backdrop-blur-sm bg-black/40 px-4 py-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <span className="text-[10px] tracking-[0.3em] text-white/80">
              {product.tag}
            </span>
          </motion.div>
        )}
        
        {/* Favorite Button */}
        <motion.button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-6 right-6 w-12 h-12 border border-white/20 backdrop-blur-sm bg-black/40 flex items-center justify-center"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={`transition-all duration-300 ${
              isFavorite
                ? 'fill-white stroke-white'
                : 'stroke-white/60'
            }`}
          />
        </motion.button>
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="border border-white/40 text-white px-8 py-4 tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all duration-300">
            QUICK ADD
          </button>
        </div>
      </div>
      
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
      >
        <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase">
          {product.collection}
        </p>
        <h3 className="text-lg tracking-tight text-white/90">
          {product.name}
        </h3>
        <p className="text-sm text-white/60 tracking-wider">
          ${product.price}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section id="new" className="relative py-40 bg-black overflow-hidden" ref={sectionRef}>
      {/* Animated Background Element */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none"
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
            className="text-[10px] tracking-[0.5em] uppercase mb-6 text-white/40"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Latest Arrivals
          </motion.p>
          <motion.h2 
            className="text-6xl md:text-8xl tracking-tighter text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Featured Pieces
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}