import { motion } from 'motion/react';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Product } from './Shop';
import { QuickAddModal } from './QuickAddModal';
import { Footer } from './Footer';

// Import all products from Shop component
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

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const product = allProducts.find(p => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground/60 mb-4">Product not found</p>
          <Link to="/shop" className="text-foreground/80 hover:text-foreground transition-colors">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = (product: Product, quantity: number, size: string) => {
    // TODO: Implement cart functionality
    console.log('Add to cart:', { product, quantity, size });
    alert(`Added ${quantity} x ${product.name} (Size: ${size}) to cart!`);
  };

  const handleBuyNow = () => {
    if (selectedSize) {
      handleAddToCart(product, quantity, selectedSize);
      // TODO: Navigate to checkout
      alert(`Proceeding to checkout with ${quantity} x ${product.name} (Size: ${selectedSize})`);
    } else {
      alert('Please select a size');
    }
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <section className="relative min-h-screen bg-background py-40">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-12 flex items-center gap-3 text-foreground/60 hover:text-foreground transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ArrowLeft size={20} />
          <span className="text-sm tracking-[0.2em] uppercase">Back</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Product Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square bg-foreground/5 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.tag && (
                <div className="absolute top-6 left-6 border border-border backdrop-blur-sm bg-black/60 dark:bg-background/40 px-4 py-2">
                  <span className="text-[10px] tracking-[0.3em] text-white dark:text-foreground/80">
                    {product.tag}
                  </span>
                </div>
              )}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-6 right-6 w-12 h-12 border border-border backdrop-blur-sm bg-black/60 dark:bg-background/40 flex items-center justify-center hover:bg-white/20 dark:hover:bg-foreground/10 transition-colors"
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
              </button>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <p className="text-[10px] tracking-[0.5em] uppercase mb-4 text-foreground/40">
                {product.collection}
              </p>
              <h1 className="text-5xl md:text-7xl tracking-tighter mb-6 text-foreground">
                {product.name}
              </h1>
              <p className="text-3xl tracking-tight text-foreground mb-8">
                ${product.price}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <label className="text-xs tracking-[0.3em] text-foreground/60 uppercase block mb-4">
                Size
              </label>
              <div className="grid grid-cols-5 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border border-border text-foreground px-4 py-3 text-sm tracking-wide transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-foreground text-background border-foreground'
                        : 'hover:border-foreground/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <label className="text-xs tracking-[0.3em] text-foreground/60 uppercase block mb-4">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border border-border text-foreground w-12 h-12 flex items-center justify-center hover:bg-foreground/10 transition-colors"
                >
                  −
                </button>
                <span className="text-foreground text-lg w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="border border-border text-foreground w-12 h-12 flex items-center justify-center hover:bg-foreground/10 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-foreground/60 leading-relaxed tracking-wide">
                Meticulously crafted with the finest sustainable materials, this piece embodies
                the essence of timeless elegance. Each detail has been thoughtfully considered
                to create a garment that transcends trends and celebrates the art of intimate wear.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <motion.button
                onClick={() => {
                  if (selectedSize) {
                    handleAddToCart(product, quantity, selectedSize);
                  } else {
                    alert('Please select a size');
                  }
                }}
                disabled={!selectedSize}
                className="flex-1 border border-border text-foreground px-8 py-4 tracking-[0.3em] text-xs relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={selectedSize ? { scale: 1.02 } : {}}
                whileTap={selectedSize ? { scale: 0.98 } : {}}
              >
                <motion.div
                  className="absolute inset-0 bg-foreground"
                  initial={{ scaleX: 0 }}
                  whileHover={selectedSize ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.4 }}
                  style={{ originX: 0 }}
                />
                <span className="relative z-10 group-hover:text-background transition-colors duration-300 flex items-center justify-center gap-2">
                  <ShoppingBag size={16} />
                  ADD TO CART
                </span>
              </motion.button>

              <motion.button
                onClick={handleBuyNow}
                disabled={!selectedSize}
                className="flex-1 bg-foreground text-background px-8 py-4 tracking-[0.3em] text-xs hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={selectedSize ? { scale: 1.02 } : {}}
                whileTap={selectedSize ? { scale: 0.98 } : {}}
              >
                BUY NOW
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
      <QuickAddModal
        product={product}
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </section>
  );
}

