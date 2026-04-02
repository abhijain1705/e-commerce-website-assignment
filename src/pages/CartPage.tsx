import React, { useState } from 'react'
import ProductCard from '../components/ProductCard';
import { GridSize } from './HomePage';
import { useCart } from '../cart/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [gridSize, setGridSize] = useState<GridSize>(3);

    const gridCols: Record<GridSize, string> = {
        2: "grid-cols-2",
        3: "grid-cols-2 md:grid-cols-3",
        4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    };

    const { cartItems, cartCount, cartTotal } = useCart();
    const navigate = useNavigate();

    return (
        <div className='flex flex-col p-6'>
            <div className='flex flex-wrap w-full justify-between items-center'>
                <div className='flex items-center gap-3'>
                    <h3>My Cart ({cartCount})</h3>
                    <p>₹{cartTotal}</p>
                    <button onClick={() => navigate("/checkout")} className='bg-[#000] text-[#fff] py-2 px-3'>Checkout</button>
                </div>
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
            {cartItems.length === 0 ? <div
                className="min-h-screen bg-white flex flex-col justify-center items-center px-6 text-center"
            >
                <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium mb-4">
                    Cart is empty
                </p>

                <h1
                    className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 leading-[1.05] mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    No Item<br />
                    <span className="italic font-normal text-stone-500">
                        available
                    </span><br />
                    to checkout.
                </h1>

                <p className="text-stone-500 text-sm max-w-md leading-relaxed mb-8">
                    Add items to your cart to checkout.
                </p>

                <div className="w-16 h-[1px] bg-stone-200 mb-8" />

                <button
                    onClick={() => window.history.back()}
                    className="border border-stone-300 text-stone-700 text-[11px] tracking-[0.2em] uppercase font-medium px-8 py-3.5 hover:border-stone-600 transition-all"
                >
                    Go Back
                </button>

                <p className="mt-10 text-[10px] tracking-[0.2em] uppercase text-stone-300">
                    Gazet — curated fashion experience
                </p>
            </div> : <div className={`grid ${gridCols[gridSize]} gap-x-4 gap-y-10`}>
                {cartItems.map((product) => (
                    <ProductCard key={product.id} insideCartPage={true} product={product} />
                ))}
            </div>}
        </div>
    )
}

export default CartPage