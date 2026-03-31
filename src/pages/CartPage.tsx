import React, { useState } from 'react'
import ProductCard from '../components/ProductCard';
import { GridSize } from './HomePage';
import { useCart } from '../cart/CartContext';

const CartPage = () => {
    const [gridSize, setGridSize] = useState<GridSize>(3);

    const gridCols: Record<GridSize, string> = {
        2: "grid-cols-2",
        3: "grid-cols-2 md:grid-cols-3",
        4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    };

    const { cartItems, cartCount } = useCart();

    return (
        <div className='flex flex-col p-6'>
            <div className='flex flex-wrap w-full justify-between items-center'>
                <div className='flex items-center gap-3'>
                    <h3>My Cart ({cartCount})</h3>
                    <button className='bg-[#000] text-[#fff] py-2 px-3'>Checkout</button>
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
            <div className={`grid ${gridCols[gridSize]} gap-x-4 gap-y-10`}>
                {cartItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default CartPage