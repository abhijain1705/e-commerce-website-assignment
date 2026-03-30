import { useState } from "react";

type Mode = "login" | "signup" | "forgot";

export default function LoginPage() {
    const [mode, setMode] = useState<Mode>("login");
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
    };

    return (
        <div
            className="min-h-screen flex"
        >

            <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-12 bg-stone-900">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85"
                        alt="editorial"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-stone-900/20" />
                </div>

                <div className="relative z-10">
                    <a href="#">
                        <span
                            className="text-white text-3xl font-black tracking-tight"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            GAZET
                        </span>
                    </a>
                </div>

                <div className="relative z-10">
                    <blockquote
                        className="text-4xl xl:text-5xl font-black text-white leading-[1.1] mb-6"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Style is a
                        <br />
                        <span className="italic font-normal text-stone-300">form of</span>
                        <br />
                        self-expression.
                    </blockquote>
                    <p className="text-stone-400 text-sm tracking-wide">
                        Join thousands of curated fashion lovers.
                    </p>

                    <div className="mt-10 flex gap-8">
                        {[
                            { num: "12K+", label: "Products" },
                            { num: "80K+", label: "Members" },
                            { num: "4.9★", label: "Rating" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-white text-xl font-bold">{stat.num}</p>
                                <p className="text-stone-500 text-[11px] tracking-[0.15em] uppercase mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 xl:px-24 bg-white">
                <div className="lg:hidden mb-10 self-start">
                    <span
                        className="text-stone-900 text-2xl font-black tracking-tight"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        GAZET
                    </span>
                </div>

                <div className="w-full max-w-sm">
                    {mode === "login" && (
                        <div className="animate-in">
                            <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium mb-2">
                                Welcome back
                            </p>
                            <h1
                                className="text-3xl font-black text-stone-900 mb-8 leading-tight"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                Sign in to<br />your account
                            </h1>

                            {/* Social logins */}
                            <div className="flex gap-3 mb-6">
                                {[
                                    {
                                        name: "Google",
                                        icon: (
                                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                        ),
                                    },
                                    {
                                        name: "Apple",
                                        icon: (
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12.017 0C8.396.029 8.025 3.613 8.025 3.613S6.04 3.355 4.67 4.98c-1.37 1.624-.93 4.395-.93 4.395S1.555 10.558 1 13.15c-.556 2.59.186 4.748 1.673 6.126 1.487 1.378 3.282 1.254 3.282 1.254s.557 2.16 2.29 2.967c1.733.806 3.41.218 3.41.218s.558.743 1.673.743c1.116 0 1.673-.743 1.673-.743s1.678.588 3.411-.218c1.733-.807 2.29-2.967 2.29-2.967s1.795.124 3.282-1.254C25.271 17.898 22.999 12 22.999 12S21.61 9.37 20.24 8.77c0 0 .44-2.771-.93-4.395C17.94 2.75 15.954 3.008 15.954 3.008S15.638.03 12.017 0zm-.543 5.77c-.31 1.485-1.34 2.645-2.605 2.645-1.265 0-2.295-1.16-2.605-2.645C6.264 5.77 6.264 5.77 6.264 5.77c1.265 0 2.295 1.16 2.605 2.645.31-1.485 1.34-2.645 2.605-2.645z" />
                                            </svg>
                                        ),
                                    },
                                ].map((provider) => (
                                    <button
                                        key={provider.name}
                                        className="flex-1 flex items-center justify-center gap-2.5 border border-stone-200 py-3 text-xs tracking-wide text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-all duration-200"
                                    >
                                        {provider.icon}
                                        {provider.name}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-px bg-stone-100" />
                                <span className="text-[10px] tracking-[0.15em] uppercase text-stone-300">or</span>
                                <div className="flex-1 h-px bg-stone-100" />
                            </div>

                            <div className="space-y-4">
                                <FormField
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={setEmail}
                                    placeholder="you@example.com"
                                />
                                <div>
                                    <FormField
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={setPassword}
                                        placeholder="••••••••"
                                        suffix={
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="text-stone-400 hover:text-stone-600 transition-colors"
                                            >
                                                {showPassword ? (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                        <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                        <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                            </button>
                                        }
                                    />
                                    <button
                                        onClick={() => setMode("forgot")}
                                        className="mt-1.5 text-[11px] text-stone-400 hover:text-stone-700 underline underline-offset-2 transition-colors float-right"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8">
                                <PrimaryButton onClick={handleSubmit} loading={submitted} label="Sign In" successLabel="Welcome back!" />
                            </div>

                            <p className="mt-6 text-center text-xs text-stone-400">
                                Don't have an account?{" "}
                                <button onClick={() => setMode("signup")} className="text-stone-700 font-medium underline underline-offset-2 hover:text-stone-900 transition-colors">
                                    Create one
                                </button>
                            </p>
                        </div>
                    )}

                    {mode === "signup" && (
                        <div>
                            <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium mb-2">
                                Join Gazet
                            </p>
                            <h1
                                className="text-3xl font-black text-stone-900 mb-8 leading-tight"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                Create your<br />account
                            </h1>

                            <div className="space-y-4">
                                <FormField label="Full Name" type="text" value={name} onChange={setName} placeholder="Your name" />
                                <FormField label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
                                <FormField
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={setPassword}
                                    placeholder="Min. 8 characters"
                                    suffix={
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-stone-400 hover:text-stone-600 transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                                <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    }
                                />
                            </div>

                            {password.length > 0 && (
                                <div className="mt-3">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-0.5 flex-1 transition-all duration-300 ${i <= Math.min(4, Math.floor(password.length / 3))
                                                    ? password.length < 6
                                                        ? "bg-rose-400"
                                                        : password.length < 10
                                                            ? "bg-amber-400"
                                                            : "bg-emerald-400"
                                                    : "bg-stone-100"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-stone-400">
                                        {password.length < 6 ? "Weak" : password.length < 10 ? "Good" : "Strong"} password
                                    </p>
                                </div>
                            )}

                            {/* Terms */}
                            <p className="mt-4 text-[11px] text-stone-400 leading-relaxed">
                                By creating an account, you agree to our{" "}
                                <a href="#" className="text-stone-600 underline underline-offset-2">Terms of Service</a>{" "}
                                and{" "}
                                <a href="#" className="text-stone-600 underline underline-offset-2">Privacy Policy</a>.
                            </p>

                            <div className="mt-6">
                                <PrimaryButton onClick={handleSubmit} loading={submitted} label="Create Account" successLabel="Account created!" />
                            </div>

                            <p className="mt-6 text-center text-xs text-stone-400">
                                Already have an account?{" "}
                                <button onClick={() => setMode("login")} className="text-stone-700 font-medium underline underline-offset-2 hover:text-stone-900 transition-colors">
                                    Sign in
                                </button>
                            </p>
                        </div>
                    )}

                    {mode === "forgot" && (
                        <div>
                            <button
                                onClick={() => setMode("login")}
                                className="flex items-center gap-1.5 text-stone-400 hover:text-stone-700 text-xs tracking-wide mb-8 transition-colors group"
                            >
                                <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Back to sign in
                            </button>

                            <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-medium mb-2">
                                Password reset
                            </p>
                            <h1
                                className="text-3xl font-black text-stone-900 mb-3 leading-tight"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                Forgot your<br />password?
                            </h1>
                            <p className="text-sm text-stone-400 mb-8 leading-relaxed">
                                Enter your email and we'll send you a secure link to reset it.
                            </p>

                            <FormField label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />

                            <div className="mt-6">
                                <PrimaryButton onClick={handleSubmit} loading={submitted} label="Send Reset Link" successLabel="Link sent!" />
                            </div>
                        </div>
                    )}

                    {mode !== "forgot" && (
                        <div className="mt-10 pt-8 border-t border-stone-100">
                            <p className="text-[10px] tracking-[0.2em] uppercase text-stone-300 mb-4">Member perks</p>
                            <div className="space-y-2.5">
                                {[
                                    "Early access to new collections",
                                    "Members-only discounts & offers",
                                    "Free express shipping on orders ₹2,999+",
                                ].map((perk) => (
                                    <div key={perk} className="flex items-start gap-2.5">
                                        <div className="w-4 h-4 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-2.5 h-2.5 text-stone-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="text-xs text-stone-400 leading-snug">{perk}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function FormField({
    label,
    type,
    value,
    onChange,
    placeholder,
    suffix,
}: {
    label: string;
    type: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    suffix?: React.ReactNode;
}) {
    const [focused, setFocused] = useState(false);
    return (
        <div>
            <label className="block text-[10px] tracking-[0.18em] uppercase text-stone-500 font-medium mb-1.5">
                {label}
            </label>
            <div
                className={`flex items-center border transition-all duration-200 ${focused ? "border-stone-700 bg-white" : "border-stone-200 bg-stone-50/50 hover:border-stone-300"
                    }`}
            >
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent px-4 py-3.5 text-sm text-stone-800 placeholder-stone-300 outline-none"
                />
                {suffix && <div className="pr-4">{suffix}</div>}
            </div>
        </div>
    );
}

function PrimaryButton({
    onClick,
    loading,
    label,
    successLabel,
}: {
    onClick: (e: React.MouseEvent) => void;
    loading: boolean;
    label: string;
    successLabel: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full py-4 text-[11px] tracking-[0.25em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${loading ? "bg-stone-700 text-white" : "bg-stone-900 text-white hover:bg-stone-700"
                }`}
        >
            {loading ? (
                <>
                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {successLabel}
                </>
            ) : (
                label
            )}
        </button>
    );
}