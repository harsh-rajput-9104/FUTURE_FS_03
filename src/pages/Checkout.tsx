import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { GlassNav } from "@/components/GlassNav";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Home, MapPin, Phone, User, CheckCircle2, ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CheckoutPage = () => {
    const { cart, subtotal, tax, total, clearCart } = useCart();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("upi");

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        city: "",
        pincode: "",
        street: "",
    });

    if (cart.length === 0) {
        navigate("/");
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            const orderId = `COLA-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
            toast({
                title: "Order Placed Successfully!",
                description: `Your order ${orderId} has been received.`,
            });

            // Navigate to success page with data
            navigate("/order-success", {
                state: {
                    orderId,
                    items: cart,
                    total,
                    address: formData,
                    estimatedDelivery: "2-3 business days"
                }
            });

            clearCart();
            setIsSubmitting(false);
        }, 2000);
    };

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
                        <Link to="/cart" className="p-2 rounded-full hover:bg-secondary transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold">Checkout</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Forms Section */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Shipping Address */}
                            <section className="glass-card p-8 rounded-3xl space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <MapPin size={24} />
                                    </div>
                                    <h2 className="text-2xl font-bold font-heading">Shipping Address</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                            <Input
                                                id="name"
                                                required
                                                placeholder="John Doe"
                                                className="pl-10 h-12 rounded-xl bg-secondary/30 border-white/5 focus:border-primary/50"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                            <Input
                                                id="phone"
                                                required
                                                placeholder="+1 (555) 000-0000"
                                                className="pl-10 h-12 rounded-xl bg-secondary/30 border-white/5 focus:border-primary/50"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor="street">Street Address</Label>
                                        <div className="relative">
                                            <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                                            <Input
                                                id="street"
                                                required
                                                placeholder="123 Future Lane"
                                                className="pl-10 h-12 rounded-xl bg-secondary/30 border-white/5 focus:border-primary/50"
                                                value={formData.street}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            required
                                            placeholder="Neo Tokyo"
                                            className="h-12 rounded-xl bg-secondary/30 border-white/5 focus:border-primary/50"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="pincode">Pincode</Label>
                                        <Input
                                            id="pincode"
                                            required
                                            placeholder="123456"
                                            className="h-12 rounded-xl bg-secondary/30 border-white/5 focus:border-primary/50"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Payment Method */}
                            <section className="glass-card p-8 rounded-3xl space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <CreditCard size={24} />
                                    </div>
                                    <h2 className="text-2xl font-bold font-heading">Payment Method</h2>
                                </div>

                                <RadioGroup
                                    defaultValue="upi"
                                    onValueChange={setPaymentMethod}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    <label
                                        htmlFor="upi"
                                        className={`flex items-center justify-between p-6 rounded-2xl border transition-all cursor-pointer ${paymentMethod === "upi" ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(var(--primary),0.1)]" : "bg-secondary/30 border-white/5 hover:border-white/10"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <RadioGroupItem value="upi" id="upi" className="sr-only" />
                                            <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                                                <span className="text-xs font-bold text-primary">UPI</span>
                                            </div>
                                            <div>
                                                <p className="font-bold">UPI / QR</p>
                                                <p className="text-xs text-muted-foreground">Google Pay, PhonePe, etc.</p>
                                            </div>
                                        </div>
                                        {paymentMethod === "upi" && <CheckCircle2 size={24} className="text-primary" />}
                                    </label>

                                    <label
                                        htmlFor="cod"
                                        className={`flex items-center justify-between p-6 rounded-2xl border transition-all cursor-pointer ${paymentMethod === "cod" ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(var(--primary),0.1)]" : "bg-secondary/30 border-white/5 hover:border-white/10"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <RadioGroupItem value="cod" id="cod" className="sr-only" />
                                            <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
                                                <span className="text-xs font-bold text-primary">COD</span>
                                            </div>
                                            <div>
                                                <p className="font-bold">Cash On Delivery</p>
                                                <p className="text-xs text-muted-foreground">Pay when you receive</p>
                                            </div>
                                        </div>
                                        {paymentMethod === "cod" && <CheckCircle2 size={24} className="text-primary" />}
                                    </label>
                                </RadioGroup>
                            </section>
                        </div>

                        {/* Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="glass-strong p-8 rounded-3xl sticky top-32 space-y-8">
                                <h3 className="text-2xl font-heading font-bold">Order Summary</h3>

                                <div className="max-h-60 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold truncate">{item.name}</h4>
                                                <div className="flex justify-between items-center mt-1">
                                                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                                    <p className="text-sm font-bold">{item.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="bg-white/10" />

                                <div className="space-y-3">
                                    <div className="flex justify-between text-muted-foreground text-sm">
                                        <span className="uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground text-sm">
                                        <span className="uppercase tracking-widest text-[10px] font-bold">GST (18%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground text-sm">
                                        <span className="uppercase tracking-widest text-[10px] font-bold">Shipping</span>
                                        <span className="text-primary font-bold">FREE</span>
                                    </div>
                                    <Separator className="bg-white/10 my-2" />
                                    <div className="flex justify-between items-end">
                                        <span className="text-lg font-bold">Total</span>
                                        <span className="text-3xl font-heading font-bold text-gradient">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-8 rounded-2xl text-xl font-bold transition-all relative overflow-hidden group"
                                >
                                    <span className={`relative z-10 flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                                        Place Order
                                        <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    {isSubmitting && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                        </div>
                                    )}
                                </Button>

                                <p className="text-[10px] text-muted-foreground text-center uppercase tracking-widest leading-relaxed">
                                    By placing an order, you agree to our <br />
                                    <span className="text-primary/80 hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
                                </p>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default CheckoutPage;
