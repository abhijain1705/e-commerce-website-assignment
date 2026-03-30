import { useState, useMemo, useEffect } from "react";
import FilterTray from "../components/FilterTray";
import ProductCard, { Product } from "../components/ProductCard";
import { getAllProducts } from "../apis/getAllProduct";
import { useSearchParams } from "react-router-dom";


type GridSize = 2 | 3 | 4;

export interface FilterState {
    categories: string[];
    sizes: string[];
    priceRange: [number, number];
}

export default function HomePage() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [gridSize, setGridSize] = useState<GridSize>(3);

    const [searchParams, setSearchParams] = useSearchParams();

    const [sortBy, setSortBy] = useState(
        searchParams.get("sort") || "featured"
    );
    const [filters, setFilters] = useState<FilterState>({
        categories: searchParams.get("categories")?.split(",") || [],
        sizes: searchParams.get("sizes")?.split(",") || [],
        priceRange: searchParams.get("priceRange")
            ? (searchParams.get("priceRange")!.split(",").map(Number) as [number, number])
            : [0, 50000],
    });

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            const res = await getAllProducts();

            if (res.status === "ok") {
                setProducts(res.data);
            } else {
                setError(res?.error ?? null);
            }

            setLoading(false);
        };

        fetchProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        let list: Product[] = products.map((p: any) => ({
            id: p.id,
            name: p.title,
            brand: p.category,
            price: p.price,
            image: p.image,
            colors: [],
            rating: p.rating?.rate || 0,
            reviews: p.rating?.count || 0,
            isNew: false,
        }));

        list = list.filter((p) => {
            if (filters.categories.length && !filters.categories.includes(p.brand)) return false;
            if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false;
            return true;
        });

        switch (sortBy) {
            case "price-asc":
                list = [...list].sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                list = [...list].sort((a, b) => b.price - a.price);
                break;
            case "rating":
                list = [...list].sort((a, b) => b.rating - a.rating);
                break;
            case "popular":
                list = [...list].sort((a, b) => b.reviews - a.reviews);
                break;
        }

        return list;
    }, [products, filters, searchParams, sortBy]);

    const activeFilterCount = filters.categories.length + filters.sizes.length + filters.priceRange.length;

    const gridCols: Record<GridSize, string> = {
        2: "grid-cols-2",
        3: "grid-cols-2 md:grid-cols-3",
        4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-stone-500 text-sm tracking-wide">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500 text-sm">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <section className="relative overflow-hidden bg-stone-50">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-10">
                    <div className="flex-1 lg:max-w-lg">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium mb-4">
                            Spring / Summer 2025
                        </p>
                        <h1 className="text-5xl lg:text-7xl font-black leading-[0.95] text-stone-900 mb-6">
                            Dress<br />
                            <span className="italic font-normal">your</span><br />
                            Truth.
                        </h1>
                        <p className="text-stone-500 text-sm leading-relaxed mb-8 max-w-sm">
                            Thoughtfully curated fashion for the modern wardrobe.
                        </p>
                    </div>
                </div>
            </section>

            <section className="border-y border-stone-100">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-5">
                    <div className="flex gap-6 overflow-x-auto">
                        {["All", "electronics", "jewelery", "men's clothing", "women's clothing"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() =>
                                    setFilters((f) => ({
                                        ...f,
                                        categories: cat === "All" ? [] : [cat],
                                    }))
                                }
                                className="text-[11px] uppercase"
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
                                        onClick={() => setFilters({ categories: [], sizes: [], priceRange: [0, 50000] })}
                                        className="text-[10px] text-stone-400 hover:text-stone-700 underline underline-offset-2 transition-colors"
                                    >
                                        Clear filters
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-3">
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

                        <div className={`grid ${gridCols[gridSize]} gap-x-4 gap-y-10`}>
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="mt-10 text-center text-xs text-stone-400">
                            Showing {filteredProducts.length} of {products.length} items
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}