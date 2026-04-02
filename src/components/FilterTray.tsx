import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterState } from "../pages/HomePage";

interface FilterTrayProps {
    isOpen: boolean;
    onClose: () => void;
    filters: FilterState;
    categories: any[];
    onFilterChange: (filters: FilterState) => void;
    productCount: number;
    sortBy: string;
    onSortChange: (sort: string) => void;
}

const SORT_OPTIONS = [
    { value: "asc", label: "Recommended" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
];

function AccordionSection({
    title,
    children,
    defaultOpen = false,
}: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-stone-100">
            <button
                className="flex items-center justify-between w-full py-4 text-left"
                onClick={() => setOpen(!open)}
            >
                <span className="text-[11px] uppercase text-stone-700 font-semibold">
                    {title}
                </span>
                <span className={`transition ${open ? "rotate-180" : ""}`}>⌄</span>
            </button>

            <div className={`${open ? "max-h-96 pb-4" : "max-h-0"} overflow-hidden transition-all`}>
                {children}
            </div>
        </div>
    );
}

export default function FilterTray({
    isOpen,
    onClose,
    filters,
    categories,
    productCount,
    sortBy,
    onSortChange,
}: FilterTrayProps) {

    const [searchParams, setSearchParams] = useSearchParams();

    const activeFilterCount =
        (filters.categorySlug ? 1 : 0) +
        (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000 ? 1 : 0);

    function applySorting(value: string) {
        onSortChange(value);

        setSearchParams((prev) => {
            if (value === "asc") prev.delete("sort");
            else prev.set("sort", value);
            return prev;
        });
    }

    function applyCategory(categorySlug: string) {
        setSearchParams((prev) => {
            if (!categorySlug) prev.delete("categorySlug");
            else prev.set("categorySlug", categorySlug);
            prev.set("page", "0");
            return prev;
        });
    }

    function applyPrice(range: [number, number]) {
        setSearchParams((prev) => {
            prev.set("priceRange", range.join(","));
            prev.set("page", "0");
            return prev;
        });
    }

    function clearAll() {
        setSearchParams({});
    }

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/20 z-40 transition ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            />

            <aside
                className={`fixed lg:relative top-0 left-0 h-full lg:h-auto w-72 bg-white z-50
                transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                <div className="px-5 py-5 border-b flex justify-between items-center">
                    <span className="text-xs uppercase font-semibold">
                        Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                    </span>
                    <button className="lg:hidden" onClick={onClose}>✕</button>
                </div>

                <div className="px-5 overflow-y-auto max-h-[calc(100vh-140px)] lg:max-h-none">

                    <AccordionSection title="Sort By" defaultOpen>
                        {SORT_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => applySorting(opt.value)}
                                className={`block text-xs py-2 w-full text-left ${sortBy === opt.value ? "font-semibold text-stone-900" : "text-stone-500 hover:text-stone-700"}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </AccordionSection>

                    <AccordionSection title="Category" defaultOpen>
                        <button
                            onClick={() => applyCategory("")}
                            className={`block text-xs py-2 w-full text-left ${!filters.categorySlug ? "font-semibold text-stone-900" : "text-stone-500 hover:text-stone-700"}`}
                        >
                            All Categories
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => applyCategory(String(cat.id))}
                                className={`block text-xs py-2 w-full text-left ${filters.categorySlug === String(cat.id)
                                    ? "font-semibold text-stone-900"
                                    : "text-stone-500 hover:text-stone-700"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </AccordionSection>

                    <AccordionSection title="Price Range">
                        <div className="space-y-4 pt-2">
                            <div>
                                <label className="text-[10px] text-stone-400 uppercase mb-1 block">Min Price</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={filters.priceRange[0]}
                                    onChange={(e) =>
                                        applyPrice([+e.target.value, filters.priceRange[1]])
                                    }
                                    className="border border-stone-200 px-3 py-2 text-xs w-full focus:outline-none focus:border-stone-400"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] text-stone-400 uppercase mb-1 block">Max Price</label>
                                <input
                                    type="number"
                                    placeholder="50000"
                                    value={filters.priceRange[1]}
                                    onChange={(e) =>
                                        applyPrice([filters.priceRange[0], +e.target.value])
                                    }
                                    className="border border-stone-200 px-3 py-2 text-xs w-full focus:outline-none focus:border-stone-400"
                                />
                            </div>
                        </div>
                    </AccordionSection>
                </div>

                <div className="p-4 flex gap-2 border-t mt-auto lg:hidden">
                    <button
                        onClick={clearAll}
                        className="flex-1 border py-3 text-xs font-semibold"
                    >
                        Clear
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-stone-900 text-white py-3 text-xs font-semibold"
                    >
                        View {productCount}
                    </button>
                </div>
            </aside>
        </>
    );
}