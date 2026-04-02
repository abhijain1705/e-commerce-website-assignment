import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCart } from "../cart/CartContext";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const { cartCount } = useCart();

    function goToCart() {
        navigate("/mycart")
    }

    return (
        <>
            <div className="bg-stone-900 text-stone-100 text-xs tracking-[0.2em] text-center py-2.5 font-light uppercase">
                Free shipping on orders above ₹2,999 &nbsp;·&nbsp; New arrivals every Friday
            </div>

            <header
                className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_#e7e5e4]"
                    : "bg-white"
                    }`}
            >
                <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        <div className="flex-1 lg:flex-none flex justify-start lg:justify-center">
                            <a href="/" className="group">
                                <span
                                    className="text-2xl lg:text-3xl font-black tracking-[-0.04em] text-stone-900 select-none"
                                    style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.03em" }}
                                >
                                    GAZET
                                </span>
                            </a>
                        </div>
                        <div className="flex items-center gap-4 lg:gap-5 ml-auto lg:ml-0">


                            {user ? (
                                <div className="hidden lg:flex items-center gap-3">
                                    <span className="text-[11px] tracking-wide text-stone-500 font-medium max-w-[120px] truncate">
                                        {user.name || user.email}
                                    </span>
                                    <button
                                        onClick={() => logout()}
                                        className="text-[10px] tracking-[0.1em] uppercase text-stone-500 hover:text-stone-900 font-bold transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" data-testid="login-button" className="hidden lg:block text-stone-500 hover:text-stone-900 transition-colors duration-200 p-1">
                                    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <circle cx="12" cy="8" r="3.5" />
                                        <path d="M4.5 20.5c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5" strokeLinecap="round" />
                                    </svg>
                                </Link>
                            )}
                            <button data-testid="cart-button" onClick={goToCart} className="relative text-stone-500 hover:text-stone-900 transition-colors duration-200 p-1">
                                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 6h18M16 10a4 4 0 01-8 0" strokeLinecap="round" />
                                </svg>
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-stone-900 text-white rounded-full text-[9px] flex items-center justify-center font-bold">{cartCount}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}