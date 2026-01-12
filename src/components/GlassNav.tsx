import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "./cart/CartDrawer";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Products", href: "#products" },
  { name: "Story", href: "#story" },
  { name: "Experience", href: "#contact" },
  { name: "Contact", href: "#contact" },
];

export const GlassNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isScrolled ? "w-[90%] max-w-4xl" : "w-[95%] max-w-5xl"
          }`}
      >
        <div className="glass-strong rounded-full px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="font-heading text-2xl font-semibold tracking-tight"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-gradient">COLA</span>
              <span className="text-foreground/80 text-lg ml-1">neo</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Cart & CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-foreground/80 hover:text-primary transition-colors"
            >
              <ShoppingBag size={24} />
              <AnimatePresence>
                {cartItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background"
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <a href = "#products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Order Now
            </motion.button>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-foreground"
            >
              <ShoppingBag size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[8px] font-bold rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <CartDrawer />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 glass-strong rounded-2xl p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-foreground py-2 border-b border-border/30"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="mt-4 w-full py-3 rounded-full bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                View Cart ({cartItemsCount})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
