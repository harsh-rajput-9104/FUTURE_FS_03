import { motion } from "framer-motion";
import { GlassNav } from "@/components/GlassNav";
import { Footer } from "@/components/Footer";
import { CheckCircle2, ShoppingBag, Package, Truck, ArrowRight, Share2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types/ecommerce";

const OrderSuccessPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // If no state (e.g. direct access), redirect to home
        if (!state) {
            navigate("/");
        }
    }, [state, navigate]);

    if (!state) return null;

    const { orderId, items, total, address, estimatedDelivery } = state;

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
            <GlassNav />

            <main className="container mx-auto px-6 pt-32 pb-20">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Success Section */}
                    <div className="text-center space-y-6 mb-16">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 12, stiffness: 200 }}
                            className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto border-4 border-primary/30"
                        >
                            <CheckCircle2 size={48} className="text-primary animate-pulse" />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4">Order Confirmed!</h1>
                            <p className="text-xl text-muted-foreground">
                                Your future-fuel is being prepared for delivery.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Order Details */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass-card p-8 rounded-3xl space-y-8"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Order ID</p>
                                    <h3 className="text-xl font-bold font-mono">{orderId}</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Status</p>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold uppercase tracking-widest">
                                        Processing
                                    </span>
                                </div>
                            </div>

                            <Separator className="bg-white/5" />

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center text-primary">
                                        <Package size={18} />
                                    </div>
                                    <h4 className="font-bold">Order Items</h4>
                                </div>
                                <div className="space-y-3">
                                    {items.map((item: CartItem) => (
                                        <div key={item.id} className="flex justify-between items-center text-sm">
                                            <span className="text-muted-foreground">
                                                {item.name} <span className="text-xs text-primary/60 ml-1">x {item.quantity}</span>
                                            </span>
                                            <span className="font-bold">{item.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator className="bg-white/5" />

                            <div className="flex justify-between items-end">
                                <span className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Total Paid</span>
                                <span className="text-3xl font-heading font-bold text-gradient">${total.toFixed(2)}</span>
                            </div>
                        </motion.div>

                        {/* Delivery Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-8"
                        >
                            <div className="glass-card p-8 rounded-3xl space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center text-primary">
                                        <Truck size={18} />
                                    </div>
                                    <h4 className="font-bold">Estimated Delivery</h4>
                                </div>
                                <div>
                                    <p className="text-2xl font-heading font-bold">{estimatedDelivery}</p>
                                    <p className="text-sm text-muted-foreground mt-1">Expected soon in {address.city}</p>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-3xl space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center text-primary">
                                        <ShoppingBag size={18} />
                                    </div>
                                    <h4 className="font-bold">Shipping Address</h4>
                                </div>
                                <div className="text-sm text-muted-foreground leading-relaxed">
                                    <p className="font-bold text-foreground mb-1">{address.name}</p>
                                    <p>{address.street}</p>
                                    <p>{address.city}, {address.pincode}</p>
                                    <p>Phone: {address.phone}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button variant="outline" className="flex-1 rounded-2xl h-14 gap-2 hover:bg-secondary transition-all">
                                    <Printer size={18} />
                                    Receipt
                                </Button>
                                <Button variant="outline" className="flex-1 rounded-2xl h-14 gap-2 hover:bg-secondary transition-all">
                                    <Share2 size={18} />
                                    Share
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-16 text-center"
                    >
                        <Button asChild className="rounded-2xl px-12 py-8 text-xl font-bold group">
                            <Link to="/">
                                Continue Exploring
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default OrderSuccessPage;
