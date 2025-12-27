import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Product } from './Shop';

interface QuickAddModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size: string) => void;
}

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

export function QuickAddModal({ product, isOpen, onClose, onAddToCart }: QuickAddModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedSize('');
      setQuantity(1);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart(product, quantity, selectedSize);
      onClose();
    }
  };

  const handleBuyNow = () => {
    if (selectedSize) {
      onAddToCart(product, quantity, selectedSize);
      // TODO: Navigate to checkout
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            style={{ zIndex: 9998 }}
          />

          {/* Drawer - Slides from right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="fixed top-0 right-0 h-full w-full max-w-2xl z-[9999] border-l border-border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              zIndex: 9999,
              backgroundColor: isDark ? '#000000' : '#ffffff'
            }}
          >
            <div 
              className="flex flex-col h-full relative" 
              style={{ 
                height: '100vh', 
                maxHeight: '100vh',
                backgroundColor: isDark ? '#000000' : '#ffffff'
              }}
            >
              {/* Close Button - Top Right */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 border border-border flex items-center justify-center hover:bg-foreground/10 dark:hover:bg-white/10 transition-colors z-10"
                style={{
                  backgroundColor: isDark ? '#000000' : '#ffffff'
                }}
              >
                <X size={18} style={{ color: isDark ? '#ffffff' : undefined }} className={isDark ? '' : 'text-foreground'} />
              </button>

              <div 
                className="flex flex-col lg:flex-row" 
                style={{ 
                  height: '100%', 
                  overflowY: 'auto',
                  WebkitOverflowScrolling: 'touch',
                  backgroundColor: isDark ? '#000000' : '#ffffff'
                }}
              >
                {/* Product Image */}
                <div 
                  className="lg:w-1/2 aspect-square lg:w-1/2 lg:aspect-auto lg:min-h-full lg:sticky lg:top-0 flex-shrink-0"
                  style={{
                    backgroundColor: isDark ? '#000000' : '#ffffff'
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover lg:h-full"
                  />
                </div>

                {/* Product Details */}
                <div 
                  className="lg:w-1/2 p-8 lg:p-12 flex flex-col pb-12"
                  style={{
                    backgroundColor: isDark ? '#000000' : '#ffffff'
                  }}
                >

                  <div className="mb-6">
                    <p 
                      className="text-[10px] tracking-[0.4em] uppercase mb-2"
                      style={isDark ? { color: 'rgba(255, 255, 255, 0.4)' } : {}}
                    >
                      {product.collection}
                    </p>
                    <h2 
                      className="text-2xl md:text-3xl tracking-tight mb-4"
                      style={isDark ? { color: '#ffffff' } : {}}
                    >
                      {product.name}
                    </h2>
                    <p 
                      className="text-3xl tracking-tight mb-8"
                      style={isDark ? { color: '#ffffff' } : {}}
                    >
                      ${product.price}
                    </p>
                  </div>

                  {/* Size Selection */}
                  <div className="mb-6">
                    <label 
                      className="text-xs tracking-[0.3em] uppercase block mb-4"
                      style={isDark ? { color: 'rgba(255, 255, 255, 0.6)' } : {}}
                    >
                      Size
                    </label>
                    <div className="grid grid-cols-5 gap-3">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`border border-border px-4 py-3 text-sm tracking-wide transition-all duration-300 ${
                            selectedSize === size
                              ? ''
                              : ''
                          }`}
                          style={isDark ? {
                            color: selectedSize === size ? '#000000' : '#ffffff',
                            backgroundColor: selectedSize === size ? '#ffffff' : 'transparent',
                            borderColor: selectedSize === size ? '#ffffff' : 'rgba(255, 255, 255, 0.1)'
                          } : {}}
                          onMouseEnter={(e) => {
                            if (selectedSize !== size && isDark) {
                              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedSize !== size && isDark) {
                              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            }
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selection */}
                  <div className="mb-8">
                    <label 
                      className="text-xs tracking-[0.3em] uppercase block mb-4"
                      style={isDark ? { color: 'rgba(255, 255, 255, 0.6)' } : {}}
                    >
                      Quantity
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="border border-border w-12 h-12 flex items-center justify-center transition-colors"
                        style={isDark ? { 
                          color: '#ffffff',
                          borderColor: 'rgba(255, 255, 255, 0.1)'
                        } : {}}
                        onMouseEnter={(e) => {
                          if (isDark) {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        −
                      </button>
                      <span 
                        className="text-lg w-12 text-center"
                        style={isDark ? { color: '#ffffff' } : {}}
                      >
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="border border-border w-12 h-12 flex items-center justify-center transition-colors"
                        style={isDark ? { 
                          color: '#ffffff',
                          borderColor: 'rgba(255, 255, 255, 0.1)'
                        } : {}}
                        onMouseEnter={(e) => {
                          if (isDark) {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 space-y-3">
                    <motion.button
                      onClick={handleAddToCart}
                      disabled={!selectedSize}
                      className="w-full border border-border px-8 py-4 tracking-[0.3em] text-xs relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                      style={isDark ? {
                        color: '#ffffff',
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                      } : {}}
                      whileHover={selectedSize ? { scale: 1.02 } : {}}
                      whileTap={selectedSize ? { scale: 0.98 } : {}}
                    >
                      <motion.div
                        className="absolute inset-0"
                        initial={{ scaleX: 0 }}
                        whileHover={selectedSize ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.4 }}
                        style={isDark ? { 
                          originX: 0,
                          backgroundColor: '#ffffff'
                        } : { originX: 0 }}
                      />
                      <span 
                        className="relative z-10 transition-colors duration-300 flex items-center justify-center gap-2"
                        style={isDark ? { color: '#ffffff' } : {}}
                        onMouseEnter={(e) => {
                          if (selectedSize && isDark) {
                            e.currentTarget.style.color = '#000000';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedSize && isDark) {
                            e.currentTarget.style.color = '#ffffff';
                          }
                        }}
                      >
                        <ShoppingBag size={16} />
                        ADD TO CART
                      </span>
                    </motion.button>

                    <motion.button
                      onClick={handleBuyNow}
                      disabled={!selectedSize}
                      className="w-full px-8 py-4 tracking-[0.3em] text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      style={isDark ? {
                        backgroundColor: '#ffffff',
                        color: '#000000'
                      } : {}}
                      onMouseEnter={(e) => {
                        if (selectedSize && isDark) {
                          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedSize && isDark) {
                          e.currentTarget.style.backgroundColor = '#ffffff';
                        }
                      }}
                      whileHover={selectedSize ? { scale: 1.02 } : {}}
                      whileTap={selectedSize ? { scale: 0.98 } : {}}
                    >
                      BUY NOW
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
