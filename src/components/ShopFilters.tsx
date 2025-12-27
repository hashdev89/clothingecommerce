import { motion, AnimatePresence } from 'motion/react';
import { X, Filter, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FilterState {
  collections: string[];
  tags: string[];
  priceRange: [number, number];
  sortBy: string;
}

interface ShopFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  minPrice: number;
  maxPrice: number;
}

const collections = ['Midnight Silk', 'Noir Lace', 'Minimal Dark'];
const tags = ['NEW', 'BESTSELLER', 'LIMITED', 'EXCLUSIVE'];
const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
];

export function ShopFilters({ filters, onFiltersChange, minPrice, maxPrice }: ShopFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleCollectionToggle = (collection: string) => {
    const newCollections = filters.collections.includes(collection)
      ? filters.collections.filter(c => c !== collection)
      : [...filters.collections, collection];
    
    onFiltersChange({
      ...filters,
      collections: newCollections,
    });
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    onFiltersChange({
      ...filters,
      tags: newTags,
    });
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    if (type === 'min') {
      onFiltersChange({
        ...filters,
        priceRange: [Math.min(value, filters.priceRange[1]), filters.priceRange[1]],
      });
    } else {
      onFiltersChange({
        ...filters,
        priceRange: [filters.priceRange[0], Math.max(value, filters.priceRange[0])],
      });
    }
  };

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({
      ...filters,
      sortBy,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      collections: [],
      tags: [],
      priceRange: [minPrice, maxPrice],
      sortBy: 'default',
    });
  };

  const hasActiveFilters = 
    filters.collections.length > 0 ||
    filters.tags.length > 0 ||
    filters.priceRange[0] !== minPrice ||
    filters.priceRange[1] !== maxPrice ||
    filters.sortBy !== 'default';

  return (
    <div className="mb-16 lg:mb-0 lg:overflow-y-auto lg:max-h-[calc(100vh-10rem)]" style={{ scrollBehavior: 'smooth' }}>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-8">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between border border-border text-foreground px-6 py-4 tracking-[0.2em] text-xs"
          whileHover={{ borderColor: 'var(--border)' }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3">
            <Filter size={16} />
            <span>FILTERS</span>
            {hasActiveFilters && (
              <span className="bg-foreground text-background text-[10px] px-2 py-0.5">
                {filters.collections.length + filters.tags.length + (filters.sortBy !== 'default' ? 1 : 0)}
              </span>
            )}
          </div>
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </motion.button>
      </div>

      {/* Desktop Filters - Always Visible */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
          <h3 className="text-sm tracking-[0.3em] text-foreground/60 uppercase">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-[10px] tracking-[0.2em] text-foreground/40 hover:text-foreground/60 transition-colors"
            >
              CLEAR ALL
            </button>
          )}
        </div>
        <FilterContent
          filters={filters}
          onCollectionToggle={handleCollectionToggle}
          onTagToggle={handleTagToggle}
          onPriceChange={handlePriceChange}
          onSortChange={handleSortChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>

      {/* Mobile Filters - Collapsible */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-border"
          >
            <div className="pt-6">
              <FilterContent
                filters={filters}
                onCollectionToggle={handleCollectionToggle}
                onTagToggle={handleTagToggle}
                onPriceChange={handlePriceChange}
                onSortChange={handleSortChange}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-6 w-full border border-border text-foreground px-6 py-4 tracking-[0.2em] text-xs hover:bg-foreground/10 transition-colors"
                >
                  CLEAR ALL FILTERS
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterContent({
  filters,
  onCollectionToggle,
  onTagToggle,
  onPriceChange,
  onSortChange,
  minPrice,
  maxPrice,
}: {
  filters: FilterState;
  onCollectionToggle: (collection: string) => void;
  onTagToggle: (tag: string) => void;
  onPriceChange: (type: 'min' | 'max', value: number) => void;
  onSortChange: (sortBy: string) => void;
  minPrice: number;
  maxPrice: number;
}) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['sort']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  return (
    <div className="space-y-8">
      {/* Sort */}
      <div>
        <button
          onClick={() => toggleSection('sort')}
          className="w-full flex items-center justify-between mb-4"
        >
          <span className="text-xs tracking-[0.3em] text-foreground/60 uppercase">Sort By</span>
          <ChevronDown
            size={14}
            className={`text-foreground/40 transition-transform duration-300 ${
              expandedSections.has('sort') ? 'rotate-180' : ''
            }`}
          />
        </button>
        <AnimatePresence>
          {expandedSections.has('sort') && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="relative w-4 h-4">
                      <input
                        type="radio"
                        name="sort"
                        value={option.value}
                        checked={filters.sortBy === option.value}
                        onChange={() => onSortChange(option.value)}
                        className="absolute w-4 h-4 border border-border bg-transparent appearance-none checked:bg-foreground checked:border-foreground cursor-pointer transition-all"
                      />
                      {filters.sortBy === option.value && (
                        <div className="absolute inset-0 w-4 h-4 border border-foreground bg-transparent flex items-center justify-center pointer-events-none">
                          <div className="w-2 h-2 bg-foreground" />
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collections */}
      <div>
        <button
          onClick={() => toggleSection('collections')}
          className="w-full flex items-center justify-between mb-4"
        >
          <span className="text-xs tracking-[0.3em] text-foreground/60 uppercase">Collections</span>
          <ChevronDown
            size={14}
            className={`text-foreground/40 transition-transform duration-300 ${
              expandedSections.has('collections') ? 'rotate-180' : ''
            }`}
          />
        </button>
        <AnimatePresence>
          {expandedSections.has('collections') && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-3">
                {collections.map((collection) => (
                  <label
                    key={collection}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="relative w-4 h-4">
                      <input
                        type="checkbox"
                        checked={filters.collections.includes(collection)}
                        onChange={() => onCollectionToggle(collection)}
                        className="absolute w-4 h-4 border border-border bg-transparent appearance-none checked:bg-foreground checked:border-foreground cursor-pointer transition-all"
                      />
                      {filters.collections.includes(collection) && (
                        <svg
                          className="absolute inset-0 w-4 h-4 pointer-events-none"
                          fill="none"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M4 8L6.5 10.5L12 5"
                            stroke="var(--background)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                      {collection}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tags */}
      <div>
        <button
          onClick={() => toggleSection('tags')}
          className="w-full flex items-center justify-between mb-4"
        >
          <span className="text-xs tracking-[0.3em] text-foreground/60 uppercase">Tags</span>
          <ChevronDown
            size={14}
            className={`text-foreground/40 transition-transform duration-300 ${
              expandedSections.has('tags') ? 'rotate-180' : ''
            }`}
          />
        </button>
        <AnimatePresence>
          {expandedSections.has('tags') && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-3">
                {tags.map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div className="relative w-4 h-4">
                      <input
                        type="checkbox"
                        checked={filters.tags.includes(tag)}
                        onChange={() => onTagToggle(tag)}
                        className="absolute w-4 h-4 border border-border bg-transparent appearance-none checked:bg-foreground checked:border-foreground cursor-pointer transition-all"
                      />
                      {filters.tags.includes(tag) && (
                        <svg
                          className="absolute inset-0 w-4 h-4 pointer-events-none"
                          fill="none"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M4 8L6.5 10.5L12 5"
                            stroke="var(--background)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                      {tag}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Range */}
      <div>
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between mb-4"
        >
          <span className="text-xs tracking-[0.3em] text-foreground/60 uppercase">Price Range</span>
          <ChevronDown
            size={14}
            className={`text-foreground/40 transition-transform duration-300 ${
              expandedSections.has('price') ? 'rotate-180' : ''
            }`}
          />
        </button>
        <AnimatePresence>
          {expandedSections.has('price') && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-[10px] tracking-[0.2em] text-foreground/40 uppercase block mb-2">
                      Min
                    </label>
                    <input
                      type="number"
                      min={minPrice}
                      max={maxPrice}
                      value={filters.priceRange[0]}
                      onChange={(e) => onPriceChange('min', Number(e.target.value))}
                      className="w-full border border-border bg-transparent text-foreground px-4 py-2 text-sm focus:outline-none focus:border-foreground/40 transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] tracking-[0.2em] text-foreground/40 uppercase block mb-2">
                      Max
                    </label>
                    <input
                      type="number"
                      min={minPrice}
                      max={maxPrice}
                      value={filters.priceRange[1]}
                      onChange={(e) => onPriceChange('max', Number(e.target.value))}
                      className="w-full border border-border bg-transparent text-foreground px-4 py-2 text-sm focus:outline-none focus:border-foreground/40 transition-colors"
                    />
                  </div>
                </div>
                <div className="pt-2 space-y-4">
                  <div className="relative">
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={filters.priceRange[0]}
                      onChange={(e) => onPriceChange('min', Number(e.target.value))}
                      className="w-full h-0.5 bg-foreground/20 appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, var(--foreground) 0%, var(--foreground) ${((filters.priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%, var(--foreground) ${((filters.priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%, var(--foreground) 100%)`,
                      }}
                    />
                    <style>{`
                      input[type="range"]::-webkit-slider-thumb {
                        appearance: none;
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        background: var(--foreground);
                        cursor: pointer;
                        border: none;
                      }
                      input[type="range"]::-moz-range-thumb {
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        background: var(--foreground);
                        cursor: pointer;
                        border: none;
                      }
                    `}</style>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min={minPrice}
                      max={maxPrice}
                      value={filters.priceRange[1]}
                      onChange={(e) => onPriceChange('max', Number(e.target.value))}
                      className="w-full h-0.5 bg-foreground/20 appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, var(--foreground) 0%, var(--foreground) ${((filters.priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%, var(--foreground) ${((filters.priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%, var(--foreground) 100%)`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-foreground/40">
                  <span>${minPrice}</span>
                  <span>${maxPrice}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

