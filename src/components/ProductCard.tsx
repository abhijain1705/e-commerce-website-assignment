import { useEffect, useState } from "react";
import { useCart } from "../cart/CartContext";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export type Product = {
    id: number;
    title: string;
    slug?: string;
    price: number;
    description: string;
    category: {
        id: number;
        name: string;
        slug?: string;
        image?: string;
    };
    images: string[];
};

interface ProductCardProps {
    insideCartPage?: boolean;
    product: Product;
}

export default function ProductCard({ product, insideCartPage }: ProductCardProps) {
    const [hovered, setHovered] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const { cartItems, removeFromCart, addToCart } = useCart();

    const { user } = useAuth();

    const handleAddToCart = (e: React.MouseEvent) => {
        if (!user) {
            alert("Please login to add items to cart");
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 1800);
    };

    useEffect(() => {
        if (cartItems.find((item) => item.id === product.id)) {
            setAddedToCart(true);
        }
    }, [cartItems, product.id])

    let imageUrl = "https://via.placeholder.com/300";
    if (product?.images && product.images.length > 0) {
        imageUrl = product.images[0];
        if (imageUrl.startsWith('["')) {
            try {
                const parsed = JSON.parse(imageUrl);
                imageUrl = parsed[0];
            } catch (e) { }
        }
    }

    return (
        <Link
            to={`/product/${product.id}`}
            className="group relative block"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative overflow-hidden bg-stone-50 aspect-[3/4]">
                <img
                    src={imageUrl}
                    alt={product.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700`}
                />
                <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWishlisted(!wishlisted); }}
                    className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-200 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                        }`}
                >
                    <svg
                        className={`w-[18px] h-[18px] transition-all duration-200 ${wishlisted ? "text-rose-500 fill-rose-500" : "text-stone-700 fill-transparent stroke-stone-700"
                            }`}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 21C12 21 3.5 15 3.5 9a4.5 4.5 0 018.5-2.08A4.5 4.5 0 0120.5 9c0 6-8.5 12-8.5 12z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div
                    className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                        }`}
                >
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); insideCartPage ? removeFromCart(product.id) : handleAddToCart(e); }}
                        className={`w-full py-3.5 text-[10px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 ${addedToCart
                            ? "bg-stone-700 text-white"
                            : "bg-white/95 backdrop-blur-sm text-stone-900 hover:bg-stone-900 hover:text-white"
                            }`}
                    >
                        {insideCartPage ? "Remove from Bag" : addedToCart ? "✓ Added to Bag" : "Quick Add"}
                    </button>
                </div>
            </div>
            <div className="pt-3.5 pb-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] tracking-[0.18em] uppercase text-stone-400 font-medium mb-0.5">
                            {product.category?.name || "Category"}
                        </p>
                        <h3 className="text-sm text-stone-800 font-medium leading-snug truncate">
                            {product.title}
                        </h3>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-stone-900">
                            ₹{product.price}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}