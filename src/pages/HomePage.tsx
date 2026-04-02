import { useState, useEffect } from "react";
import FilterTray from "../components/FilterTray";
import ProductCard, { Product } from "../components/ProductCard";
import { getProducts, getCategories } from "../apis/getAllProduct";
import { useSearchParams } from "react-router-dom";

export type GridSize = 2 | 3 | 4;

export type FilterState = {
    categorySlug: string;
    title: string;
    priceRange: [number, number];
}

export default function HomePage() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [gridSize, setGridSize] = useState<GridSize>(3);

    const [searchParams, setSearchParams] = useSearchParams();

    const categorySlug = searchParams.get("categorySlug") || "";
    const title = searchParams.get("title") || "";
    const sort = searchParams.get("sort") || "asc";
    const page = parseInt(searchParams.get("page") || "0");
    const limit = 12;

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const priceParam = searchParams.get("priceRange");

    const priceRange: [number, number] = priceParam
        ? (() => {
            const parts = priceParam.split(",").map(Number);
            return [
                parts[0] || 0,
                parts[1] || 50000
            ];
        })()
        : [0, 50000];

    useEffect(() => {
        getCategories().then(res => {
            if (res.status === "ok") setCategories(res.data);
        });
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            const offset = page * limit;

            const res = await getProducts({
                categoryId: categorySlug ? categories.find(c => String(c.id) === categorySlug || c.slug === categorySlug || c.name === categorySlug)?.id : undefined,
                title: title || undefined,
                price_min: priceParam ? priceRange[0] : undefined,
                price_max: priceParam ? priceRange[1] : undefined,
                offset,
                limit
            });

            if (res.status === "ok") {
                setProducts(res.data);
            } else {
                setError(res.error);
            }

            setLoading(false);
        };

        fetchProducts();
    }, [categorySlug, title, priceParam, page, categories]);


    const gridCols: Record<GridSize, string> = {
        2: "grid-cols-2",
        3: "grid-cols-2 md:grid-cols-3",
        4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    };

    const finalProducts = [...products]
        .sort((a, b) => {
            if (sort === "price-asc") return a.price - b.price;
            if (sort === "price-desc") return b.price - a.price;
            return 0;
        });

    function clearFilters() {
        setSearchParams({});
    }

    return (
        <div className="min-h-screen bg-white">
            <section className="relative overflow-hidden bg-stone-50">
                <img alt="banner" src="/banner.png" />
            </section>

            <section className="border-y border-stone-100">
                <div className="max-w-screen-xl mx-auto px-6 py-5">
                    <div className="flex gap-6 overflow-x-auto items-center">
                        <button
                            onClick={() => {
                                setSearchParams((prev) => {
                                    prev.delete("categorySlug");
                                    prev.set("page", "0");
                                    return prev;
                                });
                            }}
                            className={`text-[11px] uppercase ${!categorySlug ? "font-bold text-stone-900" : "text-stone-500"}`}
                        >
                            All
                        </button>
                        {categories.slice(0, 8).map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setSearchParams((prev) => {
                                        prev.set("categorySlug", String(cat.id));
                                        prev.set("page", "0");
                                        return prev;
                                    });
                                }}
                                className={`text-[11px] uppercase whitespace-nowrap ${categorySlug === String(cat.id) ? "font-bold text-stone-900" : "text-stone-500"}`}
                            >
                                {cat.name}
                            </button>
                        ))}

                        <div className="ml-auto relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={title}
                                onChange={(e) => {
                                    setSearchParams((prev) => {
                                        if (e.target.value) prev.set("title", e.target.value);
                                        else prev.delete("title");
                                        prev.set("page", "0");
                                        return prev;
                                    });
                                }}
                                className="text-xs border border-stone-300 rounded px-3 py-1.5 focus:outline-none focus:border-stone-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <main className="max-w-screen-xl mx-auto px-6 py-10">
                <div className="flex flex-col lg:flex-row gap-8">

                    <FilterTray
                        isOpen={filterOpen}
                        onClose={() => setFilterOpen(false)}
                        filters={{ categorySlug, title, priceRange }}
                        onFilterChange={() => { }}
                        categories={categories}
                        productCount={products.length}
                        sortBy={sort}
                        onSortChange={() => { }}
                    />

                    <div className="flex-1">

                        <div className="flex justify-between mb-6">
                            <span className="text-stone-400 text-xs flex items-center gap-2">
                                <button className="lg:hidden underline" onClick={() => setFilterOpen(true)}>Filters</button>
                                <span className="hidden lg:inline">{products.length} items</span>
                            </span>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={clearFilters}
                                    className="text-xs underline text-stone-500"
                                >
                                    Clear filters
                                </button>
                                <div className="flex items-center gap-3 ml-4">
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

                        {loading ? (
                            <div className="flex justify-center items-center py-20 text-stone-500">
                                <svg className="animate-spin h-8 w-8 text-stone-900 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading products...
                            </div>
                        ) : error ? (
                            <div className="text-center text-red-500 py-10 bg-red-50 rounded">
                                {error}
                            </div>
                        ) : finalProducts.length === 0 ? (
                            <div className="text-center text-stone-500 py-20">
                                No products found matching your criteria.
                            </div>
                        ) : (
                            <>
                                <div className={`grid ${gridCols[gridSize]} gap-6`}>
                                    {finalProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                <div className="flex items-center justify-between border-t border-stone-200 mt-10 pt-6">
                                    <button
                                        onClick={() => setSearchParams((prev) => { prev.set("page", String(Math.max(0, page - 1))); return prev; })}
                                        disabled={page === 0}
                                        className="px-6 py-2 border border-stone-300 text-sm disabled:opacity-50 hover:bg-stone-50 transition"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-sm text-stone-500">Page {page + 1}</span>
                                    <button
                                        onClick={() => setSearchParams((prev) => { prev.set("page", String(page + 1)); return prev; })}
                                        disabled={finalProducts.length < limit}
                                        className="px-6 py-2 border border-stone-300 text-sm disabled:opacity-50 hover:bg-stone-50 transition"
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}