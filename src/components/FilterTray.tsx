import { useState } from "react";

interface FilterState {
    categories: string[];
    sizes: string[];
    colors: string[];
    priceRange: [number, number];
    brands: string[];
    tags: string[];
}

interface FilterTrayProps {
    isOpen: boolean;
    onClose: () => void;
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    productCount: number;
    sortBy: string;
    onSortChange: (sort: string) => void;
}

const CATEGORIES = ["All", "Tops", "Dresses", "Bottoms", "Outerwear", "Footwear", "Accessories"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "6", "7", "8", "9", "10"];
const COLOR_OPTIONS = [
    { name: "Black", hex: "#1a1a1a" },
    { name: "White", hex: "#f5f5f5" },
    { name: "Beige", hex: "#c8b89a" },
    { name: "Navy", hex: "#1e2e4a" },
    { name: "Rust", hex: "#b5451b" },
    { name: "Sage", hex: "#7a9e7e" },
    { name: "Blush", hex: "#f2a7b5" },
    { name: "Camel", hex: "#c19a6b" },
];
const BRANDS = ["Gazet Studio", "Minimal Co.", "The Archive", "Mono Label", "Craft & Co."];
const TAGS = ["New In", "Best Seller", "Sale", "Sustainable", "Limited Edition"];
const SORT_OPTIONS = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest First" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating", label: "Top Rated" },
    { value: "popular", label: "Most Popular" },
];

function AccordionSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-stone-100">
            <button
                className="flex items-center justify-between w-full py-4 text-left group"
                onClick={() => setOpen(!open)}
            >
                <span className="text-[11px] tracking-[0.18em] uppercase text-stone-700 font-semibold group-hover:text-stone-900 transition-colors">
                    {title}
                </span>
                <svg
                    className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-4" : "max-h-0"}`}>
                {children}
            </div>
        </div>
    );
}

