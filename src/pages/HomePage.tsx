import { useState, useEffect } from "react";
import FilterTray from "../components/FilterTray";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../apis/getAllProduct";
import { useSearchParams } from "react-router-dom";

export type GridSize = 2 | 3 | 4;

export type FilterState = {
    categories: string[];
    sizes: string[];
    priceRange: [number, number];
}

export default function HomePage() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [gridSize, setGridSize] = useState<GridSize>(3);

    const [searchParams, setSearchParams] = useSearchParams();

    const category = searchParams.get("categories") || "";
    const sort = searchParams.get("sort") || "asc";

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const priceParam = searchParams.get("priceRange");

    const priceRange: [number, number] = priceParam
        ? (() => {
            const parts = priceParam.split(",").map(Number);
            return [
                parts[0] ?? 0,
                parts[1] ?? 50000
            ];
        })()
        : [0, 50000];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            const res = await getProducts({
                category: category || undefined,
            });

            if (res.status === "ok") {
                setProducts(res.data);
            } else {
                setError(res.error);
            }

            setLoading(false);
        };

        fetchProducts();
    }, [category]);


    const gridCols: Record<GridSize, string> = {
        2: "grid-cols-2",
        3: "grid-cols-2 md:grid-cols-3",
        4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    };

    const finalProducts = [...products]
        .filter((p) => {
            return (
                p.price >= priceRange[0] &&
                p.price <= priceRange[1]
            );
        })
        .sort((a, b) => {
            if (sort === "price-asc") return a.price - b.price;
            if (sort === "price-desc") return b.price - a.price;
            return 0;
        });

    function clearFilters() {
        setSearchParams({});
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-stone-500 text-sm">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <section className="relative overflow-hidden bg-stone-50">
                <img alt="banner" src="/banner.png" />
            </section>
            <section className="border-y border-stone-100">
                <div className="max-w-screen-xl mx-auto px-6 py-5">
                    <div className="flex gap-6 overflow-x-auto">
                        {["All", "electronics", "jewelery", "men's clothing", "women's clothing"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setSearchParams((prev) => {
                                        if (cat === "All") prev.delete("categories");
                                        else prev.set("categories", cat);
                                        return prev;
                                    });
                                }}
                                className="text-[11px] uppercase"
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <main className="max-w-screen-xl mx-auto px-6 py-10">
                <div className="flex gap-8">

                    <FilterTray
                        isOpen={filterOpen}
                        onClose={() => setFilterOpen(false)}
                        filters={{ categories: category ? [category] : [], sizes: [], priceRange: [0, 50000] }}
                        onFilterChange={() => { }}
                        productCount={products.length}
                        sortBy={sort}
                        onSortChange={() => { }}
                    />

                    <div className="flex-1">

                        <div className="flex justify-between mb-6">
                            <span className="text-stone-400 text-xs">
                                {products.length} items
                            </span>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={clearFilters}
                                    className="text-xs underline"
                                >
                                    Clear filters
                                </button>
                                <div className="flex items-center gap-3 m-6">
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
                        </div>

                        {error ? <div className="text-center text-red-500">{error}</div> : <div className={`grid ${gridCols[gridSize]} gap-6`}>
                            {finalProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>}
                    </div>
                </div>
            </main>
        </div>
    );
}