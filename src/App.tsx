import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChateauNavbar } from './components/ChateauNavbar';
import { MalaSection } from './components/MalaSection';
import { ProductModal } from './components/ProductModal';
import { CartDrawer, type CartItem } from './components/CartDrawer';
import { ChateauAboutModal } from './components/ChateauAboutModal';
import { MALAS, GRADIENTS, type MalaItem } from './data/chateauData';

export function App() {
  const [currentTheme, setCurrentTheme] = useState<string>('tulsi');

  // Modals & Overlay state
  const [selectedProduct, setSelectedProduct] = useState<MalaItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Cart Management
  const handleAddToCart = (product: MalaItem, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeGradient = GRADIENTS[currentTheme] || GRADIENTS.tulsi;

  return (
    <div className="relative min-h-screen font-sans antialiased selection:bg-amber-400 selection:text-black">
      {/* 1. Global Dynamic Radial Background Layer (0.2s smooth gradient swap) */}
      <div className="fixed inset-0 z-[-1]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTheme}
            className="absolute inset-0 w-full h-full"
            style={{ background: activeGradient }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          />
        </AnimatePresence>
      </div>

      {/* 2. Global Navbar */}
      <ChateauNavbar
        currentTheme={currentTheme}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAboutModal={() => setIsAboutOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* 3. Full-Screen CSS Scroll-Snap Sections Container */}
      <main className="w-full h-full">
        {MALAS.map((item) => (
          <MalaSection
            key={item.id}
            item={item}
            onSetActiveTheme={(type) => setCurrentTheme(type)}
            onOpenProductModal={(product) => setSelectedProduct(product)}
            onAddToCart={handleAddToCart}
          />
        ))}
      </main>

      {/* 4. Full-Screen Product Quick Purchase Overlay */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onInstantBuy={(p, q) => {
          setSelectedProduct(null);
          handleAddToCart(p, q);
          setIsCartOpen(true);
        }}
      />

      {/* 5. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* 6. Craft Story Modal */}
      <ChateauAboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}

export default App;
