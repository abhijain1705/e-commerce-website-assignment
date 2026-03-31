export default function Footer() {
    const columns = [
        {
            title: "Help",
            links: ["Shipping & Returns", "Size Guide", "Track Order", "Contact Us", "FAQ"],
        },
        {
            title: "Company",
            links: ["About Gazet", "Sustainability", "Careers", "Press", "Affiliates"],
        },
    ];

    return (
        <footer className="bg-stone-900 text-stone-300">
            <div className="border-b border-stone-800">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-10 flex flex-col lg:flex-row items-center justify-start gap-6">
                    <div>
                        <img alt="founder" src='/Image from Abhi Jain.jpeg' className="w-28 h-28 rounded-full" />
                    </div>
                    <div>
                        <p className="text-stone-100 text-sm font-medium tracking-wide mb-1">
                            Meet the founder
                        </p>
                        <p className="text-stone-400 text-xs tracking-wide">
                            Follow me on social media for more updates.
                        </p>

                        <div className="flex gap-3 my-3">
                            {[{
                                platform: "instagram",
                                link: "https://www.instagram.com/abhiinpublic/"
                            },
                            { platform: "twitter", link: "https://x.com/mainabhiihoon" }, {
                                platform: "linkedin", link: "https://www.linkedin.com/in/abhijain03/"
                            }, {
                                platform: "youtube", link: "https://www.youtube.com/@positiveabhii"
                            }].map(({ platform, link }) => (
                                <a
                                    key={platform}
                                    href={link}
                                    target="_blank"
                                    className="w-8 h-8 border border-stone-700 hover:border-stone-400 flex items-center justify-center text-stone-400 hover:text-stone-200 transition-all duration-200 group"
                                >
                                    <span className="text-[10px] uppercase tracking-widest">
                                        {platform === "instagram" && (
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </svg>
                                        )}
                                        {platform === "twitter" && (
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        )}
                                        {platform === "linkedin" && (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
                                            </svg>
                                        )}
                                        {platform === "youtube" && (
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                            </svg>
                                        )}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-14">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                    <div className="col-span-2 lg:col-span-2">
                        <p
                            className="text-stone-100 text-2xl font-black tracking-tight mb-4"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            GAZET
                        </p>
                        <p className="text-stone-400 text-xs leading-relaxed tracking-wide max-w-xs mb-6">
                            Curated fashion for those who define their own style. Quality, sustainability, and design — without compromise.
                        </p>
                    </div>
                    {columns.map((col) => (
                        <div key={col.title}>
                            <p className="text-stone-100 text-[11px] tracking-[0.2em] uppercase font-semibold mb-5">
                                {col.title}
                            </p>
                            <ul className="space-y-3">
                                {col.links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="/work-in-progress"
                                            className="text-stone-400 text-xs tracking-wide hover:text-stone-200 transition-colors duration-200"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="border-t border-stone-800">
                <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-stone-500 text-[11px] tracking-wide">
                        © 2025 Gazet. All rights reserved.
                    </p>
                    <div className="flex gap-5">
                        {["Privacy Policy", "Terms of Use", "Cookie Preferences"].map((item) => (
                            <a key={item} href="#" className="text-stone-500 text-[11px] tracking-wide hover:text-stone-300 transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}