export default function FilterTray({
    isOpen,
    onClose,
    filters,
    onFilterChange,
    productCount,
    sortBy,
    onSortChange,
}: FilterTrayProps) {
    const toggle = (arr: string[], val: string) =>
        arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

    const activeFilterCount =
        filters.categories.length +
        filters.sizes.length +
        filters.colors.length +
        filters.brands.length +
        filters.tags.length +
        (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000 ? 1 : 0);

    const clearAll = () =>
        onFilterChange({
            categories: [],
            sizes: [],
            colors: [],
            priceRange: [0, 50000],
            brands: [],
            tags: [],
        });

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity duration-300 lg:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />
            <aside
                className={`fixed lg:relative top-0 left-0 h-full lg:h-auto w-72 lg:w-56 xl:w-64 bg-white z-50 lg:z-auto
        overflow-y-auto lg:overflow-visible
        transition-transform duration-400 ease-in-out lg:transform-none
        ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
        flex-shrink-0`}
            >
                <div className="flex items-center justify-between px-5 py-5 border-b border-stone-100 lg:hidden">
                    <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-stone-800">
                        Filters {activeFilterCount > 0 && <span className="text-rose-500">({activeFilterCount})</span>}
                    </span>
                    <button onClick={onClose} className="text-stone-400 hover:text-stone-700 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <div className="px-5 lg:px-0 py-2 lg:py-0">
                    <div className="hidden lg:flex items-center justify-between mb-4">
                        <span className="text-[11px] tracking-[0.18em] uppercase font-semibold text-stone-700">
                            Filter
                            {activeFilterCount > 0 && (
                                <span className="ml-1.5 text-rose-500">({activeFilterCount})</span>
                            )}
                        </span>
                        {activeFilterCount > 0 && (
                            <button
                                onClick={clearAll}
                                className="text-[10px] tracking-wide text-stone-400 hover:text-stone-700 underline underline-offset-2 transition-colors"
                            >
                                Clear all
                            </button>
                        )}
                    </div>
                    <div className="hidden lg:block mb-1">
                        <AccordionSection title="Sort By" defaultOpen>
                            <div className="flex flex-col gap-1">
                                {SORT_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => onSortChange(opt.value)}
                                        className={`text-left text-xs py-1.5 transition-colors ${sortBy === opt.value
                                            ? "text-stone-900 font-semibold"
                                            : "text-stone-400 hover:text-stone-700"
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </AccordionSection>
                    </div>
                    <AccordionSection title="Category" defaultOpen>
                        <div className="flex flex-col gap-1">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => onFilterChange({ ...filters, categories: cat === "All" ? [] : toggle(filters.categories, cat) })}
                                    className={`text-left text-xs py-1.5 transition-colors flex items-center justify-between group ${(cat === "All" && filters.categories.length === 0) || filters.categories.includes(cat)
                                        ? "text-stone-900 font-semibold"
                                        : "text-stone-400 hover:text-stone-700"
                                        }`}
                                >
                                    {cat}
                                    {filters.categories.includes(cat) && (
                                        <svg className="w-3 h-3 text-stone-900" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </AccordionSection>
                    <AccordionSection title="Price">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    value={filters.priceRange[0]}
                                    onChange={(e) => onFilterChange({ ...filters, priceRange: [+e.target.value, filters.priceRange[1]] })}
                                    placeholder="Min"
                                    className="w-full border border-stone-200 text-xs px-2.5 py-2 text-stone-700 focus:outline-none focus:border-stone-400 transition-colors"
                                />
                                <span className="text-stone-300 text-xs">—</span>
                                <input
                                    type="number"
                                    value={filters.priceRange[1]}
                                    onChange={(e) => onFilterChange({ ...filters, priceRange: [filters.priceRange[0], +e.target.value] })}
                                    placeholder="Max"
                                    className="w-full border border-stone-200 text-xs px-2.5 py-2 text-stone-700 focus:outline-none focus:border-stone-400 transition-colors"
                                />
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {[
                                    { label: "Under ₹999", range: [0, 999] as [number, number] },
                                    { label: "₹1k–₹3k", range: [1000, 3000] as [number, number] },
                                    { label: "₹3k–₹8k", range: [3000, 8000] as [number, number] },
                                    { label: "₹8k+", range: [8000, 50000] as [number, number] },
                                ].map((preset) => (
                                    <button
                                        key={preset.label}
                                        onClick={() => onFilterChange({ ...filters, priceRange: preset.range })}
                                        className={`text-[10px] tracking-wide px-2.5 py-1 border transition-all ${filters.priceRange[0] === preset.range[0] && filters.priceRange[1] === preset.range[1]
                                            ? "border-stone-900 bg-stone-900 text-white"
                                            : "border-stone-200 text-stone-500 hover:border-stone-400"
                                            }`}
                                    >
                                        {preset.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </AccordionSection>
                    <AccordionSection title="Size">
                        <div className="flex flex-wrap gap-1.5">
                            {SIZES.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => onFilterChange({ ...filters, sizes: toggle(filters.sizes, size) })}
                                    className={`w-9 h-9 text-[11px] font-medium border transition-all duration-150 ${filters.sizes.includes(size)
                                        ? "border-stone-900 bg-stone-900 text-white"
                                        : "border-stone-200 text-stone-600 hover:border-stone-400"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </AccordionSection>
                    <AccordionSection title="Color">
                        <div className="flex flex-wrap gap-2.5">
                            {COLOR_OPTIONS.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => onFilterChange({ ...filters, colors: toggle(filters.colors, color.name) })}
                                    title={color.name}
                                    className={`relative w-7 h-7 rounded-full transition-all duration-150 ${filters.colors.includes(color.name)
                                        ? "ring-2 ring-offset-2 ring-stone-700 scale-110"
                                        : "ring-1 ring-stone-200 hover:scale-105"
                                        }`}
                                    style={{ backgroundColor: color.hex }}
                                >
                                    {filters.colors.includes(color.name) && (
                                        <svg
                                            className="absolute inset-0 m-auto w-3 h-3"
                                            style={{ color: color.name === "White" || color.name === "Beige" ? "#333" : "#fff" }}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </AccordionSection>
                    <AccordionSection title="Brand">
                        <div className="flex flex-col gap-1">
                            {BRANDS.map((brand) => (
                                <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={filters.brands.includes(brand)}
                                        onChange={() => onFilterChange({ ...filters, brands: toggle(filters.brands, brand) })}
                                        className="hidden"
                                    />
                                    <span
                                        className={`w-3.5 h-3.5 border flex-shrink-0 flex items-center justify-center transition-all ${filters.brands.includes(brand) ? "bg-stone-900 border-stone-900" : "border-stone-300 group-hover:border-stone-500"
                                            }`}
                                    >
                                        {filters.brands.includes(brand) && (
                                            <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </span>
                                    <span className={`text-xs transition-colors ${filters.brands.includes(brand) ? "text-stone-900 font-medium" : "text-stone-500 group-hover:text-stone-700"}`}>
                                        {brand}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </AccordionSection>
                    <AccordionSection title="Tags">
                        <div className="flex flex-wrap gap-1.5">
                            {TAGS.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => onFilterChange({ ...filters, tags: toggle(filters.tags, tag) })}
                                    className={`text-[10px] tracking-[0.12em] uppercase font-medium px-3 py-1.5 border transition-all ${filters.tags.includes(tag)
                                        ? "border-stone-900 bg-stone-900 text-white"
                                        : "border-stone-200 text-stone-500 hover:border-stone-400 hover:text-stone-700"
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </AccordionSection>
                </div>
                <div className="lg:hidden sticky bottom-0 bg-white border-t border-stone-100 p-4 flex gap-3">
                    <button
                        onClick={clearAll}
                        className="flex-1 border border-stone-300 text-stone-600 text-xs tracking-[0.15em] uppercase font-medium py-3 hover:bg-stone-50 transition-colors"
                    >
                        Clear
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-stone-900 text-white text-xs tracking-[0.15em] uppercase font-medium py-3 hover:bg-stone-800 transition-colors"
                    >
                        View {productCount} Items
                    </button>
                </div>
            </aside>
        </>
    );
}