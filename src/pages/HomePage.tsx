import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterTray from "../components/FilterTray";
import ProductCard, { Product } from "../components/ProductCard";

// ─── Mock product data ───────────────────────────────────────────────────────
const MOCK_PRODUCTS: Product[] = [
    { id: 1, name: "Linen Relaxed Blazer", brand: "Gazet Studio", price: 4999, originalPrice: 7999, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80", colors: ["#c8b89a", "#1a1a1a", "#f5f5f5"], rating: 4.8, reviews: 312, tag: "Sale", isNew: false },
    { id: 2, name: "Silk Slip Midi Dress", brand: "The Archive", price: 8499, image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80", hoverImage: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80", colors: ["#f2a7b5", "#c8b89a", "#1e2e4a"], rating: 4.9, reviews: 204, isNew: true },
    { id: 3, name: "Tailored Wide-Leg Trouser", brand: "Minimal Co.", price: 3499, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80", colors: ["#1a1a1a", "#f5f5f5", "#1e2e4a", "#7a9e7e"], rating: 4.6, reviews: 179, isNew: false },
    { id: 4, name: "Oversized Cotton Tee", brand: "Mono Label", price: 1299, originalPrice: 1799, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80", colors: ["#f5f5f5", "#1a1a1a", "#c19a6b"], rating: 4.4, reviews: 501, tag: "Best Seller" },
    { id: 5, name: "Pleated Maxi Skirt", brand: "The Archive", price: 5299, image: "https://images.unsplash.com/photo-1583496661160-fb5218feba68?w=600&q=80", colors: ["#b5451b", "#1a1a1a", "#c8b89a"], rating: 4.7, reviews: 88, isNew: true },
    { id: 6, name: "Leather Crossbody Bag", brand: "Craft & Co.", price: 11999, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80", colors: ["#c19a6b", "#1a1a1a", "#f5f5f5"], rating: 4.9, reviews: 150, tag: "Limited Edition" },
    { id: 7, name: "Ribbed Knit Cardigan", brand: "Gazet Studio", price: 3799, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80", colors: ["#7a9e7e", "#f2a7b5", "#c8b89a", "#1a1a1a"], rating: 4.5, reviews: 267, isNew: false },
    { id: 8, name: "Suede Ankle Boots", brand: "Craft & Co.", price: 9499, originalPrice: 12999, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80", colors: ["#c19a6b", "#1a1a1a"], rating: 4.8, reviews: 93, tag: "Sale" },
    { id: 9, name: "Draped Satin Blouse", brand: "The Archive", price: 4199, image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600&q=80", colors: ["#f2a7b5", "#f5f5f5", "#1e2e4a"], rating: 4.3, reviews: 134, isNew: true },
    { id: 10, name: "Classic Trench Coat", brand: "Minimal Co.", price: 14999, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80", colors: ["#c19a6b", "#1a1a1a", "#c8b89a"], rating: 4.9, reviews: 402, isNew: false },
    { id: 11, name: "Denim Straight-Cut Jeans", brand: "Mono Label", price: 2999, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80", colors: ["#1e2e4a", "#1a1a1a", "#f5f5f5"], rating: 4.6, reviews: 789, tag: "Best Seller" },
    { id: 12, name: "Linen Wide Pants", brand: "Gazet Studio", price: 3299, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80", colors: ["#c8b89a", "#f5f5f5", "#7a9e7e"], rating: 4.5, reviews: 211, isNew: true },
];

const SORT_OPTIONS = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Top Rated" },
    { value: "popular", label: "Most Popular" },
];

type GridSize = 2 | 3 | 4;

export default function HomePage() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState("featured");
    const [gridSize, setGridSize] = useState<GridSize>(3);
    const [filters, setFilters] = useState({
        categories: [] as string[],
        sizes: [] as string[],
        colors: [] as string[],
        priceRange: [0, 50000] as [number, number],
        brands: [] as string[],
        tags: [] as string[],
    });

    const filteredProducts = useMemo(() => {
        let list = MOCK_PRODUCTS.filter((p) => {
            if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
            if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;
            if (filters.tags.length) {
                const productTag = p.tag || (p.isNew ? "New In" : "");
                if (!filters.tags.some((t) => productTag.toLowerCase().includes(t.toLowerCase()) || (t === "New In" && p.isNew))) return false;
            }
            return true;
        });

        switch (sortBy) {
            case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
            case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
            case "newest": list = [...list].filter((p) => p.isNew).concat(list.filter((p) => !p.isNew)); break;
            case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
            case "popular": list = [...list].sort((a, b) => b.reviews - a.reviews); break;
        }
        return list;
    }, [filters, sortBy]);

    const activeFilterCount = filters.categories.length + filters.sizes.length + filters.colors.length + filters.brands.length + filters.tags.length;

    const gridCols: Record<GridSize, string> = {
        2: "grid-cols-2",
        3: "grid-cols-2 md:grid-cols-3",
        4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    };

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <section className="relative overflow-hidden bg-stone-50">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-10">
                    <div className="flex-1 lg:max-w-lg">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium mb-4">
                            Spring / Summer 2025
                        </p>
                        <h1
                            className="text-5xl lg:text-7xl font-black leading-[0.95] text-stone-900 mb-6"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Dress<br />
                            <span className="italic font-normal">your</span><br />
                            Truth.
                        </h1>
                        <p className="text-stone-500 text-sm leading-relaxed mb-8 max-w-sm">
                            Thoughtfully curated fashion for the modern wardrobe. Pieces that last, styles that endure.
                        </p>
                        <div className="flex gap-3">
                            <button className="bg-stone-900 text-white text-[11px] tracking-[0.2em] uppercase font-semibold px-7 py-3.5 hover:bg-stone-700 transition-colors">
                                Shop Now
                            </button>
                            <button className="border border-stone-300 text-stone-700 text-[11px] tracking-[0.2em] uppercase font-semibold px-7 py-3.5 hover:border-stone-600 transition-colors">
                                Lookbook
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 w-full lg:max-w-lg">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="aspect-[3/4] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80"
                                    alt="hero"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="mt-10 aspect-[3/4] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1529139574466-a303027614b2?w=600&q=80"
                                    alt="hero"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Category Pills ── */}
            <section className="border-y border-stone-100">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-5">
                    <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                        {["All", "New In", "Tops", "Dresses", "Outerwear", "Bottoms", "Footwear", "Accessories", "Sale"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() =>
                                    setFilters((f) => ({
                                        ...f,
                                        categories: cat === "All" ? [] : [cat],
                                    }))
                                }
                                className={`whitespace-nowrap text-[11px] tracking-[0.18em] uppercase font-medium pb-1 border-b-[1.5px] transition-all duration-200 flex-shrink-0 ${(cat === "All" && filters.categories.length === 0) || filters.categories.includes(cat)
                                    ? cat === "Sale"
                                        ? "border-rose-500 text-rose-600"
                                        : "border-stone-900 text-stone-900"
                                    : "border-transparent text-stone-400 hover:text-stone-700"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <main className="max-w-screen-xl mx-auto px-6 lg:px-10 py-10">
                <div className="flex gap-8 lg:gap-10">

                    <FilterTray
                        isOpen={filterOpen}
                        onClose={() => setFilterOpen(false)}
                        filters={filters}
                        onFilterChange={setFilters}
                        productCount={filteredProducts.length}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-6 gap-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setFilterOpen(true)}
                                    className="lg:hidden flex items-center gap-2 border border-stone-300 text-stone-600 text-[11px] tracking-[0.15em] uppercase font-medium px-3.5 py-2.5 hover:border-stone-500 transition-colors"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path d="M3 6h18M7 12h10M11 18h2" strokeLinecap="round" />
                                    </svg>
                                    Filter {activeFilterCount > 0 && <span className="text-rose-500">({activeFilterCount})</span>}
                                </button>
                                <span className="text-stone-400 text-xs">
                                    {filteredProducts.length} items
                                </span>
                                {activeFilterCount > 0 && (
                                    <button
                                        onClick={() => setFilters({ categories: [], sizes: [], colors: [], priceRange: [0, 50000], brands: [], tags: [] })}
                                        className="text-[10px] text-stone-400 hover:text-stone-700 underline underline-offset-2 transition-colors"
                                    >
                                        Clear filters
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="lg:hidden text-[11px] tracking-wide border border-stone-200 text-stone-600 px-3 py-2 focus:outline-none focus:border-stone-400 bg-white"
                                >
                                    {SORT_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>

                                <div className="hidden sm:flex gap-1 border border-stone-200 p-0.5">
                                    {([2, 3, 4] as GridSize[]).map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setGridSize(size)}
                                            className={`px-2.5 py-1.5 transition-all ${gridSize === size ? "bg-stone-900 text-white" : "text-stone-400 hover:text-stone-600"}`}
                                        >
                                            <div className={`grid gap-[3px] ${size === 2 ? "grid-cols-2" : size === 3 ? "grid-cols-3" : "grid-cols-4"}`}>
                                                {Array.from({ length: size }).map((_, i) => (
                                                    <div key={i} className={`w-[3px] h-3.5 rounded-sm ${gridSize === size ? "bg-white" : "bg-stone-400"}`} />
                                                ))}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {activeFilterCount > 0 && (
                            <div className="flex flex-wrap gap-2 mb-5">
                                {[...filters.categories, ...filters.sizes, ...filters.colors, ...filters.brands, ...filters.tags].map((chip) => (
                                    <span
                                        key={chip}
                                        className="inline-flex items-center gap-1.5 text-[10px] tracking-wide uppercase bg-stone-100 text-stone-600 px-2.5 py-1"
                                    >
                                        {chip}
                                        <button
                                            onClick={() => {
                                                const remove = (arr: string[]) => arr.filter((v) => v !== chip);
                                                setFilters((f) => ({
                                                    ...f,
                                                    categories: remove(f.categories),
                                                    sizes: remove(f.sizes),
                                                    colors: remove(f.colors),
                                                    brands: remove(f.brands),
                                                    tags: remove(f.tags),
                                                }));
                                            }}
                                            className="hover:text-stone-900 transition-colors"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        {filteredProducts.length > 0 ? (
                            <div className={`grid ${gridCols[gridSize]} gap-x-4 gap-y-10 lg:gap-x-6`}>
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-24 text-center">
                                <p className="text-stone-300 text-5xl mb-4">∅</p>
                                <p className="text-stone-500 text-sm mb-2">No products match your filters.</p>
                                <button
                                    onClick={() => setFilters({ categories: [], sizes: [], colors: [], priceRange: [0, 50000], brands: [], tags: [] })}
                                    className="text-[11px] tracking-[0.15em] uppercase underline text-stone-400 hover:text-stone-700"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}

                        {filteredProducts.length > 0 && (
                            <div className="mt-16 text-center">
                                <button className="border border-stone-300 text-stone-600 text-[11px] tracking-[0.2em] uppercase font-medium px-10 py-4 hover:bg-stone-50 hover:border-stone-500 transition-all">
                                    Load More
                                </button>
                                <p className="text-stone-300 text-xs mt-3">Showing {filteredProducts.length} of {MOCK_PRODUCTS.length} items</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <section className="bg-stone-900 text-white">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16 text-center">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-3">The Gazet Edit</p>
                    <h2
                        className="text-4xl lg:text-5xl font-black text-stone-100 mb-4"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Style is a language.<br />
                        <span className="italic font-normal text-stone-400">Speak fluently.</span>
                    </h2>
                    <button className="mt-6 border border-stone-600 text-stone-300 text-[11px] tracking-[0.2em] uppercase font-medium px-8 py-3.5 hover:border-stone-300 hover:text-white transition-all">
                        Read the Edit
                    </button>
                </div>
            </section>
        </div>
    );
}