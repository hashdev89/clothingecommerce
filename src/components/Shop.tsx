import { motion, useScroll, useTransform } from 'motion/react';
import { Heart } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';
import { ShopFilters } from './ShopFilters';
import { QuickAddModal } from './QuickAddModal';

export interface Product {
  id: number;
  name: string;
  collection: string;
  price: number;
  image: string;
  tag: string | null;
}

const allProducts: Product[] = [
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
  {
    id: 5,
    name: 'Noir Lace Set',
    collection: 'Noir Lace',
    price: 320,
    image: 'https://images.unsplash.com/photo-1631695117568-c56a4e039ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1pbmluZSUyMGVsZWdhbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjYyMjg5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: 'NEW',
  },
  {
    id: 6,
    name: 'Silk Slip Dress',
    collection: 'Midnight Silk',
    price: 298,
    image: 'https://images.unsplash.com/photo-1700150595270-499a1ce07804?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjYxOTY1NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: 'BESTSELLER',
  },
  {
    id: 7,
    name: 'Minimalist Bodysuit',
    collection: 'Minimal Dark',
    price: 225,
    image: 'https://images.unsplash.com/photo-1762843353166-e0542bba1a66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbGluZ2VyaWUlMjBtb2RlbHxlbnwxfHx8fDE3NjYyMjg5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: null,
  },
  {
    id: 8,
    name: 'Elegant Nightgown',
    collection: 'Midnight Silk',
    price: 265,
    image: 'https://images.unsplash.com/photo-1738248000125-94846d75c783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwZGFya3xlbnwxfHx8fDE3NjYyMjUyNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: 'LIMITED',
  },
  {
    id: 9,
    name: 'Dark Elegance Set',
    collection: 'Noir Lace',
    price: 350,
    image: 'https://images.unsplash.com/photo-1631695117568-c56a4e039ac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1pbmluZSUyMGVsZWdhbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjYyMjg5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: 'EXCLUSIVE',
  },
  {
    id: 10,
    name: 'Sophisticated Lingerie',
    collection: 'Minimal Dark',
    price: 210,
    image: 'https://images.unsplash.com/photo-1700150595270-499a1ce07804?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjYxOTY1NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: null,
  },
  {
    id: 11,
    name: 'Luxury Nightwear',
    collection: 'Midnight Silk',
    price: 285,
    image: 'https://images.unsplash.com/photo-1762843353166-e0542bba1a66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbGluZ2VyaWUlMjBtb2RlbHxlbnwxfHx8fDE3NjYyMjg5NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: 'NEW',
  },
  {
    id: 12,
    name: 'Classic Black Set',
    collection: 'Noir Lace',
    price: 240,
    image: 'https://images.unsplash.com/photo-1738248000125-94846d75c783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwZGFya3xlbnwxfHx8fDE3NjYyMjUyNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tag: 'BESTSELLER',
  },
];

