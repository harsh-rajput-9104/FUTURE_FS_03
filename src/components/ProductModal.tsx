import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types/ecommerce";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      onClose(); // Close modal after adding
    }
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Slide-over Modal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg z-50 glass-strong border-l border-border"
          >
            <div className="h-full flex flex-col p-6 overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm text-muted-foreground uppercase tracking-widest"
                >
                  Product Details
                </motion.span>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Product Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative rounded-2xl overflow-hidden mb-8"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1"
              >
                <p className="text-sm text-primary uppercase tracking-widest mb-2">
                  {product.tagline}
                </p>
                <h2 className="font-heading text-4xl font-bold mb-4">
                  {product.name}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Availability Status */}
                <div className="flex items-center gap-2 mb-6">
                  <span
                    className={`w-2 h-2 rounded-full ${product.available ? "bg-green-500" : "bg-muted-foreground"
                      }`}
                  />
                  <span className="text-sm text-muted-foreground">
                    {product.available ? "In Stock" : "Coming Soon"}
                  </span>
                </div>

                {/* Price */}
                <p className="text-3xl font-heading font-bold text-gradient mb-8">
                  {product.price}
                </p>
              </motion.div>

              {/* Quantity & Add to Cart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                {/* Quantity Selector */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                  <span className="text-sm text-muted-foreground">Quantity</span>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-muted hover:bg-muted/80 transition-colors"
                      disabled={!product.available}
                    >
                      <Minus size={16} />
                    </motion.button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-muted hover:bg-muted/80 transition-colors"
                      disabled={!product.available}
                    >
                      <Plus size={16} />
                    </motion.button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={product.available ? { scale: 1.02 } : {}}
                  whileTap={product.available ? { scale: 0.98 } : {}}
                  onClick={handleAddToCart}
                  disabled={!product.available}
                  className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-3 transition-all ${product.available
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 pulse-glow"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                >
                  <ShoppingBag size={20} />
                  {product.available ? "Add to Cart" : "Notify Me"}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
