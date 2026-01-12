import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '@/types/ecommerce';
import { useToast } from '@/components/ui/use-toast';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    subtotal: number;
    tax: number;
    total: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product, quantity: number) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                toast({
                    title: "Updated quantity",
                    description: `${product.name} quantity increased in your cart.`,
                });
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            toast({
                title: "Added to cart",
                description: `${product.name} has been added to your cart.`,
            });
            return [...prevCart, { ...product, quantity }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
        toast({
            title: "Removed from cart",
            description: "Item has been removed from your cart.",
            variant: "destructive",
        });
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const subtotal = cart.reduce((acc, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        return acc + price * item.quantity;
    }, 0);

    const tax = subtotal * 0.18; // 18% GST Example
    const total = subtotal + tax;

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                subtotal,
                tax,
                total,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
