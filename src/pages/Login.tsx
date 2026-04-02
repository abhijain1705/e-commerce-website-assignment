import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

type Mode = "login" | "signup" | "forgot";

export default function LoginPage() {
    const [mode, setMode] = useState<Mode>("login");
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const { loginWithEmail, signupWithEmail, forgotPassword } = useAuth();
    const navigate = useNavigate();

    const getErrorMessage = (error: any) => {
        switch (error.code) {
            case "auth/user-not-found":
                return "No account found with this email.";
            case "auth/invalid-credential":
            case "auth/wrong-password":
                return "Incorrect email or password.";
            case "auth/email-already-in-use":
                return "Email is already in use.";
            case "auth/weak-password":
                return "Password is too weak. Min 6 characters.";
            case "auth/invalid-email":
                return "Invalid email address.";
            default:
                return "An unexpected error occurred. Please try again.";
        }
    };

    const handleModeSwitch = (newMode: Mode) => {
        setMode(newMode);
        setErrorMsg(null);
        setSuccessMsg(null);
    };

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        setErrorMsg(null);
        setSuccessMsg(null);
        setSubmitted(true);

        try {
            if (mode === "login") {
                await loginWithEmail(email, password);
                setSuccessMsg("Welcome back!");
                setTimeout(() => navigate("/"), 1000); // 1s delay to show success state
            } else if (mode === "signup") {
                if (password.length < 6) {
                    setErrorMsg("Password is too weak. Min 6 characters.");
                    setSubmitted(false);
                    return;
                }
                await signupWithEmail(name, email, password);
                setSuccessMsg("Account created!");
                setTimeout(() => navigate("/"), 1000);
            } else if (mode === "forgot") {
                await forgotPassword(email);
                setSuccessMsg("Reset link sent!");
                // Keep the success state visible, reset form
                setTimeout(() => {
                    handleModeSwitch("login");
                }, 2000);
            }
        } catch (err: any) {
            setErrorMsg(getErrorMessage(err));
        } finally {
            if (mode === "forgot") {
                setSubmitted(false);
            } else {
                // Keep loading state briefly before redirect
                setTimeout(() => setSubmitted(false), 1000);
            }
        }
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

                            {errorMsg && (
                                <div className="mb-6 p-3 bg-rose-50 border border-rose-100 text-rose-600 text-[11px] tracking-wide font-medium rounded-sm">
                                    {errorMsg}
                                </div>
                            )}

                            {successMsg && (
                                <div className="mb-6 p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[11px] tracking-wide font-medium rounded-sm">
                                    {successMsg}
                                </div>
                            )}

                            <div className="space-y-4">
                                <FormField
                                    label="Email Address" dataTestid="email"
                                    type="email"
                                    value={email}
                                    onChange={setEmail}
                                    placeholder="you@example.com"
                                />
                                <div>
                                    <FormField dataTestid="password"
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
                                <PrimaryButton dataTestid="login-submit" onClick={handleSubmit} loading={submitted} label="Sign In" successLabel="Welcome back!" />
                            </div>

                            <p className="mt-6 text-center text-xs text-stone-400">
                                Don't have an account?{" "}
                                <button onClick={() => handleModeSwitch("signup")} className="text-stone-700 font-medium underline underline-offset-2 hover:text-stone-900 transition-colors">
                                    Sign In
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

                            {errorMsg && (
                                <div className="mb-6 p-3 bg-rose-50 border border-rose-100 text-rose-600 text-[11px] tracking-wide font-medium rounded-sm">
                                    {errorMsg}
                                </div>
                            )}

                            {successMsg && (
                                <div className="mb-6 p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[11px] tracking-wide font-medium rounded-sm">
                                    {successMsg}
                                </div>
                            )}

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
                                <button onClick={() => handleModeSwitch("login")} className="text-stone-700 font-medium underline underline-offset-2 hover:text-stone-900 transition-colors">
                                    Sign Up
                                </button>
                            </p>
                        </div>
                    )}

                    {mode === "forgot" && (
                        <div>
                            <button
                                onClick={() => handleModeSwitch("login")}
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

                            {errorMsg && (
                                <div className="mb-6 p-3 bg-rose-50 border border-rose-100 text-rose-600 text-[11px] tracking-wide font-medium rounded-sm">
                                    {errorMsg}
                                </div>
                            )}

                            {successMsg && (
                                <div className="mb-6 p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[11px] tracking-wide font-medium rounded-sm">
                                    {successMsg}
                                </div>
                            )}

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
    dataTestid,
    value,
    onChange,
    placeholder,
    suffix,
}: {
    label: string;
    type: string;
    value: string;
    dataTestid?: string;
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
                    type={type} data-testid={dataTestid}
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
    dataTestid,
    label,
    successLabel,
}: {
    onClick: (e: React.MouseEvent) => void;
    loading: boolean;
    dataTestid?: string;
    label: string;
    successLabel: string;
}) {
    return (
        <button data-testid={dataTestid}
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