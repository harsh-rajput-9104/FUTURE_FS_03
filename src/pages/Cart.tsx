import { useCart } from "@/context/CartContext";
import { GlassNav } from "@/components/GlassNav";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowLeft, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, subtotal, tax, total } = useCart();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
            <GlassNav />

            <main className="container mx-auto px-6 pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-6xl mx-auto"
                >
                    <div className="flex items-center gap-4 mb-12">
                        <Link to="/" className="p-2 rounded-full hover:bg-secondary transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold">Your Cart</h1>
                    </div>

                    {cart.length === 0 ? (
                        <div className="text-center py-20 space-y-6">
                            <div className="w-24 h-24 rounded-full bg-secondary/50 flex items-center justify-center mx-auto">
                                <ShoppingBag size={48} className="text-muted-foreground" />
                            </div>
                            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                Discover our premium range of neo-futuristic beverages and find your next favorite.
                            </p>
                            <Button asChild className="rounded-full px-8 py-6 text-lg">
                                <Link to="/">Browse Products</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Product List */}
                            <div className="lg:col-span-2 space-y-6">
                                <AnimatePresence initial={false}>
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="glass-card p-6 flex flex-col md:flex-row gap-6 relative group overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <div className="relative w-full md:w-40 h-40 rounded-2xl overflow-hidden bg-secondary/50 border border-white/5 flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>

                                            <div className="flex-1 flex flex-col justify-between relative">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-2xl font-heading font-bold">{item.name}</h3>
                                                        <p className="text-sm text-primary uppercase tracking-widest mt-1">{item.tagline}</p>
                                                        <p className="text-sm text-muted-foreground mt-2 line-clamp-1">{item.description}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="p-2 rounded-full hover:bg-destructive/10 hover:text-destructive transition-all"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between mt-6">
                                                    <div className="flex items-center gap-4 bg-secondary/40 rounded-full p-1.5 border border-white/5">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                                                        >
                                                            <Minus size={16} />
                                                        </button>
                                                        <span className="w-6 text-center font-bold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Unit Price: {item.price}</p>
                                                        <p className="text-2xl font-heading font-bold text-gradient">
                                                            ${(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="glass-strong p-8 rounded-3xl sticky top-32 space-y-8">
                                    <h3 className="text-2xl font-heading font-bold">Order Summary</h3>

                                    <div className="space-y-4">
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Tax (18%)</span>
                                            <span>${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Shipping</span>
                                            <span className="text-green-500 font-medium uppercase tracking-widest text-xs">Calculated at checkout</span>
                                        </div>
                                        <Separator className="bg-white/10" />
                                        <div className="flex justify-between items-end">
                                            <span className="text-lg font-medium">Total Price</span>
                                            <span className="text-3xl font-heading font-bold text-gradient">${total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4">
                                        <Button
                                            onClick={() => navigate("/checkout")}
                                            className="w-full py-8 rounded-2xl text-xl font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] group relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary animate-pulse" />
                                            <span className="relative z-10 flex items-center gap-3">
                                                Proceed to Checkout
                                                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </Button>
                                        <p className="text-[11px] text-muted-foreground text-center uppercase tracking-widest leading-relaxed">
                                            Secure payment processing powered by COLAneo Systems
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default CartPage;
