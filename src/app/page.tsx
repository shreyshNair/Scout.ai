"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
    Sparkles, ArrowRight, Building2, TrendingUp, Zap, Shield,
    Globe, ChevronRight, Check, Star, BarChart3, Search, Bell,
    X, Eye, EyeOff, Mail, Lock, AlertCircle, Sun, Moon,
} from "lucide-react";

// ── Section IDs ────────────────────────────────────────────────────────────────
const SECTIONS = ["features", "pricing", "customers"] as const;

function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── Framer variants ────────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, ease, delay: i * 0.08 } }),
};
const stagger = { show: { transition: { staggerChildren: 0.07 } } };

// ── Auth helpers ────────────────────────────────────────────────────────────────
const AUTH_KEY = "scout_authed";
export function isAuthed() { return typeof window !== "undefined" && localStorage.getItem(AUTH_KEY) === "true"; }
export function signIn()  { localStorage.setItem(AUTH_KEY, "true"); }
export function signOut() { localStorage.removeItem(AUTH_KEY); }

// ── Theme toggle button ────────────────────────────────────────────────────────
function ThemeToggle({ muted = false }: { muted?: boolean }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => setMounted(true), []);
    if (!mounted) return <div className="h-8 w-8" />;
    const isDark = theme === "dark";
    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
            className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                muted
                    ? "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    : "text-white/70 hover:text-white hover:bg-white/10"
            }`}>
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
    );
}

// ── Auth Modal ─────────────────────────────────────────────────────────────────
function AuthModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
    const [mode, setMode] = React.useState<"signin" | "signup">("signin");
    const [email, setEmail]       = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPw, setShowPw]     = React.useState(false);
    const [error, setError]       = React.useState("");
    const [loading, setLoading]   = React.useState(false);

    const validate = () => {
        if (!email.includes("@")) return "Enter a valid email address.";
        if (password.length < 6)  return "Password must be at least 6 characters.";
        return "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const err = validate();
        if (err) { setError(err); return; }
        setLoading(true); setError("");
        await new Promise(r => setTimeout(r, 850));
        signIn(); setLoading(false); onSuccess();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-lg"
            onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.93, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.93, y: 8 }}
                transition={{ duration: 0.32, ease }}
                className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">

                {/* Header — teal-green gradient */}
                <div className="px-8 pt-8 pb-6 bg-gradient-to-br from-teal-600 via-emerald-600 to-teal-700 text-white relative">
                    <button onClick={onClose}
                        className="absolute top-4 right-4 h-8 w-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                    <div className="h-10 w-10 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight">
                        {mode === "signin" ? "Welcome back" : "Create account"}
                    </h2>
                    <p className="text-teal-100 text-sm mt-1">
                        {mode === "signin" ? "Sign in to access your pipeline" : "Start your 14-day free trial"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
                    {error && (
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4 shrink-0" />{error}
                        </div>
                    )}
                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                placeholder="you@fund.com" required
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" />
                        </div>
                    </div>
                    {/* Password */}
                    <div className="space-y-1">
                        <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••" required
                                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all" />
                            <button type="button" onClick={() => setShowPw(v => !v)}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {mode === "signin" && (
                            <button type="button" className="text-xs text-teal-600 dark:text-teal-400 hover:underline mt-1 block text-right">Forgot password?</button>
                        )}
                    </div>

                    <button type="submit" disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-black text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-teal-500/25">
                        {loading
                            ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            : <>{mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="w-4 h-4" /></>}
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800" /></div>
                        <div className="relative flex justify-center text-xs text-slate-400"><span className="bg-white dark:bg-slate-900 px-3">or</span></div>
                    </div>

                    <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                        {mode === "signin" ? "New to Scout.ai? " : "Already have an account? "}
                        <button type="button"
                            onClick={() => { setMode(m => m === "signin" ? "signup" : "signin"); setError(""); }}
                            className="text-teal-600 dark:text-teal-400 font-bold hover:underline">
                            {mode === "signin" ? "Create account" : "Sign in"}
                        </button>
                    </p>
                </form>
            </motion.div>
        </motion.div>
    );
}

// ── Smart Navbar ────────────────────────────────────────────────────────────────
// Centered pill · glassmorph · hides on scroll-down, shows on scroll-up
function Navbar({ onAuthClick }: { onAuthClick: () => void }) {
    const [visible, setVisible] = React.useState(true);
    const [scrolled, setScrolled] = React.useState(false);
    const lastY = React.useRef(0);

    React.useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 24);
            if (y > lastY.current + 8)       setVisible(false);
            else if (y < lastY.current - 4)  setVisible(true);
            lastY.current = y;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.div
            animate={{ y: visible ? 0 : -88, opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.32, ease }}
            className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
            <nav className={`pointer-events-auto flex items-center gap-5 px-5 py-2.5 rounded-full border transition-all duration-300 ${
                scrolled
                    ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-slate-200/80 dark:border-slate-700/80 shadow-xl shadow-slate-200/40 dark:shadow-black/50"
                    : "bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border-slate-200/60 dark:border-slate-700/40 shadow-lg shadow-slate-100/60 dark:shadow-black/30"
            }`}>

                {/* Logo */}
                <div className="flex items-center gap-2 shrink-0">
                    <div className="h-7 w-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/30">
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
                        Scout.ai
                    </span>
                </div>

                {/* Nav links */}
                <div className="hidden md:flex items-center gap-0.5">
                    {SECTIONS.map(s => (
                        <button key={s} onClick={() => scrollTo(s)}
                            className="px-3 py-1.5 rounded-full text-sm font-semibold transition-colors capitalize text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                            {s}
                        </button>
                    ))}
                </div>

                {/* Theme toggle + CTAs */}
                <div className="flex items-center gap-2 shrink-0">
                    {/* Theme toggle — muted because navbar bg is always light glass */}
                    <ThemeToggle muted={true} />

                    <button onClick={onAuthClick}
                        className="text-sm font-bold px-3 py-1.5 rounded-full transition-colors hidden sm:block text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800">
                        Sign in
                    </button>
                    <button onClick={onAuthClick}
                        className="group flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0">
                        Get started
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </nav>
        </motion.div>
    );
}

// ── Infinite marquee logos ──────────────────────────────────────────────────────
const LOGOS = ["a16z", "Sequoia Capital", "Y Combinator", "Lightspeed", "Accel", "Founders Fund", "Index Ventures", "Benchmark", "GV", "Tiger Global", "General Catalyst", "Bessemer"];

function LogoMarquee() {
    const doubled = [...LOGOS, ...LOGOS];
    return (
        <div className="overflow-hidden w-full select-none">
            <div className="animate-marquee gap-0 py-2">
                {doubled.map((l, i) => (
                    <span key={i}
                        className="text-2xl font-black text-slate-300 dark:text-slate-600 hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-default whitespace-nowrap shrink-0 px-10">
                        {l}
                    </span>
                ))}
            </div>
        </div>
    );
}

// ── Feature card ────────────────────────────────────────────────────────────────
function FeatureCard({ icon: Icon, title, desc, color, i, onAuth }: {
    icon: React.ElementType; title: string; desc: string; color: string; i: number; onAuth: () => void;
}) {
    return (
        <motion.div variants={fadeUp} custom={i}
            className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-7 hover:shadow-xl hover:shadow-slate-100/80 dark:hover:shadow-teal-900/10 hover:-translate-y-1.5 transition-all duration-300">
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-5 ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">{title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">{desc}</p>
            <button onClick={onAuth}
                className="flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 opacity-0 group-hover:opacity-100 transition-all group-hover:gap-2">
                Try it free <ChevronRight className="w-3 h-3" />
            </button>
        </motion.div>
    );
}

// ── Pricing card ────────────────────────────────────────────────────────────────
function PricingCard({ plan, price, period, features, highlight, cta, i, onAuth }: {
    plan: string; price: string; period: string; features: string[];
    highlight: boolean; cta: string; i: number; onAuth: () => void;
}) {
    return (
        <motion.div variants={fadeUp} custom={i}
            className={`relative rounded-3xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                highlight
                    ? "bg-slate-900 dark:bg-slate-800 text-white shadow-xl shadow-slate-900/25 dark:shadow-black/40"
                    : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
            }`}>
            {highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-[11px] font-black px-4 py-1.5 rounded-full shadow-lg shadow-teal-500/30 whitespace-nowrap">
                    ✦ Most Popular
                </div>
            )}
            <div>
                <p className={`text-[11px] font-black uppercase tracking-widest mb-3 ${highlight ? "text-teal-400" : "text-slate-400"}`}>{plan}</p>
                <div className="flex items-end gap-1">
                    <span className="text-5xl font-black tracking-tighter">{price}</span>
                    <span className={`text-sm mb-2 ${highlight ? "text-slate-400" : "text-slate-400"}`}>/ {period}</span>
                </div>
            </div>
            <ul className="space-y-3 flex-1">
                {features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                        <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${highlight ? "bg-teal-500/20" : "bg-teal-50 dark:bg-teal-500/10"}`}>
                            <Check className={`w-3 h-3 ${highlight ? "text-teal-400" : "text-teal-600 dark:text-teal-400"}`} />
                        </div>
                        <span className={highlight ? "text-slate-300" : "text-slate-600 dark:text-slate-300"}>{f}</span>
                    </li>
                ))}
            </ul>
            <button onClick={onAuth}
                className={`w-full py-3.5 rounded-2xl text-sm font-black text-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                    highlight
                        ? "bg-teal-500 text-white hover:bg-teal-400 shadow-lg shadow-teal-500/30"
                        : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"
                }`}>
                {cta}
            </button>
        </motion.div>
    );
}

