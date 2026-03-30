import { useState, useEffect } from "react";

const navLinks = ["New In", "Women", "Men", "Accessories", "Sale"];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

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
                        <nav className="hidden lg:flex items-center gap-8">
                            {navLinks.slice(0, 3).map((link) => (
                                <a
                                    key={link}
                                    href="#"
                                    className="text-[11px] tracking-[0.18em] uppercase text-stone-500 hover:text-stone-900 transition-colors duration-200 font-medium relative group"
                                >
                                    {link}
                                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-stone-900 transition-all duration-300 group-hover:w-full" />
                                </a>
                            ))}
                        </nav>
                        <div className="flex-1 lg:flex-none flex justify-start lg:justify-center">
                            <a href="#" className="group">
                                <span
                                    className="text-2xl lg:text-3xl font-black tracking-[-0.04em] text-stone-900 select-none"
                                    style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.03em" }}
                                >
                                    GAZET
                                </span>
                            </a>
                        </div>
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.slice(3).map((link) => (
                                <a
                                    key={link}
                                    href="#"
                                    className={`text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 font-medium relative group ${link === "Sale" ? "text-rose-600 hover:text-rose-700" : "text-stone-500 hover:text-stone-900"
                                        }`}
                                >
                                    {link}
                                    <span className={`absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${link === "Sale" ? "bg-rose-600" : "bg-stone-900"}`} />
                                </a>
                            ))}
                        </div>
                        <div className="flex items-center gap-4 lg:gap-5 ml-auto lg:ml-0">
                            <button className="text-stone-500 hover:text-stone-900 transition-colors duration-200 p-1">
                                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <circle cx="11" cy="11" r="7.5" />
                                    <path d="M17 17l3.5 3.5" strokeLinecap="round" />
                                </svg>
                            </button>
                            <button className="hidden lg:block text-stone-500 hover:text-stone-900 transition-colors duration-200 p-1">
                                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <circle cx="12" cy="8" r="3.5" />
                                    <path d="M4.5 20.5c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5" strokeLinecap="round" />
                                </svg>
                            </button>
                            <button className="hidden lg:block text-stone-500 hover:text-stone-900 transition-colors duration-200 p-1">
                                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path d="M12 21C12 21 3.5 15 3.5 9a4.5 4.5 0 018.5-2.08A4.5 4.5 0 0120.5 9c0 6-8.5 12-8.5 12z" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button className="relative text-stone-500 hover:text-stone-900 transition-colors duration-200 p-1">
                                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M3 6h18M16 10a4 4 0 01-8 0" strokeLinecap="round" />
                                </svg>
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-stone-900 text-white rounded-full text-[9px] flex items-center justify-center font-bold">3</span>
                            </button>
                            <button
                                className="lg:hidden text-stone-500 hover:text-stone-900 transition-colors p-1"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                    {menuOpen ? (
                                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
                                    ) : (
                                        <>
                                            <path d="M4 6h16M4 12h16M4 18h10" strokeLinecap="round" />
                                        </>
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${menuOpen ? "max-h-80 border-t border-stone-100" : "max-h-0"
                        }`}
                >
                    <nav className="px-6 py-4 flex flex-col gap-4 bg-white">
                        {navLinks.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className={`text-[11px] tracking-[0.2em] uppercase font-medium ${link === "Sale" ? "text-rose-600" : "text-stone-600"
                                    }`}
                            >
                                {link}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>
        </>
    );
}