function ProductCard({ 
  product, 
  index,
  onQuickAdd 
}: { 
  product: Product; 
  index: number;
  onQuickAdd: (product: Product) => void;
}) {
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
      <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-foreground/5">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          style={{ y }}
        />
        
        {/* Tag */}
        {product.tag && (
          <motion.div 
            className="absolute top-6 left-6 border border-border backdrop-blur-sm bg-black/60 dark:bg-background/40 px-4 py-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          >
            <span className="text-[10px] tracking-[0.3em] text-white dark:text-foreground/80">
              {product.tag}
            </span>
          </motion.div>
        )}
        
        {/* Favorite Button */}
        <motion.button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-6 right-6 w-12 h-12 border border-border backdrop-blur-sm bg-black/60 dark:bg-background/40 flex items-center justify-center hover:bg-white/20 dark:hover:bg-foreground/10 transition-colors"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.05 + 0.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={`transition-all duration-300 ${
              isFavorite
                ? 'fill-white stroke-white dark:fill-foreground dark:stroke-foreground'
                : 'stroke-white/80 dark:stroke-foreground/60'
            }`}
          />
        </motion.button>
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/40 dark:bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            onClick={() => onQuickAdd(product)}
            className="border border-border text-foreground px-8 py-4 tracking-[0.3em] text-xs hover:bg-foreground hover:text-background transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            QUICK ADD
          </motion.button>
          <Link to={`/product/${product.id}`}>
            <motion.button
              className="bg-foreground text-background px-8 py-4 tracking-[0.3em] text-xs hover:bg-foreground/90 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW DETAILS
            </motion.button>
          </Link>
        </div>
      </div>
      
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.05 + 0.4 }}
      >
        <p className="text-[10px] tracking-[0.4em] text-foreground/40 uppercase">
          {product.collection}
        </p>
        <Link to={`/product/${product.id}`} className="hover:opacity-80 transition-opacity">
          <h3 className="text-lg tracking-tight text-foreground/90">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-sm text-foreground/60 tracking-wider">
            ${product.price}
          </p>
          <Link to={`/product/${product.id}`}>
            <motion.button
              className="border border-border text-foreground px-4 py-2 text-xs tracking-[0.2em] hover:bg-foreground hover:text-background transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              BUY NOW
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Shop() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  // Quick Add Modal State
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  // Calculate min and max prices
  const { minPrice, maxPrice } = useMemo(() => {
    const prices = allProducts.map(p => p.price);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, []);

  // Filter state
  const [filters, setFilters] = useState<{
    collections: string[];
    tags: string[];
    priceRange: [number, number];
    sortBy: string;
  }>(() => ({
    collections: [],
    tags: [],
    priceRange: [minPrice, maxPrice],
    sortBy: 'default',
  }));

  const handleQuickAdd = (product: Product) => {
    console.log('Quick Add clicked for:', product.name);
    setQuickAddProduct(product);
    setIsQuickAddOpen(true);
    console.log('Modal should be open:', true);
  };

  const handleAddToCart = (product: Product, quantity: number, size: string) => {
    // TODO: Implement cart functionality
    console.log('Add to cart:', { product, quantity, size });
    alert(`Added ${quantity} x ${product.name} (Size: ${size}) to cart!`);
  };

  // Update price range when min/max prices are calculated
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      priceRange: [minPrice, maxPrice],
    }));
  }, [minPrice, maxPrice]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Filter by collections
    if (filters.collections.length > 0) {
      filtered = filtered.filter(product =>
        filters.collections.includes(product.collection)
      );
    }

    // Filter by tags
    if (filters.tags.length > 0) {
      filtered = filtered.filter(product =>
        product.tag && filters.tags.includes(product.tag)
      );
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [filters, minPrice, maxPrice]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="relative py-40 bg-background overflow-hidden min-h-screen" ref={sectionRef}>
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
          className="mb-16"
        >
          <motion.p 
            className="text-[10px] tracking-[0.5em] uppercase mb-6 text-foreground/40"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Complete Collection
          </motion.p>
          <motion.h2 
            className="text-6xl md:text-8xl tracking-tighter text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Shop
          </motion.h2>
        </motion.div>

        <>
          <style>{`
            .shop-layout-container {
              display: flex;
              flex-direction: column;
              gap: 2rem;
            }
            @media (min-width: 1024px) {
              .shop-layout-container {
                flex-direction: row !important;
                align-items: flex-start;
                gap: 3rem;
              }
              .shop-filters-sidebar {
                width: 30% !important;
                flex: 0 0 30% !important;
                max-width: 30% !important;
                position: sticky !important;
                top: 8rem !important;
                align-self: flex-start !important;
                max-height: calc(100vh - 10rem) !important;
                overflow-y: auto !important;
                overflow-x: hidden !important;
              }
              .shop-products-area {
                width: 70% !important;
                flex: 0 0 70% !important;
                max-width: 70% !important;
              }
            }
          `}</style>
          <div className="shop-layout-container">
            {/* Filters Sidebar - Left Side, 30% */}
            <aside className="shop-filters-sidebar">
              <ShopFilters
                filters={filters}
                onFiltersChange={setFilters}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
            </aside>

            {/* Products Grid - Right Side, 70% */}
            <div className="shop-products-area">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-foreground/40 tracking-wide">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={index}
                    onQuickAdd={handleQuickAdd}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <p className="text-lg text-foreground/60 tracking-wide mb-4">No products found</p>
                <p className="text-sm text-foreground/40">Try adjusting your filters</p>
              </motion.div>
            )}
            </div>
          </div>
        </>
      </div>
      <Footer />
      <QuickAddModal
        product={quickAddProduct}
        isOpen={isQuickAddOpen}
        onClose={() => {
          setIsQuickAddOpen(false);
          setQuickAddProduct(null);
        }}
        onAddToCart={handleAddToCart}
      />
    </section>
  );
}

