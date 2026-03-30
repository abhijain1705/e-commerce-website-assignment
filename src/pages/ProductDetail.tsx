import { useState } from "react";
import ProductCard, { Product } from "../components/ProductCard";

// ── Types ──────────────────────────────────────────────────────────────────
interface Review {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    date: string;
    verified: boolean;
    body: string;
    size: string;
    fit: "runs small" | "true to size" | "runs large";
}

// ── Mock data ──────────────────────────────────────────────────────────────
const PRODUCT = {
    id: 1,
    name: "Linen Relaxed Blazer",
    brand: "Gazet Studio",
    sku: "GZ-BLZ-001",
    price: 4999,
    originalPrice: 7999,
    description:
        "Crafted from 100% European linen, this relaxed-fit blazer is the cornerstone of the modern wardrobe. Structured shoulders, a slightly oversized silhouette, and a clean notch lapel make it equally at home at a boardroom or a weekend brunch.",
    details: [
        "100% European linen",
        "Relaxed, slightly oversized fit",
        "Notch lapel with welt chest pocket",
        "Two flap pockets at hip",
        "Fully lined with cupro fabric",
        "Single-button closure",
        "Dry clean only",
    ],
    sizing: "Model is 5'9\" and wearing size S. Fits true to size.",
    images: [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=85",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85",
        "https://images.unsplash.com/photo-1529139574466-a303027614b2?w=900&q=85",
        "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=900&q=85",
    ],
    colors: [
        { name: "Natural", hex: "#c8b89a", images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=900&q=85"] },
        { name: "Slate Black", hex: "#1a1a1a", images: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=900&q=85"] },
        { name: "Chalk", hex: "#f0ede8", images: ["https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85"] },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 312,
    tag: "Sale" as const,
};

const REVIEWS: Review[] = [
    { id: 1, name: "Aisha R.", avatar: "https://i.pravatar.cc/48?img=47", rating: 5, date: "Mar 12, 2025", verified: true, body: "Absolutely obsessed with this blazer. The linen quality is exceptional and it drapes beautifully. I've worn it three ways already — over a slip dress, with trousers, and thrown over denim.", size: "S", fit: "true to size" },
    { id: 2, name: "Priya M.", avatar: "https://i.pravatar.cc/48?img=45", rating: 5, date: "Feb 28, 2025", verified: true, body: "This is the blazer I've been searching for years. Structured but relaxed, effortless without looking sloppy. Worth every rupee.", size: "M", fit: "runs small" },
    { id: 3, name: "Sara K.", avatar: "https://i.pravatar.cc/48?img=44", rating: 4, date: "Feb 14, 2025", verified: true, body: "Beautiful piece. Slightly wrinkles on long travel days but honestly that's linen and it looks chic anyway. The lining is a lovely touch.", size: "L", fit: "true to size" },
];

const RECOMMENDED: Product[] = [
    { id: 2, name: "Silk Slip Midi Dress", brand: "The Archive", price: 8499, image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80", colors: ["#f2a7b5", "#c8b89a", "#1e2e4a"], rating: 4.9, reviews: 204, isNew: true },
    { id: 7, name: "Ribbed Knit Cardigan", brand: "Gazet Studio", price: 3799, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80", colors: ["#7a9e7e", "#f2a7b5", "#c8b89a", "#1a1a1a"], rating: 4.5, reviews: 267 },
    { id: 3, name: "Tailored Wide-Leg Trouser", brand: "Minimal Co.", price: 3499, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80", colors: ["#1a1a1a", "#f5f5f5", "#1e2e4a", "#7a9e7e"], rating: 4.6, reviews: 179 },
    { id: 9, name: "Draped Satin Blouse", brand: "The Archive", price: 4199, image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80", colors: ["#f2a7b5", "#f5f5f5", "#1e2e4a"], rating: 4.3, reviews: 134, isNew: true },
];

// ── Component ──────────────────────────────────────────────────────────────
export default function ProductDetailPage() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [wishlist, setWishlist] = useState(false);
    const [addedToBag, setAddedToBag] = useState(false);
    const [activeTab, setActiveTab] = useState<"details" | "sizing" | "reviews">("details");
    const [qty, setQty] = useState(1);
    const [sizeError, setSizeError] = useState(false);
    const [zoom, setZoom] = useState(false);

    const discount = Math.round(
        ((PRODUCT.originalPrice - PRODUCT.price) / PRODUCT.originalPrice) * 100
    );

    const handleAddToBag = () => {
        if (!selectedSize) {
            setSizeError(true);
            setTimeout(() => setSizeError(false), 2000);
            return;
        }
        setAddedToBag(true);
        setTimeout(() => setAddedToBag(false), 2200);
    };

    const avgRating = PRODUCT.rating;
    const starBreakdown = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: star === 5 ? 241 : star === 4 ? 53 : star === 3 ? 12 : star === 2 ? 4 : 2,
    }));

    return (
        <div
            className="min-h-screen bg-white"
        >

            <div className="max-w-screen-xl mx-auto px-6 lg:px-10 pt-5 pb-2">
                <nav className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-stone-400">
                    {["Home", "Women", "Blazers", PRODUCT.name].map((crumb, i, arr) => (
                        <span key={crumb} className="flex items-center gap-2">
                            {i < arr.length - 1 ? (
                                <a href="#" className="hover:text-stone-600 transition-colors">{crumb}</a>
                            ) : (
                                <span className="text-stone-600 font-medium">{crumb}</span>
                            )}
                            {i < arr.length - 1 && <span className="text-stone-200">›</span>}
                        </span>
                    ))}
                </nav>
            </div>

            <main className="max-w-screen-xl mx-auto px-6 lg:px-10 py-8">
                <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-10 xl:gap-16">

                    <div className="flex gap-3">
                        <div className="hidden md:flex flex-col gap-2.5 w-16 flex-shrink-0">
                            {PRODUCT.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`aspect-[3/4] overflow-hidden border-[1.5px] transition-all duration-200 ${selectedImage === i ? "border-stone-900" : "border-transparent hover:border-stone-300"
                                        }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        <div
                            className="flex-1 relative overflow-hidden bg-stone-50 aspect-[3/4] cursor-zoom-in group"
                            onClick={() => setZoom(!zoom)}
                        >
                            <img
                                src={PRODUCT.images[selectedImage]}
                                alt={PRODUCT.name}
                                className={`w-full h-full object-cover transition-transform duration-700 ${zoom ? "scale-125" : "scale-100 group-hover:scale-[1.03]"}`}
                            />
                            {PRODUCT.tag && (
                                <div className="absolute top-4 left-4">
                                    <span className="bg-rose-600 text-white text-[9px] tracking-[0.2em] uppercase font-semibold px-3 py-1.5">
                                        {PRODUCT.tag} — {discount}% Off
                                    </span>
                                </div>
                            )}
                            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[9px] tracking-widest uppercase text-stone-500">Click to zoom</span>
                            </div>

                            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <button
                                    className="pointer-events-auto w-8 h-8 bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                                    onClick={(e) => { e.stopPropagation(); setSelectedImage((i) => (i - 1 + PRODUCT.images.length) % PRODUCT.images.length); }}
                                >
                                    <svg className="w-3.5 h-3.5 text-stone-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" /></svg>
                                </button>
                                <button
                                    className="pointer-events-auto w-8 h-8 bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                                    onClick={(e) => { e.stopPropagation(); setSelectedImage((i) => (i + 1) % PRODUCT.images.length); }}
                                >
                                    <svg className="w-3.5 h-3.5 text-stone-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-24 self-start">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-medium mb-1.5">
                            {PRODUCT.brand}
                        </p>
                        <h1
                            className="text-3xl xl:text-4xl font-black text-stone-900 leading-tight mb-3"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            {PRODUCT.name}
                        </h1>

                        <div className="flex items-center gap-2 mb-5">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <svg key={s} className={`w-3.5 h-3.5 ${s <= Math.round(avgRating) ? "text-amber-400" : "text-stone-200"}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="text-sm text-stone-600 font-medium">{avgRating}</span>
                            <span className="text-xs text-stone-400">({PRODUCT.reviewCount} reviews)</span>
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl font-bold text-stone-900">₹{PRODUCT.price.toLocaleString()}</span>
                            <span className="text-base text-stone-400 line-through">₹{PRODUCT.originalPrice.toLocaleString()}</span>
                            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 tracking-wide">
                                Save {discount}%
                            </span>
                        </div>

                        <div className="mb-5">
                            <div className="flex items-center justify-between mb-2.5">
                                <p className="text-[11px] tracking-[0.15em] uppercase text-stone-600 font-medium">
                                    Color: <span className="text-stone-900">{PRODUCT.colors[selectedColor].name}</span>
                                </p>
                            </div>
                            <div className="flex gap-2.5">
                                {PRODUCT.colors.map((color, i) => (
                                    <button
                                        key={color.name}
                                        onClick={() => { setSelectedColor(i); setSelectedImage(0); }}
                                        title={color.name}
                                        className={`w-8 h-8 rounded-full border-[2px] transition-all duration-200 ${selectedColor === i ? "border-stone-900 scale-110 ring-2 ring-offset-2 ring-stone-300" : "border-stone-200 hover:scale-105"
                                            }`}
                                        style={{ backgroundColor: color.hex }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2.5">
                                <p className={`text-[11px] tracking-[0.15em] uppercase font-medium transition-colors ${sizeError ? "text-rose-500" : "text-stone-600"}`}>
                                    {sizeError ? "⚠ Please select a size" : "Select Size"}
                                </p>
                                <button className="text-[11px] text-stone-400 underline underline-offset-2 hover:text-stone-600 transition-colors">
                                    Size guide
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {PRODUCT.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => { setSelectedSize(size); setSizeError(false); }}
                                        className={`w-12 h-12 text-xs font-medium border transition-all duration-150 ${selectedSize === size
                                            ? "border-stone-900 bg-stone-900 text-white"
                                            : sizeError
                                                ? "border-rose-200 text-stone-400 hover:border-rose-400"
                                                : "border-stone-200 text-stone-600 hover:border-stone-400"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-3 mb-4">
                            <div className="flex items-center border border-stone-200">
                                <button
                                    onClick={() => setQty(Math.max(1, qty - 1))}
                                    className="w-10 h-12 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors text-lg"
                                >
                                    −
                                </button>
                                <span className="w-8 text-center text-sm font-medium text-stone-800">{qty}</span>
                                <button
                                    onClick={() => setQty(qty + 1)}
                                    className="w-10 h-12 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors text-lg"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToBag}
                                className={`flex-1 h-12 text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${addedToBag
                                    ? "bg-stone-700 text-white"
                                    : "bg-stone-900 text-white hover:bg-stone-700"
                                    }`}
                            >
                                {addedToBag ? (
                                    <>
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Added to Bag
                                    </>
                                ) : (
                                    "Add to Bag"
                                )}
                            </button>
                            <button
                                onClick={() => setWishlist(!wishlist)}
                                className={`w-12 h-12 border flex items-center justify-center transition-all duration-200 ${wishlist ? "border-rose-300 bg-rose-50" : "border-stone-200 hover:border-stone-400"
                                    }`}
                            >
                                <svg
                                    className={`w-5 h-5 transition-all ${wishlist ? "text-rose-500 fill-rose-500" : "text-stone-500 fill-transparent stroke-stone-500"}`}
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 21C12 21 3.5 15 3.5 9a4.5 4.5 0 018.5-2.08A4.5 4.5 0 0120.5 9c0 6-8.5 12-8.5 12z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 py-4 border-y border-stone-100 mb-5">
                            {[
                                { icon: "🚚", label: "Free Delivery", sub: "On orders ₹2,999+" },
                                { icon: "↩️", label: "Easy Returns", sub: "30-day window" },
                                { icon: "🔒", label: "Secure Pay", sub: "Encrypted checkout" },
                            ].map((badge) => (
                                <div key={badge.label} className="text-center">
                                    <div className="text-lg mb-0.5">{badge.icon}</div>
                                    <p className="text-[9px] tracking-[0.12em] uppercase font-semibold text-stone-700">{badge.label}</p>
                                    <p className="text-[9px] text-stone-400">{badge.sub}</p>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex border-b border-stone-100 mb-4">
                                {(["details", "sizing", "reviews"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`text-[10px] tracking-[0.18em] uppercase font-medium pb-3 mr-6 border-b-[1.5px] transition-all ${activeTab === tab
                                            ? "border-stone-900 text-stone-900"
                                            : "border-transparent text-stone-400 hover:text-stone-600"
                                            }`}
                                    >
                                        {tab}{tab === "reviews" ? ` (${REVIEWS.length})` : ""}
                                    </button>
                                ))}
                            </div>

                            {activeTab === "details" && (
                                <div className="space-y-3">
                                    <p className="text-sm text-stone-500 leading-relaxed">{PRODUCT.description}</p>
                                    <ul className="space-y-1.5 mt-3">
                                        {PRODUCT.details.map((d) => (
                                            <li key={d} className="flex items-start gap-2 text-xs text-stone-500">
                                                <span className="w-1 h-1 rounded-full bg-stone-300 mt-1.5 flex-shrink-0" />
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-[11px] text-stone-400 pt-1">SKU: {PRODUCT.sku}</p>
                                </div>
                            )}

                            {activeTab === "sizing" && (
                                <div>
                                    <p className="text-sm text-stone-500 leading-relaxed mb-4">{PRODUCT.sizing}</p>
                                    <table className="w-full text-xs text-stone-500 border border-stone-100">
                                        <thead>
                                            <tr className="bg-stone-50">
                                                {["Size", "Chest", "Waist", "Length"].map((h) => (
                                                    <th key={h} className="text-[10px] tracking-wide text-left px-3 py-2 font-semibold text-stone-700">{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                ["XS", "82cm", "66cm", "68cm"],
                                                ["S", "86cm", "70cm", "70cm"],
                                                ["M", "90cm", "74cm", "72cm"],
                                                ["L", "94cm", "78cm", "74cm"],
                                                ["XL", "98cm", "82cm", "76cm"],
                                            ].map((row) => (
                                                <tr key={row[0]} className={`border-t border-stone-100 ${selectedSize === row[0] ? "bg-stone-50 font-medium" : ""}`}>
                                                    {row.map((cell, i) => (
                                                        <td key={i} className="px-3 py-2">{cell}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {activeTab === "reviews" && (
                                <div>
                                    <div className="flex gap-6 mb-5 pb-5 border-b border-stone-100">
                                        <div className="text-center">
                                            <p className="text-4xl font-bold text-stone-900">{avgRating}</p>
                                            <div className="flex gap-0.5 justify-center mt-1 mb-1">
                                                {[1, 2, 3, 4, 5].map((s) => (
                                                    <svg key={s} className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <p className="text-[10px] text-stone-400">{PRODUCT.reviewCount} reviews</p>
                                        </div>
                                        <div className="flex-1 space-y-1.5">
                                            {starBreakdown.map(({ star, count }) => (
                                                <div key={star} className="flex items-center gap-2">
                                                    <span className="text-[10px] text-stone-400 w-4">{star}★</span>
                                                    <div className="flex-1 h-1.5 bg-stone-100 overflow-hidden">
                                                        <div
                                                            className="h-full bg-amber-400 transition-all"
                                                            style={{ width: `${(count / PRODUCT.reviewCount) * 100}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] text-stone-400 w-4 text-right">{count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-5">
                                        {REVIEWS.map((review) => (
                                            <div key={review.id} className="border-b border-stone-100 pb-5 last:border-0">
                                                <div className="flex items-start gap-3 mb-2">
                                                    <img src={review.avatar} alt={review.name} className="w-8 h-8 rounded-full object-cover" />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <span className="text-xs font-semibold text-stone-800">{review.name}</span>
                                                            {review.verified && (
                                                                <span className="text-[9px] tracking-wide text-emerald-600 bg-emerald-50 px-1.5 py-0.5">✓ Verified</span>
                                                            )}
                                                            <span className="text-[10px] text-stone-300">{review.date}</span>
                                                        </div>
                                                        <div className="flex gap-0.5 mt-0.5">
                                                            {[1, 2, 3, 4, 5].map((s) => (
                                                                <svg key={s} className={`w-2.5 h-2.5 ${s <= review.rating ? "text-amber-400" : "text-stone-200"}`} fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-stone-500 leading-relaxed mb-2">{review.body}</p>
                                                <div className="flex gap-3">
                                                    <span className="text-[10px] text-stone-400 bg-stone-50 px-2 py-1">Size: {review.size}</span>
                                                    <span className="text-[10px] text-stone-400 bg-stone-50 px-2 py-1 capitalize">{review.fit}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <div className="md:hidden flex gap-2 overflow-x-auto px-6 pb-6 scrollbar-hide">
                {PRODUCT.images.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`w-14 h-14 flex-shrink-0 border-[1.5px] overflow-hidden transition-all ${selectedImage === i ? "border-stone-900" : "border-stone-200"
                            }`}
                    >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            <section className="bg-stone-50 py-16">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-1">Complete the look</p>
                            <h2
                                className="text-2xl lg:text-3xl font-black text-stone-900 leading-tight"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                You Might Also Love
                            </h2>
                        </div>
                        <a
                            href="#"
                            className="hidden sm:flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-stone-500 hover:text-stone-800 transition-colors group"
                        >
                            View All
                            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M9 5l7 7-7 7" strokeLinecap="round" />
                            </svg>
                        </a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 lg:gap-x-6">
                        {RECOMMENDED.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 border-t border-stone-100">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
                    <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-1">Your history</p>
                    <h3
                        className="text-xl font-black text-stone-900 mb-6"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Recently Viewed
                    </h3>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {RECOMMENDED.slice(0, 3).map((product) => (
                            <div key={product.id} className="flex-shrink-0 w-36">
                                <div className="aspect-[3/4] overflow-hidden bg-stone-50 mb-2">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                </div>
                                <p className="text-[10px] text-stone-400 truncate">{product.brand}</p>
                                <p className="text-xs text-stone-700 font-medium truncate">{product.name}</p>
                                <p className="text-xs text-stone-900 font-semibold mt-0.5">₹{product.price.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-100 p-4 flex gap-3">
                <div className="flex-1">
                    <p className="text-[10px] text-stone-400 truncate">{PRODUCT.name}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-stone-900">₹{PRODUCT.price.toLocaleString()}</span>
                        <span className="text-xs text-stone-400 line-through">₹{PRODUCT.originalPrice.toLocaleString()}</span>
                    </div>
                </div>
                <button
                    onClick={handleAddToBag}
                    className={`px-6 text-[11px] tracking-[0.18em] uppercase font-semibold transition-all duration-200 ${addedToBag ? "bg-stone-700 text-white" : "bg-stone-900 text-white hover:bg-stone-700"
                        }`}
                >
                    {addedToBag ? "Added ✓" : selectedSize ? "Add to Bag" : "Select Size"}
                </button>
            </div>
            <div className="lg:hidden h-20" />

        </div>
    );
}