// ── Mock dashboard card ─────────────────────────────────────────────────────────
function MockDashCard() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/60 dark:border-slate-700 overflow-hidden w-full max-w-sm">
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-[10px] text-slate-400 font-mono">scout.ai · dashboard</span>
            </div>
            <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Pipeline Velocity</p>
                        <p className="text-3xl font-black text-slate-900 dark:text-white mt-0.5">78<span className="text-base text-slate-400">%</span></p>
                    </div>
                    <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">+12% ↑</span>
                </div>
                {[
                    { name: "Mistral AI",  stage: "Series B", score: 96, hex: "#2563eb" },
                    { name: "ElevenLabs", stage: "Series B", score: 94, hex: "#1d4ed8" },
                    { name: "Runway",      stage: "Series C", score: 97, hex: "#3b82f6" },
                ].map(c => (
                    <div key={c.name} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50/60 dark:hover:bg-blue-900/20 transition-colors cursor-pointer group">
                        <div className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: c.hex + "22" }}>
                            <span className="text-[9px] font-black" style={{ color: c.hex }}>{c.name.slice(0, 2).toUpperCase()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{c.name}</p>
                            <p className="text-[10px] text-slate-400">{c.stage}</p>
                        </div>
                        <span className="text-xs font-black" style={{ color: c.hex }}>{c.score}</span>
                    </div>
                ))}
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] text-slate-400 font-semibold">Weekly target</span>
                        <span className="text-[10px] font-black text-blue-600 dark:text-blue-400">78%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400" style={{ width: "78%" }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function LandingPage() {
    const router = useRouter();
    const [showAuth, setShowAuth] = React.useState(false);
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -32]);

    React.useEffect(() => {
        if (isAuthed()) router.replace("/dashboard");
    }, [router]);

    const openAuth    = React.useCallback(() => setShowAuth(true), []);
    const handleSuccess = React.useCallback(() => { setShowAuth(false); router.push("/dashboard"); }, [router]);

    const features = [
        { icon: Search,    title: "Smart Company Search",   desc: "Filter 20,000+ startups by stage, sector, geography, and growth signals in milliseconds.",             color: "bg-blue-600",    i: 0 },
        { icon: Zap,       title: "AI-Powered Enrichment",  desc: "One click pulls funding rounds, key hires, press signals, and a thesis-fit score instantly.",          color: "bg-blue-700",    i: 1 },
        { icon: BarChart3, title: "Pipeline Intelligence",  desc: "Track every deal through your funnel with tasks, reminders, and real-time velocity metrics.",           color: "bg-indigo-600",  i: 2 },
        { icon: Bell,      title: "Live Signal Alerts",     desc: "Get notified instantly when a portfolio company raises, hires a key exec, or hits the news.",           color: "bg-slate-700",   i: 3 },
        { icon: Shield,    title: "Secure & Compliant",     desc: "SOC 2 Type II certified. Your deal flow data stays private, encrypted, and fully in your control.",    color: "bg-blue-800",    i: 4 },
        { icon: Globe,     title: "Global Coverage",        desc: "US, EU, and APAC coverage — plus custom import from Salesforce, HubSpot, or CSV in one click.",       color: "bg-indigo-700",  i: 5 },
    ];

    const plans = [
        { plan: "Starter",    price: "$0",    period: "month", highlight: false, cta: "Start free",       i: 0,
          features: ["Up to 50 companies", "Basic AI signals", "1 analyst seat", "CSV export", "Community support"] },
        { plan: "Pro",        price: "$79",   period: "month", highlight: true,  cta: "Start Pro trial",  i: 1,
          features: ["Unlimited companies", "Full AI enrichment", "5 analyst seats", "Pipeline board + tasks", "Priority support", "REST API access"] },
        { plan: "Enterprise", price: "Custom", period: "year", highlight: false, cta: "Contact sales",    i: 2,
          features: ["Unlimited everything", "Custom integrations", "Dedicated CSM", "SSO & SCIM", "99.9% SLA", "White-label option"] },
    ];

    return (
        <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen overflow-x-hidden">

            <AnimatePresence>
                {showAuth && <AuthModal onClose={() => setShowAuth(false)} onSuccess={handleSuccess} />}
            </AnimatePresence>

            <Navbar onAuthClick={openAuth} />

            {/* ── HERO ──────────────────────────────────────────────────────── */}
            {/* Light mode: soft white + green gradient blobs (CatalyzeAI-inspired) */}
            {/* Dark mode: dark slate with teal accents */}
            <section aria-label="Hero" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">

                {/* Background canvas */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

                {/* Blob accents */}
                <div className="absolute -top-24 -left-32 h-[520px] w-[520px] rounded-full bg-blue-100/50 dark:bg-blue-900/15 blur-[100px] pointer-events-none" />
                <div className="absolute top-10 right-0 h-[420px] w-[420px] rounded-full bg-indigo-100/40 dark:bg-indigo-900/10 blur-[90px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/3 h-[300px] w-[500px] rounded-full bg-blue-50/40 dark:bg-blue-950/30 blur-[80px] pointer-events-none" />

                {/* Subtle dot grid */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
                    style={{ backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

                <motion.div style={{ y: heroY }}
                    className="relative container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-14 items-center">

                    {/* Left */}
                    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">
                        <motion.div variants={fadeUp} custom={0}
                            className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full px-4 py-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
                            <Star className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
                            Trusted by 200+ VC analysts worldwide
                        </motion.div>

                        <motion.h1 variants={fadeUp} custom={1}
                            className="text-5xl md:text-6xl lg:text-[4.25rem] font-black leading-[1.04] tracking-tight text-slate-900 dark:text-white">
                            VC intelligence,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-400">
                                supercharged.
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeUp} custom={2}
                            className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
                            Scout.ai gives venture teams a unified platform to discover, evaluate, and track the most
                            promising startups — powered by real-time signals and AI enrichment.
                        </motion.p>

                        <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3">
                            <button onClick={openAuth}
                                className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm px-7 py-3.5 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                                Start for free
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                            <button onClick={() => scrollTo("features")}
                                className="flex items-center gap-2 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm px-7 py-3.5 rounded-full hover:border-blue-400 dark:hover:border-blue-600 hover:text-blue-700 dark:hover:text-blue-400 transition-all duration-200">
                                See how it works
                            </button>
                        </motion.div>

                        <motion.div variants={fadeUp} custom={4}
                            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400 dark:text-slate-500">
                            {["No credit card required", "14-day free trial", "Cancel anytime"].map(t => (
                                <span key={t} className="flex items-center gap-1.5">
                                    <Check className="w-3.5 h-3.5 text-blue-500 shrink-0" />{t}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right: floating mock UI */}
                    <motion.div
                        initial={{ opacity: 0, x: 48 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.85, ease, delay: 0.25 }}
                        className="relative flex justify-center lg:justify-end">

                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
                            <MockDashCard />
                        </motion.div>

                        {/* Signal badge */}
                        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                            className="absolute -left-8 top-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-slate-100 dark:border-slate-700">
                            <div className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">New signal</p>
                                <p className="text-xs font-black text-slate-900 dark:text-white">Runway raised $141M</p>
                            </div>
                        </motion.div>

                        {/* AI score badge */}
                        <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                            className="absolute -right-4 bottom-10 bg-slate-900 dark:bg-blue-900/80 border border-slate-800 dark:border-blue-700 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <div>
                                <p className="text-[9px] text-slate-400 dark:text-blue-300 font-semibold uppercase tracking-wider">AI Score</p>
                                <p className="text-sm font-black text-white">97 · Strong Buy</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Wave → white section */}
                <div className="absolute bottom-0 inset-x-0">
                    <svg viewBox="0 0 1440 48" className="w-full" preserveAspectRatio="none">
                        <path d="M0,24 C480,48 960,0 1440,24 L1440,48 L0,48 Z"
                            className="fill-slate-50 dark:fill-slate-900" />
                    </svg>
                </div>
            </section>

            {/* ── LOGOS MARQUEE ──────────────────────────────────────────────── */}
            <section className="py-20 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
                <p className="text-center text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.25em] mb-10">
                    Analysts at leading funds use Scout.ai
                </p>
                <LogoMarquee />
            </section>

            {/* ── FEATURES ───────────────────────────────────────────────────── */}
            <section id="features" className="py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
                <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
                    className="text-center mb-16">
                    <motion.p variants={fadeUp} className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Core Features</motion.p>
                    <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
                        Everything your fund needs
                    </motion.h2>
                    <motion.p variants={fadeUp} custom={2} className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg">
                        From deal sourcing to portfolio tracking — one platform, zero spreadsheet chaos.
                    </motion.p>
                </motion.div>

                <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map(f => <FeatureCard key={f.title} {...f} onAuth={openAuth} />)}
                </motion.div>
            </section>

            {/* ── STATS BAND ─────────────────────────────────────────────────── */}
            <section className="py-24 relative overflow-hidden">
                {/* Dark navy background with subtle teal overlay */}
                <div className="absolute inset-0 bg-slate-900 dark:bg-slate-950" />
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "radial-gradient(ellipse 70% 80% at 20% 50%, #2563eb 0%, transparent 60%)" }} />
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: "radial-gradient(circle, #60a5fa 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

                <div className="relative max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-8 text-center text-white">
                    {[
                        { num: "20K+", label: "Startups in database",     sub: "Updated daily" },
                        { num: "2.4M", label: "Funding signals tracked",  sub: "Across 8 data sources" },
                        { num: "97%",  label: "Analyst satisfaction",     sub: "Across 200+ teams" },
                    ].map((s, i) => (
                        <motion.div key={s.label} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
                            <p className="text-6xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-300">{s.num}</p>
                            <p className="text-slate-200 font-bold text-base mb-1">{s.label}</p>
                            <p className="text-slate-500 text-sm">{s.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── PRICING ────────────────────────────────────────────────────── */}
            <section id="pricing" className="py-28 px-6 md:px-12 max-w-6xl mx-auto scroll-mt-20">
                <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
                    className="text-center mb-16">
                    <motion.p variants={fadeUp} className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Pricing</motion.p>
                    <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
                        Simple, transparent pricing
                    </motion.h2>
                    <motion.p variants={fadeUp} custom={2} className="text-slate-500 dark:text-slate-400 text-lg">
                        Start free. Scale as your fund grows.
                    </motion.p>
                </motion.div>

                <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
                    className="grid md:grid-cols-3 gap-6 items-start pt-4">
                    {plans.map(p => <PricingCard key={p.plan} {...p} onAuth={openAuth} />)}
                </motion.div>
            </section>

            {/* ── CUSTOMERS / TESTIMONIALS ───────────────────────────────────── */}
            <section id="customers" className="py-28 px-6 md:px-12 max-w-6xl mx-auto scroll-mt-20 bg-white dark:bg-transparent">
                <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
                    className="text-center mb-16">
                    <motion.p variants={fadeUp} className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Testimonials</motion.p>
                    <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
                        Loved by analysts
                    </motion.h2>
                </motion.div>

                <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-5">
                    {[
                        { quote: "Scout.ai cut our deal-sourcing time in half. The AI enrichment is genuinely impressive — it surfaces things we'd miss in a normal diligence pass.", author: "Sarah K.", role: "Partner, Lightspeed" },
                        { quote: "I replaced three separate tools with Scout.ai. The pipeline board alone is worth the subscription — our team actually uses it every single day.", author: "Raj M.", role: "VP, a16z" },
                        { quote: "The sector signal alerts are gold. We got a heads-up on a round 3 days before TechCrunch reported it. That kind of edge matters enormously.", author: "Priya L.", role: "Analyst, Sequoia" },
                    ].map((t, i) => (
                        <motion.div key={t.author} variants={fadeUp} custom={i}
                            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-7 hover:shadow-lg hover:shadow-blue-50 dark:hover:shadow-blue-900/20 transition-all duration-300 hover:-translate-y-1">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />)}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shrink-0">
                                    <span className="text-xs font-black text-white">{t.author[0]}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{t.author}</p>
                                    <p className="text-xs text-slate-400">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ── CTA BANNER ─────────────────────────────────────────────────── */}
            <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-slate-900/50">
                <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center bg-slate-900 dark:bg-slate-800 rounded-3xl p-14 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden">
                    {/* Blue glow */}
                    <div className="absolute inset-0 opacity-15"
                        style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 80% 20%, #2563eb 0%, transparent 50%)" }} />
                    <div className="absolute inset-0 opacity-[0.05]"
                        style={{ backgroundImage: "radial-gradient(circle, #60a5fa 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                    <div className="relative">
                        <div className="h-14 w-14 mx-auto mb-6 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                            <Sparkles className="w-7 h-7 text-blue-400" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tight mb-4">Ready to find your next unicorn?</h2>
                        <p className="text-slate-400 mb-8 text-lg">Join 200+ VC teams using Scout.ai to discover the startups that matter.</p>
                        <button onClick={openAuth}
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-full shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                            Launch Scout.ai free
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <p className="text-slate-600 dark:text-slate-500 text-sm mt-4">No credit card · 14-day trial · Cancel anytime</p>
                    </div>
                </motion.div>
            </section>

            {/* ── FOOTER ─────────────────────────────────────────────────────── */}
            <footer className="border-t border-slate-100 dark:border-slate-800 py-10 px-6 md:px-12 bg-white dark:bg-slate-950">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm shadow-blue-500/30">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="font-black text-slate-900 dark:text-white">Scout.ai</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400 dark:text-slate-500">
                        {["Privacy", "Terms", "Security", "Status", "Blog"].map(l => (
                            <button key={l} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{l}</button>
                        ))}
                    </div>
                    <p className="text-xs text-slate-400">© 2026 Scout.ai. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
