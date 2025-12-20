import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const collections = [
  {
    id: 1,
    title: 'MIDNIGHT SILK',
    subtitle: 'Pure Elegance',
    image: 'https://images.unsplash.com/photo-1666961332878-66e7641a0164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHNpbGslMjBmYWJyaWN8ZW58MXx8fHwxNzY2MjI5MjkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Timeless pieces crafted in pure silk',
  },
  {
    id: 2,
    title: 'NOIR LACE',
    subtitle: 'Romantic Essence',
    image: 'https://images.unsplash.com/photo-1603132789551-47b97377046e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjYxNzQyMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Delicate lace with ethereal textures',
  },
  {
    id: 3,
    title: 'MINIMAL DARK',
    subtitle: 'Modern Luxury',
    image: 'https://images.unsplash.com/photo-1738248000125-94846d75c783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwZGFya3xlbnwxfHx8fDE3NjYyMjUyNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Clean lines for everyday luxury',
  },
];

function CollectionCard({ collection, index }: { collection: typeof collections[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden aspect-[3/4] mb-8 bg-white/5">
        <motion.img
          src={collection.image}
          alt={collection.title}
          className="w-full h-full object-cover"
          style={{ y }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        
        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <div className="h-px w-12 bg-white/40 mb-4" />
          <p className="text-xs tracking-[0.3em] text-white/60 uppercase">
            Explore Collection
          </p>
        </div>
      </div>
      
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
      >
        <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase">
          {collection.subtitle}
        </p>
        <h3 className="text-2xl tracking-tight text-white">
          {collection.title}
        </h3>
        <p className="text-sm text-white/60 tracking-wide">
          {collection.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function Collections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.02, 0.05, 0.02]);

  return (
    <section id="collections" className="relative py-40 bg-black overflow-hidden" ref={containerRef}>
      {/* Background Text */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] text-white pointer-events-none whitespace-nowrap"
        style={{ y, opacity: backgroundOpacity }}
      >
        COLLECTIONS
      </motion.div>

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
            Curated Collections
          </motion.p>
          <motion.h2 
            className="text-6xl md:text-8xl tracking-tighter text-white max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Crafted for the
            <br />
            <span className="text-white/30">Connoisseur</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <CollectionCard key={collection.id} collection={collection} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}