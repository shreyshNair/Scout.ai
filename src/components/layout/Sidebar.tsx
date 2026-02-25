"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Building2,
    ListTodo,
    Search,
    Settings,
    CircleHelp,
    Moon,
    Sun,
    LogOut,
    Sparkles,
    ChevronLeft,
    ChevronRight,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Companies", href: "/companies", icon: Building2, hasSubmenu: true },
    { name: "My Lists", href: "/lists", icon: ListTodo, hasSubmenu: true },
    { name: "Saved Searches", href: "/saved", icon: Search, hasSubmenu: true },
];

const secondaryItems = [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help & Support", href: "/settings", icon: CircleHelp },
];

interface SidebarProps {
    isCollapsed: boolean;
    onToggleCollapsed: () => void;
    isMobileOpen: boolean;
    onCloseMobile: () => void;
}

// Inner panel — all hooks live here, always called unconditionally
const AUTH_KEY = "scout_authed";

function SidebarPanel({
    isCollapsed,
    onToggleCollapsed,
    onCloseMobile,
}: Omit<SidebarProps, "isMobileOpen">) {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const { profile, initials } = useUser();

    React.useEffect(() => setMounted(true), []);

    const handleLogout = () => {
        localStorage.removeItem(AUTH_KEY);
        router.push("/");
    };

    return (
        <aside className={cn(
            "h-full flex flex-col neuro-sidebar shadow-2xl z-50 relative transition-[width] duration-300 ease-in-out",
            isCollapsed ? "w-20" : "w-72"
        )}>
            {/* Desktop Toggle */}
            <button
                onClick={onToggleCollapsed}
                className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 items-center justify-center shadow-md z-30 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors opacity-0 group-hover/sidebar:opacity-100"
            >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {/* Mobile Close */}
            <button
                onClick={onCloseMobile}
                className="lg:hidden absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600"
            >
                <X className="w-5 h-5" />
            </button>

            {/* Brand */}
            <div className={cn("p-8 flex items-center gap-3", isCollapsed && "px-4 justify-center")}>
                <div className="h-10 w-10 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center shadow-xl shadow-indigo-500/20 shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                {!isCollapsed && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="overflow-hidden whitespace-nowrap">
                        <h1 className="text-xl font-black tracking-tighter dark:text-white text-slate-900">Scout.ai</h1>
                        <p className="text-[10px] text-slate-500 dark:text-white/40 font-bold uppercase tracking-widest leading-none mt-1">VC Analysis</p>
                    </motion.div>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
                {!isCollapsed && (
                    <p className="px-4 text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] mb-4 mt-6">Admin Tools</p>
                )}

                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200",
                                isActive
                                    ? "bg-blue-50/80 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-white/5",
                                isCollapsed && "justify-center px-3"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5 shrink-0 transition-colors",
                                isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-white/40 group-hover:text-blue-500"
                            )} />
                            {!isCollapsed && (
                                <span className="text-sm font-semibold tracking-tight flex-1">{item.name}</span>
                            )}
                        </Link>
                    );
                })}

                <div className="pt-8 opacity-40">
                    <hr className="border-slate-200 dark:border-white/10 mx-4" />
                </div>

                <div className="pt-4 space-y-1">
                    {secondaryItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-white/5",
                                isCollapsed && "justify-center px-3"
                            )}
                        >
                            <item.icon className="w-5 h-5 shrink-0 text-slate-400 dark:text-white/40 group-hover:text-slate-600 dark:group-hover:text-white" />
                            {!isCollapsed && <span className="text-sm font-semibold tracking-tight">{item.name}</span>}
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4">
                <div className={cn(
                    "bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 transition-all overflow-hidden",
                    isCollapsed ? "p-2" : "p-4"
                )}>
                    <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 border-2 border-white dark:border-slate-800 shadow-md shrink-0 flex items-center justify-center">
                            <span className="text-[11px] font-black text-white tracking-tight select-none">{initials}</span>
                        </div>
                        {!isCollapsed && (
                            <div className="min-w-0">
                                <p className="text-sm font-black truncate dark:text-white text-slate-900">{profile.name}</p>
                                <p className="text-[10px] text-slate-500 dark:text-white/40 truncate font-bold uppercase tracking-widest">{profile.title}</p>
                            </div>
                        )}
                    </div>
                    {!isCollapsed && (
                        <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-200 dark:border-white/5 pt-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-white dark:hover:bg-white/10 text-slate-500 dark:text-white"
                                onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
                            >
                                {mounted && (theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
                            </Button>
                            <Button variant="ghost" size="icon"
                                className="h-8 w-8 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-500 dark:text-white hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                onClick={handleLogout}
                                title="Sign out">
                                <LogOut className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}

export function Sidebar({ isCollapsed, onToggleCollapsed, isMobileOpen, onCloseMobile }: SidebarProps) {
    const variants = {
        open: { x: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
        closed: { x: "-100%", opacity: 0, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
    };

    return (
        <>
            {/* Desktop */}
            <div className="hidden lg:block h-full group/sidebar shrink-0">
                <SidebarPanel
                    isCollapsed={isCollapsed}
                    onToggleCollapsed={onToggleCollapsed}
                    onCloseMobile={onCloseMobile}
                />
            </div>

            {/* Mobile drawer */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={onCloseMobile}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.div
                            variants={variants} initial="closed" animate="open" exit="closed"
                            className="fixed inset-y-0 left-0 z-50 lg:hidden"
                        >
                            <SidebarPanel
                                isCollapsed={false}
                                onToggleCollapsed={onToggleCollapsed}
                                onCloseMobile={onCloseMobile}
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
