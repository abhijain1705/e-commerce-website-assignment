export const getAllProducts = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_PRODUCT_API}/products`);
        const data = await response.json();
        return { status: "ok", data: data, error: null }
    } catch (error: any) {
        return { status: "not-ok", data: null, error: error?.message ?? "Something went wrong" }
    }
}