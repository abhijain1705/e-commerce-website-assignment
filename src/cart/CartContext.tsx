import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Product } from "../components/ProductCard";

type CartContextType = {
    cartItems: Product[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: number) => void
    clearCart: () => void
    cartCount: number
    cartTotal: number
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            const parsedItems: Product[] = JSON.parse(savedCart);
            setCartItems(parsedItems);
            setCartCount(parsedItems.length);
            setCartTotal(parsedItems.reduce((total, item) => total + item.price, 0));
        }
    }, []);

    function addToCart(product: Product) {
        const savedCart = localStorage.getItem("cart");
        const parsedCart: Product[] = savedCart ? JSON.parse(savedCart) : [];
        parsedCart.push(product);
        localStorage.setItem("cart", JSON.stringify(parsedCart));
        setCartCount(parsedCart.length);
        setCartTotal(parsedCart.reduce((total, item) => total + item.price, 0));
        setCartItems((prevCart) => [...prevCart, product]);
    }

    function removeFromCart(productId: number) {
        const savedCart = localStorage.getItem("cart");
        const parsedCart: Product[] = savedCart ? JSON.parse(savedCart) : [];
        const updatedCart = parsedCart.filter((item) => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartCount(updatedCart.length);
        setCartTotal(updatedCart.reduce((total, item) => total + item.price, 0));
        setCartItems((prevCart) => prevCart.filter((item) => item.id !== productId));
    }

    function clearCart() {
        localStorage.removeItem("cart");
        setCartItems([]);
        setCartCount(0);
        setCartTotal(0);
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}