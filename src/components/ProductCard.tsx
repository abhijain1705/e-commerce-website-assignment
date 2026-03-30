import { useState } from "react";

export interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    image: string;
    hoverImage?: string;
    tag?: string;
    colors: string[];
    rating: number;
    reviews: number;
    isNew?: boolean;
}

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [hovered, setHovered] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);
    const [selectedColor, setSelectedColor] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 1800);
    };

    return (
        <div
            className="group relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative overflow-hidden bg-stone-50 aspect-[3/4]">
                <img
                    src={product.image}
                    alt={product.name}
                    className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ${hovered && product.hoverImage ? "opacity-0 scale-105" : "opacity-100 scale-100"
                        }`}
                />
                {product.hoverImage && (
                    <img
                        src={product.hoverImage}
                        alt={product.name + " alternate"}
                        className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
                            }`}
                    />
                )}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNew && (
                        <span className="bg-stone-900 text-white text-[9px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1">
                            New
                        </span>
                    )}
                    {product.tag && (
                        <span className="bg-rose-600 text-white text-[9px] tracking-[0.2em] uppercase font-semibold px-2.5 py-1">
                            {product.tag}
                        </span>
                    )}
                    {discount && (
                        <span className="bg-emerald-600 text-white text-[9px] tracking-[0.15em] uppercase font-semibold px-2.5 py-1">
                            -{discount}%
                        </span>
                    )}
                </div>
                <button
                    onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
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
                        onClick={handleAddToCart}
                        className={`w-full py-3.5 text-[10px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 ${addedToCart
                            ? "bg-stone-700 text-white"
                            : "bg-white/95 backdrop-blur-sm text-stone-900 hover:bg-stone-900 hover:text-white"
                            }`}
                    >
                        {addedToCart ? "✓ Added to Bag" : "Quick Add"}
                    </button>
                </div>
            </div>
            <div className="pt-3.5 pb-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] tracking-[0.18em] uppercase text-stone-400 font-medium mb-0.5">
                            {product.brand}
                        </p>
                        <h3 className="text-sm text-stone-800 font-medium leading-snug truncate">
                            {product.name}
                        </h3>
                    </div>
                </div>

                <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                className={`w-2.5 h-2.5 ${star <= Math.round(product.rating) ? "text-amber-400" : "text-stone-200"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-[10px] text-stone-400">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-stone-900">
                            ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                            <span className="text-xs text-stone-400 line-through">
                                ₹{product.originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>
                    <div className="flex gap-1">
                        {product.colors.slice(0, 4).map((color, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.preventDefault(); setSelectedColor(i); }}
                                className={`w-3.5 h-3.5 rounded-full border transition-all duration-150 ${selectedColor === i ? "border-stone-700 scale-110" : "border-stone-200"
                                    }`}
                                style={{ backgroundColor: color }}
                                title={color}
                            />
                        ))}
                        {product.colors.length > 4 && (
                            <span className="text-[9px] text-stone-400 self-center ml-0.5">+{product.colors.length - 4}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}