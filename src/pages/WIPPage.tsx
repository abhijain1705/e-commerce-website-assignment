import React from "react";

const WIPPage = () => {
    return (
        <div
            className="min-h-screen bg-white flex flex-col justify-center items-center px-6 text-center"
        >
            <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium mb-4">
                Work in Progress
            </p>

            <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 leading-[1.05] mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
            >
                Something<br />
                <span className="italic font-normal text-stone-500">
                    beautiful
                </span><br />
                is coming.
            </h1>

            <p className="text-stone-500 text-sm max-w-md leading-relaxed mb-8">
                We’re crafting this experience with intention.
                This page is currently under development — check back soon.
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
        </div>
    );
};

export default WIPPage;