import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

export const CartDrawer = () => {
    const { cart, removeFromCart, updateQuantity, subtotal, isCartOpen, setIsCartOpen } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate("/checkout");
    };

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent className="w-full sm:max-w-md glass-strong border-l border-white/10 p-0 flex flex-col">
                <SheetHeader className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-2xl font-heading font-bold flex items-center gap-2">
                            <ShoppingBag className="text-primary" />
                            Your Cart
                            {cart.length > 0 && (
                                <span className="text-sm font-normal text-muted-foreground ml-2">
                                    ({cart.length} {cart.length === 1 ? 'item' : 'items'})
                                </span>
                            )}
                        </SheetTitle>
                    </div>
                </SheetHeader>

                <div className="flex-1 overflow-hidden">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
                            <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
                                <ShoppingBag size={40} className="text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-heading font-semibold">Your cart is empty</h3>
                            <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                            <Button
                                onClick={() => setIsCartOpen(false)}
                                variant="outline"
                                className="mt-4 rounded-full"
                            >
                                Continue Shopping
                            </Button>
                        </div>
                    ) : (
                        <ScrollArea className="h-full">
                            <div className="p-6 space-y-6">
                                <AnimatePresence initial={false}>
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex gap-4 group"
                                        >
                                            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-secondary/50 border border-white/5 flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-heading font-bold text-lg leading-tight">{item.name}</h4>
                                                        <p className="text-xs text-primary uppercase tracking-widest mt-1">{item.tagline}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="p-1 hover:text-destructive transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex items-center gap-3 bg-secondary/30 rounded-full p-1 border border-white/5">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <p className="font-bold text-lg">{item.price}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </ScrollArea>
                    )}
                </div>

                {cart.length > 0 && (
                    <SheetFooter className="p-6 border-t border-white/10 bg-background/50 backdrop-blur-md">
                        <div className="w-full space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground uppercase tracking-widest text-xs font-semibold">Subtotal</span>
                                <span className="text-2xl font-heading font-bold">${subtotal.toFixed(2)}</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider text-center">
                                Taxes and shipping calculated at checkout
                            </p>
                            <Button
                                onClick={handleCheckout}
                                className="w-full py-6 rounded-xl text-lg font-bold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] group"
                            >
                                Checkout Now
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
};
