import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { MALA_PRODUCTS, type MalaProduct } from '../data/malaProducts';
import { Reveal } from './Reveal';

interface StorePageProps {
  onSelectProduct: (product: MalaProduct) => void;
  onAddToCart: (product: MalaProduct, quantity: number) => void;
}

export const StorePage: React.FC<StorePageProps> = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedIntention, setSelectedIntention] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Rudraksha', 'Gemstones', 'Sandalwood'];
  const intentions = ['All', 'Meditation', 'Love & Peace', 'Intuition', 'Abundance', 'Protection'];

  const filteredProducts = useMemo(() => {
    return MALA_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesIntention =
        selectedIntention === 'All' || product.intention === selectedIntention;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.mantra.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesIntention && matchesSearch;
    });
  }, [selectedCategory, selectedIntention, searchQuery]);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-5 sm:px-8 md:px-12 relative z-10">
      {/* Header Banner */}
      <Reveal delay={0}>
        <div className="max-w-3xl mb-10">
          <div className="border-l-3 border-amber-400 bg-gradient-to-r from-amber-500/20 to-white/10 px-3.5 py-1.5 backdrop-blur-md font-mono text-[11px] uppercase tracking-[0.15em] text-amber-200 border-r border-y border-amber-500/30 rounded-r-md drop-shadow-md w-fit mb-4 flex items-center gap-2">
            <Sparkles size={13} className="text-amber-400" />
            <span>Sacred Mala Collection</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-white drop-shadow-2xl mb-3">
            Handcrafted <span className="gold-gradient-text font-medium">108 Bead</span> Japa Malas.
          </h1>
          <p className="text-base sm:text-lg text-white/85 leading-relaxed drop-shadow-md">
            Each Mala is knotted by hand with authentic natural gemstones and Rudraksha seeds, traditionally blessed in Rishikesh along the Ganges for your daily dhyana and spiritual alignment.
          </p>
        </div>
      </Reveal>

      {/* Filter & Search Bar */}
      <Reveal delay={150}>
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center p-4 rounded-2xl glass-panel-gold border border-amber-500/30 mb-10 shadow-2xl">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/70" />
            <input
              type="text"
              placeholder="Search mala by gemstone, intention, or mantra..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/40 border border-amber-500/30 text-sm text-white placeholder-amber-200/40 focus:outline-none focus:border-amber-400 transition-all"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-300 to-amber-400 text-black font-semibold shadow-md'
                    : 'bg-white/5 border border-white/10 text-amber-200/80 hover:bg-white/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Intention Dropdown Filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-amber-400" />
            <select
              value={selectedIntention}
              onChange={(e) => setSelectedIntention(e.target.value)}
              className="bg-black/60 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-amber-200 focus:outline-none cursor-pointer"
            >
              {intentions.map((intent) => (
                <option key={intent} value={intent} className="bg-[#121214] text-white">
                  Intention: {intent}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Reveal>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center text-amber-200/60 font-mono text-sm">
          No sacred malas found matching your search filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, i) => (
            <Reveal key={product.id} delay={100 + i * 80}>
              <div className="group relative flex flex-col justify-between rounded-2xl glass-panel-gold border border-amber-500/25 overflow-hidden hover:border-amber-400 transition-all duration-300 shadow-xl">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-black/60">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isBestSeller && (
                      <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-black font-mono text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded shadow-lg">
                        Best Seller
                      </span>
                    )}
                    <span className="bg-black/70 backdrop-blur-sm border border-amber-400/30 text-amber-200 font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded">
                      {product.beadCount} Beads
                    </span>
                  </div>

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="p-3.5 rounded-full bg-white text-black hover:bg-amber-100 transition-transform hover:scale-110 cursor-pointer shadow-xl"
                      title="Quick View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onAddToCart(product, 1)}
                      className="p-3.5 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 text-black hover:from-amber-200 hover:to-amber-300 transition-transform hover:scale-110 cursor-pointer shadow-xl"
                      title="Add to Sacred Cart"
                    >
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300 font-semibold">
                        {product.intention}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-white/80">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span className="font-medium">{product.rating}</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="text-base font-medium text-white group-hover:text-amber-200 transition-colors cursor-pointer mb-1 line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-white/70 line-clamp-2 mb-4 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between pt-3 border-t border-amber-500/20">
                    <div className="flex items-baseline gap-1.5 font-mono">
                      <span className="text-lg font-semibold text-amber-300">{product.priceFormatted}</span>
                      {product.originalPriceFormatted && (
                        <span className="text-xs text-white/40 line-through">
                          {product.originalPriceFormatted}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="text-xs font-mono text-amber-200 hover:text-white flex items-center gap-1 group/btn cursor-pointer"
                    >
                      <span>Details</span>
                      <Sparkles size={12} className="text-amber-400 group-hover/btn:rotate-12 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};
