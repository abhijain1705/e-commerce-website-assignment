import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Product } from "../components/ProductCard";
import { getProductById } from "../apis/getAllProduct";
import { useCart } from "../cart/CartContext";
import { useAuth } from "../auth/AuthContext";

export default function ProductDetailPage() {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedImage, setSelectedImage] = useState(0);
    const [wishlist, setWishlist] = useState(false);
    const [addedToBag, setAddedToBag] = useState(false);
    const [zoom, setZoom] = useState(false);

    const { user } = useAuth();

    const { addToCart, cartItems } = useCart();

    useEffect(() => {
        if (!productId) return;

        async function fetchProduct() {
            setLoading(true);
            const res = await getProductById(productId!);
            if (res.status === "ok") {
                // Ensure images are parsed properly
                let item = res.data;
                if (item.images && item.images.length > 0 && item.images[0].startsWith('["')) {
                    try {
                        item.images = JSON.parse(item.images[0]);
                    } catch (e) { }
                }
                setProduct(item);
                setSelectedImage(0);
            } else {
                setError(res.error);
            }
            setLoading(false);
        }

        fetchProduct();
    }, [productId]);

    useEffect(() => {
        if (product && cartItems.find((item) => item.id === product.id)) {
            setAddedToBag(true);
        }
    }, [cartItems, product]);

    const handleAddToBag = () => {
        if (!user) {
            alert("Please login to add items to cart");
            return;
        }
        if (product) {
            addToCart(product);
        }
        setAddedToBag(true);
        setTimeout(() => setAddedToBag(false), 2200);
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error || !product) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">{error || "Product not found"}</div>;
    }

    return (
        <div data-testid="product-detail" className="min-h-screen bg-white">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-10 pt-5 pb-2">
                <nav className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-stone-400">
                    <Link to="/" className="hover:text-stone-600 transition-colors">Home</Link>
                    <span className="text-stone-200">›</span>
                    <Link to={`/?categorySlug=${product.category?.id}`} className="hover:text-stone-600 transition-colors">
                        {product.category?.name || "Category"}
                    </Link>
                    <span className="text-stone-200">›</span>
                    <span className="text-stone-600 font-medium truncate max-w-[200px]">{product.title}</span>
                </nav>
            </div>

            <main className="max-w-screen-xl mx-auto px-6 lg:px-10 py-8">
                <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-10 xl:gap-16">

                    <div className="flex gap-3">
                        <div className="hidden md:flex flex-col gap-2.5 w-16 flex-shrink-0">
                            {product.images?.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`aspect-[3/4] overflow-hidden border-[1.5px] transition-all duration-200 ${selectedImage === i ? "border-stone-900" : "border-transparent hover:border-stone-300"
                                        }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>

                        <div
                            className="flex-1 relative overflow-hidden bg-stone-50 aspect-[3/4] cursor-zoom-in group"
                            onClick={() => setZoom(!zoom)}
                        >
                            <img
                                src={product.images?.[selectedImage] || "https://via.placeholder.com/600"}
                                alt={product.title}
                                className={`w-full h-full object-cover transition-transform duration-700 ${zoom ? "scale-125" : "scale-100 group-hover:scale-[1.03]"}`}
                            />

                            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <button
                                    className="pointer-events-auto w-8 h-8 bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                                    onClick={(e) => { e.stopPropagation(); setSelectedImage((i) => (i - 1 + (product.images?.length || 1)) % (product.images?.length || 1)); }}
                                >
                                    <svg className="w-3.5 h-3.5 text-stone-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" /></svg>
                                </button>
                                <button
                                    className="pointer-events-auto w-8 h-8 bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                                    onClick={(e) => { e.stopPropagation(); setSelectedImage((i) => (i + 1) % (product.images?.length || 1)); }}
                                >
                                    <svg className="w-3.5 h-3.5 text-stone-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-24 self-start">
                        <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 font-medium mb-1.5">
                            {product.category?.name}
                        </p>
                        <h1
                            className="text-3xl xl:text-4xl font-black text-stone-900 leading-tight mb-3"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            {product.title}
                        </h1>

                        <div data-testid="product-detail" className="flex items-center gap-3 mb-6">
                            <span data-testid="product-price" className="text-2xl font-bold text-stone-900">₹{product.price.toLocaleString()}</span>
                        </div>
                        <div className="flex gap-3 mb-4">
                            <button
                                onClick={handleAddToBag}
                                className={`flex-1 h-12 text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${addedToBag
                                    ? "bg-stone-700 text-white"
                                    : "bg-stone-900 text-white hover:bg-stone-700"
                                    }`}
                            >
                                {addedToBag ? "✓ Added to Bag" : "Add to Bag"}
                            </button>
                            <button
                                onClick={() => setWishlist(!wishlist)}
                                className={`w-12 h-12 border flex items-center justify-center transition-all duration-200 ${wishlist ? "border-rose-300 bg-rose-50" : "border-stone-200 hover:border-stone-400"
                                    }`}
                            >
                                <svg
                                    className={`w-5 h-5 transition-all ${wishlist ? "text-rose-500 fill-rose-500" : "text-stone-500 fill-transparent stroke-stone-500"}`}
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 21C12 21 3.5 15 3.5 9a4.5 4.5 0 018.5-2.08A4.5 4.5 0 0120.5 9c0 6-8.5 12-8.5 12z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <div>
                            <div className="flex border-b border-stone-100 mb-4 mt-8">
                                <button className="text-[10px] tracking-[0.18em] uppercase font-medium pb-3 mr-6 border-b-[1.5px] border-stone-900 text-stone-900">
                                    details
                                </button>
                            </div>

                            <div className="space-y-3">
                                <p className="text-sm text-stone-500 leading-relaxed">{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="md:hidden flex gap-2 overflow-x-auto px-6 pb-6 scrollbar-hide">
                {product.images?.map((img, i) => (
                    <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`w-14 h-14 flex-shrink-0 border-[1.5px] overflow-hidden transition-all ${selectedImage === i ? "border-stone-900" : "border-stone-200"
                            }`}
                    >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-100 p-4 flex gap-3">
                <div className="flex-1">
                    <p className="text-[10px] text-stone-400 truncate">{product.title}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-stone-900">₹{product.price.toLocaleString()}</span>
                    </div>
                </div>
                <button
                    onClick={handleAddToBag}
                    className={`px-6 text-[11px] tracking-[0.18em] uppercase font-semibold transition-all duration-200 ${addedToBag ? "bg-stone-700 text-white" : "bg-stone-900 text-white hover:bg-stone-700"
                        }`}
                >
                    {addedToBag ? "Added ✓" : "Add to Bag"}
                </button>
            </div>
            <div className="lg:hidden h-20" />

        </div>
    );
}