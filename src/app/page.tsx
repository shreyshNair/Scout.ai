"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Sparkles, ArrowRight, Building2, TrendingUp, Zap, Shield,
  Globe, ChevronRight, Check, Star, BarChart3, Search, Bell,
  X, Eye, EyeOff, Mail, Lock, AlertCircle, Sun, Moon, User, Menu,
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
export function signIn() { localStorage.setItem(AUTH_KEY, "true"); }
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
      className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 ${muted
          ? "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          : "text-white/70 hover:text-white hover:bg-white/10"
        }`}>
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}

// ── Auth Modal ─────────────────────────────────────────────────────────────────
function AuthModal({ onClose, onSuccess, defaultMode = "signup" }: {
  onClose: () => void; onSuccess: () => void; defaultMode?: "signin" | "signup";
}) {
  const [mode, setMode] = React.useState<"signin" | "signup">(defaultMode);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPw, setShowPw] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const validate = () => {
    if (mode === "signup" && name.trim().length < 2) return "Please enter your full name.";
    if (!email.includes("@")) return "Enter a valid email address.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true); setError("");
    await new Promise(r => setTimeout(r, 850));
    if (mode === "signup" && name.trim()) {
      try {
        const existing = JSON.parse(localStorage.getItem("scout_user_profile") || "{}");
        localStorage.setItem("scout_user_profile", JSON.stringify({
          ...existing,
          name: name.trim(),
          email: email.trim(),
        }));
        window.dispatchEvent(new CustomEvent("scout_profile_updated"));
      } catch { }
    }
    signIn(); setLoading(false); onSuccess();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-[6px]"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-sm bg-white rounded-[28px] shadow-2xl overflow-hidden border border-slate-200/60">

        {/* Header — blue gradient */}
        <div className="px-8 pt-9 pb-7 bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 text-white relative">
          <button onClick={onClose}
            className="absolute top-5 right-5 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 opacity-80" />
          </button>
          <div className="h-12 w-12 bg-indigo-500/30 rounded-2xl flex items-center justify-center mb-5 border border-white/20 shadow-inner">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-black tracking-tight leading-tight">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-white/70 text-sm mt-1.5 font-medium">
            {mode === "signin" ? "Sign in to access your pipeline" : "Start your 14-day free trial — no card needed"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pt-7 pb-8 space-y-5">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </div>
          )}

          {/* Name — signup only */}
          {mode === "signup" && (
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Alex Johnson" autoFocus
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400/80" />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@fund.com" required
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400/80" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required
                className="w-full pl-11 pr-11 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400/80" />
              <button type="button" onClick={() => setShowPw(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {mode === "signin" && (
              <button type="button" className="text-[11px] text-blue-600 font-bold hover:underline mt-1 block w-full text-right px-1">Forgot password?</button>
            )}
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-black text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 shadow-xl shadow-blue-500/20 translate-y-2 mb-2">
            {loading
              ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <>{mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="w-4 h-4" /></>}
          </button>

          <div className="relative pt-6">
            <div className="absolute inset-x-0 top-9 flex items-center px-8"><div className="w-full border-t border-slate-100" /></div>
            <div className="relative flex justify-center text-[10px] text-slate-400 font-black uppercase tracking-widest bg-white z-10 w-fit mx-auto px-4 mt-1.5">or</div>
          </div>

          <p className="text-center text-sm text-slate-500 font-medium pt-3">
            {mode === "signin" ? "New to Scout.ai? " : "Already have an account? "}
            <button type="button"
              onClick={() => { setMode(m => m === "signin" ? "signup" : "signin"); setError(""); setName(""); }}
              className="text-blue-600 font-black hover:text-blue-700 transition-colors">
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
// Mobile: hamburger → slide-down drawer
function Navbar({ onSignInClick, onGetStartedClick }: { onSignInClick: () => void; onGetStartedClick: () => void }) {
  const [visible, setVisible] = React.useState(true);
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const lastY = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > lastY.current + 8) { setVisible(false); setMobileOpen(false); }
      else if (y < lastY.current - 4) setVisible(true);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMobileNav = (id: string) => {
    setMobileOpen(false);
    scrollTo(id);
  };

  // True glassmorphism: transparent + heavy blur + luminous border
  const glassBase = "backdrop-blur-2xl border border-white/20 dark:border-white/10";
  const glassLight = scrolled
    ? `bg-white/20 dark:bg-slate-900/25 shadow-2xl shadow-blue-900/10 dark:shadow-black/40 ${glassBase}`
    : `bg-white/10 dark:bg-slate-900/15 shadow-lg shadow-blue-900/5 dark:shadow-black/20 ${glassBase}`;
  const glassDrawer = "bg-white/25 dark:bg-slate-900/30 backdrop-blur-2xl border border-white/25 dark:border-white/10 shadow-2xl shadow-blue-900/10 dark:shadow-black/50";

  return (
    <motion.div
      animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.32, ease }}
      className="fixed top-4 inset-x-0 z-50 flex flex-col items-center px-4 pointer-events-none gap-2">

      {/* ── Pill bar ── */}
      <nav className={`pointer-events-auto relative w-full max-w-3xl flex items-center gap-4 px-5 py-2.5 rounded-full transition-all duration-500 ${glassLight}`}>

        {/* Inner top-shimmer: the luminous highlight edge */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-full"
          style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 40%, rgba(147,197,253,0.5) 60%, transparent 100%)" }} />

        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="h-7 w-7 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/40">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white">Scout.ai</span>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5 flex-1">
          {SECTIONS.map(s => (
            <button key={s} onClick={() => scrollTo(s)}
              className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 capitalize text-slate-600 dark:text-slate-300 hover:text-blue-700 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/10">
              {s}
            </button>
          ))}
        </div>

        {/* Spacer on mobile */}
        <div className="flex-1 md:hidden" />

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle muted={true} />

          {/* Desktop-only auth buttons */}
          <button onClick={onSignInClick}
            className="hidden md:block text-sm font-bold px-3 py-1.5 rounded-full transition-all duration-200 text-slate-700 dark:text-slate-200 hover:text-blue-700 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10">
            Sign in
          </button>
          <button onClick={onGetStartedClick}
            className="hidden md:flex group items-center gap-1.5 bg-blue-600/90 hover:bg-blue-600 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0">
            Get started
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden flex items-center justify-center h-8 w-8 rounded-full bg-white/30 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-white/20 transition-all duration-200 backdrop-blur-sm border border-white/30 dark:border-white/10"
            aria-label="Toggle menu">
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <X className="w-4 h-4" />
                </motion.span>
                : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Menu className="w-4 h-4" />
                </motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`pointer-events-auto relative w-full max-w-3xl rounded-3xl px-5 py-5 flex flex-col gap-2 ${glassDrawer}`}>

            {/* Top shimmer on drawer too */}
            <div className="pointer-events-none absolute inset-x-4 top-0 h-px rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)" }} />

            {/* Nav links */}
            {SECTIONS.map(s => (
              <button key={s} onClick={() => handleMobileNav(s)}
                className="w-full text-left px-4 py-3 rounded-2xl capitalize font-semibold text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-white/10 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-200 text-sm">
                {s}
              </button>
            ))}

            <div className="border-t border-white/20 dark:border-white/10 my-1" />

            {/* Auth CTAs */}
            <button onClick={() => { setMobileOpen(false); onSignInClick(); }}
              className="w-full px-4 py-3 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-200 text-left">
              Sign in
            </button>
            <button onClick={() => { setMobileOpen(false); onGetStartedClick(); }}
              className="w-full flex items-center justify-center gap-2 bg-blue-600/90 hover:bg-blue-600 backdrop-blur-sm text-white font-black text-sm px-4 py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-500/30">
              Get started
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
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
        className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all group-hover:gap-2">
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
      className={`relative rounded-3xl p-8 flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${highlight
          ? "bg-slate-900 dark:bg-slate-800 text-white shadow-xl shadow-slate-900/25 dark:shadow-black/40"
          : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
        }`}>
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[11px] font-black px-4 py-1.5 rounded-full shadow-lg shadow-blue-500/30 whitespace-nowrap">
          ✦ Most Popular
        </div>
      )}
      <div>
        <p className={`text-[11px] font-black uppercase tracking-widest mb-3 ${highlight ? "text-blue-400" : "text-slate-400"}`}>{plan}</p>
        <div className="flex items-end gap-1">
          <span className="text-5xl font-black tracking-tighter">{price}</span>
          <span className={`text-sm mb-2 ${highlight ? "text-slate-400" : "text-slate-400"}`}>/ {period}</span>
        </div>
      </div>
      <ul className="space-y-3 flex-1">
        {features.map(f => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${highlight ? "bg-blue-500/20" : "bg-blue-50 dark:bg-blue-500/10"}`}>
              <Check className={`w-3 h-3 ${highlight ? "text-blue-400" : "text-blue-600 dark:text-blue-400"}`} />
            </div>
            <span className={highlight ? "text-slate-300" : "text-slate-600 dark:text-slate-300"}>{f}</span>
          </li>
        ))}
      </ul>
      <button onClick={onAuth}
        className={`w-full py-3.5 rounded-2xl text-sm font-black text-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${highlight
            ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/30"
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
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-700 overflow-hidden w-full max-w-[480px]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
        <div className="h-3 w-3 rounded-full bg-red-400" />
        <div className="h-3 w-3 rounded-full bg-amber-400" />
        <div className="h-3 w-3 rounded-full bg-emerald-400" />
        <span className="ml-2 text-xs text-slate-400 font-mono">scout.ai · dashboard</span>
      </div>
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Pipeline Velocity</p>
            <p className="text-4xl font-black text-slate-900 dark:text-white mt-1">78<span className="text-xl text-slate-400">%</span></p>
          </div>
          <span className="text-sm font-black px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">+12% ↑</span>
        </div>
        {[
          { name: "Mistral AI", stage: "Series B", score: 96, hex: "#2563eb" },
          { name: "ElevenLabs", stage: "Series B", score: 94, hex: "#1d4ed8" },
          { name: "Runway", stage: "Series C", score: 97, hex: "#3b82f6" },
        ].map(c => (
          <div key={c.name} className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50/60 dark:hover:bg-blue-900/20 transition-colors cursor-pointer group">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: c.hex + "22" }}>
              <span className="text-xs font-black" style={{ color: c.hex }}>{c.name.slice(0, 2).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{c.name}</p>
              <p className="text-xs text-slate-400">{c.stage}</p>
            </div>
            <span className="text-sm font-black" style={{ color: c.hex }}>{c.score}</span>
          </div>
        ))}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-semibold">Weekly target</span>
            <span className="text-xs font-black text-blue-600 dark:text-blue-400">78%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-400" style={{ width: "78%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Floating deal-flow chart card ───────────────────────────────────────────────
function FloatingChartCard() {
  const bars = [38, 55, 44, 68, 52, 74, 61, 80, 70, 92];
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/60 dark:border-slate-700 p-4 w-[210px]">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Deal Flow</p>
          <p className="text-xl font-black text-slate-900 dark:text-white leading-tight">
            +34%
            <span className="text-xs text-slate-400 font-medium ml-1">/ mo</span>
          </p>
        </div>
        <div className="h-8 w-8 rounded-xl bg-blue-50 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
          <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      {/* SVG bar chart */}
      <svg viewBox="0 0 100 40" className="w-full h-12 overflow-visible" preserveAspectRatio="none">
        {bars.map((h, i) => {
          const x = i * 11;
          const barH = (h / 100) * 36;
          const isLast = i === bars.length - 1;
          return (
            <rect key={i} x={x} y={40 - barH} width={8} height={barH} rx={2}
              fill={isLast ? "#2563eb" : i >= bars.length - 3 ? "#93c5fd" : "#e2e8f0"}
              className="dark:[&:not(:last-child)]:fill-slate-700"
            />
          );
        })}
      </svg>
      <div className="flex items-center gap-1.5 mt-2">
        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        <p className="text-[10px] text-slate-400">Oct — Jan 2026 · AI-tracked</p>
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

  const [authMode, setAuthMode] = React.useState<"signin" | "signup">("signup");
  const openAuth = React.useCallback((mode: "signin" | "signup" = "signup") => {
    setAuthMode(mode);
    setShowAuth(true);
  }, []);
  const handleSuccess = React.useCallback(() => { setShowAuth(false); router.push("/dashboard"); }, [router]);

  const features = [
    { icon: Search, title: "Smart Company Search", desc: "Filter 20,000+ startups by stage, sector, geography, and growth signals in milliseconds.", color: "bg-blue-600", i: 0 },
    { icon: Zap, title: "AI-Powered Enrichment", desc: "One click pulls funding rounds, key hires, press signals, and a thesis-fit score instantly.", color: "bg-blue-700", i: 1 },
    { icon: BarChart3, title: "Pipeline Intelligence", desc: "Track every deal through your funnel with tasks, reminders, and real-time velocity metrics.", color: "bg-indigo-600", i: 2 },
    { icon: Bell, title: "Live Signal Alerts", desc: "Get notified instantly when a portfolio company raises, hires a key exec, or hits the news.", color: "bg-slate-700", i: 3 },
    { icon: Shield, title: "Secure & Compliant", desc: "SOC 2 Type II certified. Your deal flow data stays private, encrypted, and fully in your control.", color: "bg-blue-800", i: 4 },
    { icon: Globe, title: "Global Coverage", desc: "US, EU, and APAC coverage — plus custom import from Salesforce, HubSpot, or CSV in one click.", color: "bg-indigo-700", i: 5 },
  ];

  const plans = [
    {
      plan: "Starter", price: "$0", period: "month", highlight: false, cta: "Start free", i: 0,
      features: ["Up to 50 companies", "Basic AI signals", "1 analyst seat", "CSV export", "Community support"]
    },
    {
      plan: "Pro", price: "$79", period: "month", highlight: true, cta: "Start Pro trial", i: 1,
      features: ["Unlimited companies", "Full AI enrichment", "5 analyst seats", "Pipeline board + tasks", "Priority support", "REST API access"]
    },
    {
      plan: "Enterprise", price: "Custom", period: "year", highlight: false, cta: "Contact sales", i: 2,
      features: ["Unlimited everything", "Custom integrations", "Dedicated CSM", "SSO & SCIM", "99.9% SLA", "White-label option"]
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen overflow-x-hidden">

      <AnimatePresence>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} onSuccess={handleSuccess} defaultMode={authMode} />}
      </AnimatePresence>

      <Navbar onSignInClick={() => openAuth("signin")} onGetStartedClick={() => openAuth("signup")} />

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
          className="relative container mx-auto px-6 md:px-12 grid lg:grid-cols-[1fr_1.15fr] gap-8 xl:gap-12 items-center">

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
              <button onClick={() => openAuth()}
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

          {/* Right: floating mock UI + deal-flow chart — all badges overlap main card */}
          <motion.div
            initial={{ opacity: 0, x: 48 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.25 }}
            className="relative flex items-center justify-center pl-0 lg:pl-6" style={{ minHeight: 520 }}>

            {/* Main dashboard card — centered z-0 */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-0">
              <MockDashCard />
            </motion.div>

            {/* FloatingChartCard — top-right, overlapping MockDashCard corner */}
            <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -top-12 -right-8 xl:-right-14 z-20">
              <FloatingChartCard />
            </motion.div>

            {/* Signal badge — top-left, overlapping MockDashCard left edge */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute top-8 -left-8 xl:-left-14 z-20 bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-blue-950/10 px-5 py-4 flex items-center gap-4 border border-slate-100 dark:border-slate-700">
              <div className="h-11 w-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">New signal</p>
                <p className="text-sm font-black text-slate-900 dark:text-white">Runway raised $141M</p>
              </div>
            </motion.div>

            {/* AI Score badge — bottom-right, overlapping MockDashCard right edge */}
            {/* Light: white card with blue shadow. Dark: dark navy */}
            <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="absolute -bottom-8 -right-8 xl:-right-14 z-20 bg-white dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-2xl shadow-xl shadow-blue-950/15 px-5 py-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-blue-600 dark:bg-blue-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 dark:text-blue-300 font-semibold uppercase tracking-wider">AI Score</p>
                <p className="text-base font-black text-slate-900 dark:text-white">97 · Strong Buy</p>
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
      <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-950">
        {/* Subtle blue radial glow — visible in both modes */}
        <div className="absolute inset-0 opacity-[0.06] dark:opacity-10"
          style={{ backgroundImage: "radial-gradient(ellipse 70% 80% at 20% 50%, #2563eb 0%, transparent 60%)" }} />
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{ backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="relative max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-8 text-center">
          {[
            { num: "20K+", label: "Startups in database", sub: "Updated daily" },
            { num: "2.4M", label: "Funding signals tracked", sub: "Across 8 data sources" },
            { num: "97%", label: "Analyst satisfaction", sub: "Across 200+ teams" },
          ].map((s, i) => (
            <motion.div key={s.label} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="text-6xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-b from-blue-700 to-indigo-500 dark:from-white dark:to-blue-300"
                style={{ filter: "drop-shadow(0 4px 24px #2563eb30)" }}>
                {s.num}
              </p>
              <p className="text-slate-700 dark:text-slate-200 font-bold text-base mb-1">{s.label}</p>
              <p className="text-slate-400 dark:text-slate-500 text-sm">{s.sub}</p>
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

      {/* ── CTA BANNER ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-slate-50 dark:bg-slate-900/50">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center bg-white dark:bg-slate-900 rounded-3xl p-14 shadow-2xl shadow-blue-950/10 dark:shadow-black/40 border border-blue-100 dark:border-slate-800 relative overflow-hidden">
          {/* Blue glow accent — subtle in light mode */}
          <div className="absolute inset-0 opacity-[0.06] dark:opacity-15"
            style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 80% 20%, #2563eb 0%, transparent 50%)" }} />
          <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
            style={{ backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="relative">
            <div className="h-14 w-14 mx-auto mb-6 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">Ready to find your next unicorn?</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg">Join 200+ VC teams using Scout.ai to discover the startups that matter.</p>
            <button onClick={() => openAuth()}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-4 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
              Launch Scout.ai free
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-4">No credit card · 14-day trial · Cancel anytime</p>
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
