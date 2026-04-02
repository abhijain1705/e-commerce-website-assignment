const BASE = import.meta.env.VITE_PRODUCT_API;

export interface GetProductsParams {
    title?: string;
    price_min?: number;
    price_max?: number;
    categoryId?: number;
    categorySlug?: string;
    offset?: number;
    limit?: number;
}

export const getProducts = async (params: GetProductsParams = {}) => {
    try {
        const urlParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
                urlParams.append(key, String(value));
            }
        });

        const qs = urlParams.toString();
        const url = `${BASE}/products${qs ? `?${qs}` : ''}`;

        const response = await fetch(url);
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

export const getCategories = async () => {
    try {
        const response = await fetch(`${BASE}/categories`);
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

export const getProductById = async (id: string | number) => {
    try {
        const response = await fetch(`${BASE}/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
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