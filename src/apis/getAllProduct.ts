// /apis/getAllProduct.ts

const BASE = import.meta.env.VITE_PRODUCT_API;

export const getProducts = async ({
    category,
    sort = "asc",
}: {
    category?: string;
    sort?: "asc" | "desc";
}) => {
    try {
        let url = `${BASE}/products`;

        if (category && category !== "All") {
            url = `${BASE}/products/category/${category}`;
        }

        const params = new URLSearchParams();

        if (sort) params.set("sort", sort);

        const response = await fetch(`${url}?${params.toString()}`);
        const data = await response.json();

        return { status: "ok", data, error: null };
    } catch (error: any) {
        return {
            status: "not-ok",
            data: null,
            error: error?.message ?? "Something went wrong",
        };
    }
};