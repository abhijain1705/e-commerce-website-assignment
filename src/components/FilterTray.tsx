import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterState } from "../pages/HomePage";

interface FilterTrayProps {
    isOpen: boolean;
    onClose: () => void;
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    productCount: number;
    sortBy: string;
    onSortChange: (sort: string) => void;
}

const CATEGORIES = ["All", "electronics", "jewelery", "men's clothing", "women's clothing"];

const SORT_OPTIONS = [
    { value: "asc", label: "Price: Low to High" },
    { value: "desc", label: "Price: High to Low" },
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
                className="flex items-center justify-between w-full py-4"
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
    onFilterChange,
    productCount,
    sortBy,
    onSortChange,
}: FilterTrayProps) {

    const [searchParams, setSearchParams] = useSearchParams();

    const activeFilterCount =
        filters.categories.length +
        (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000 ? 1 : 0);

    function applySorting(value: string) {
        onSortChange(value);

        setSearchParams((prev) => {
            prev.set("sort", value);
            return prev;
        });
    }

    function applyCategory(category: string) {
        const updated =
            category === "All" ? [] : [category];

        onFilterChange({
            ...filters,
            categories: updated,
        });

        setSearchParams((prev) => {
            if (category === "All") prev.delete("categories");
            else prev.set("categories", category);
            return prev;
        });
    }

    function applyPrice(range: [number, number]) {
        onFilterChange({
            ...filters,
            priceRange: range,
        });

        setSearchParams((prev) => {
            prev.set("priceRange", range.join(","));
            return prev;
        });
    }

    function clearAll() {
        onFilterChange({
            categories: [],
            sizes: [],
            priceRange: [0, 50000],
        });

        setSearchParams({});
    }

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/20 z-40 transition ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            />

            <aside
                className={`fixed lg:relative top-0 left-0 h-full w-72 bg-white z-50
                transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                <div className="px-5 py-5 border-b">
                    <span className="text-xs uppercase">
                        Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                    </span>
                </div>

                <div className="px-5">

                    <AccordionSection title="Sort By" defaultOpen>
                        {SORT_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => applySorting(opt.value)}
                                className={`block text-xs py-2 ${sortBy === opt.value ? "font-semibold" : "text-stone-400"}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </AccordionSection>

                    <AccordionSection title="Category" defaultOpen>
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => applyCategory(cat)}
                                className={`block text-xs py-2 ${filters.categories.includes(cat) || (cat === "All" && filters.categories.length === 0)
                                    ? "font-semibold"
                                    : "text-stone-400"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </AccordionSection>

                    <AccordionSection title="Price">
                        <div className="space-y-2">
                            <input
                                type="number"
                                placeholder="Min"
                                value={filters.priceRange[0]}
                                onChange={(e) =>
                                    applyPrice([+e.target.value, filters.priceRange[1]])
                                }
                                className="border px-2 py-1 text-xs w-full"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={filters.priceRange[1]}
                                onChange={(e) =>
                                    applyPrice([filters.priceRange[0], +e.target.value])
                                }
                                className="border px-2 py-1 text-xs w-full"
                            />
                        </div>
                    </AccordionSection>
                </div>

                <div className="p-4 flex gap-2 border-t">
                    <button
                        onClick={clearAll}
                        className="flex-1 border py-2 text-xs"
                    >
                        Clear
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-black text-white py-2 text-xs"
                    >
                        View {productCount}
                    </button>
                </div>
            </aside>
        </>
    );
}