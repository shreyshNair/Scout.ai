"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { useSidebar } from "@/context/SidebarContext";

const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard, color: "text-blue-500" },
    { name: "Companies", href: "/companies", icon: Building2, color: "text-indigo-500" },
    { name: "My Lists", href: "/lists", icon: ListTodo, color: "text-emerald-500" },
    { name: "Saved Searches", href: "/saved", icon: Search, color: "text-amber-500" },
];

const secondaryItems = [
    { name: "Settings", href: "/settings", icon: Settings, color: "text-slate-500" },
    { name: "Help & Support", href: "#", icon: CircleHelp, color: "text-slate-500" },
];

export function Sidebar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const { isCollapsed, toggleCollapsed, isMobileOpen, toggleMobile } = useSidebar();

    React.useEffect(() => setMounted(true), []);

    // Helper to close sidebar on mobile when a link is clicked
    const handleLinkClick = () => {
        if (window.innerWidth < 1024) {
            toggleMobile();
        }
    };

    const sidebarVariants = {
        open: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30
            }
        },
        closed: {
            x: "-100%",
            opacity: 0,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 30
            }
        }
    };

    const SidebarContent = (
        <aside className={cn(
            "h-full flex flex-col neuro-sidebar shadow-2xl z-50",
            isCollapsed ? "w-20" : "w-72"
        )}>
            {/* Desktop Toggle Button */}
            <button
                onClick={toggleCollapsed}
                className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 items-center justify-center shadow-md z-30 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors opacity-0 group-hover/sidebar:opacity-100"
            >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {/* Mobile Close Button */}
            <button
                onClick={toggleMobile}
                className="lg:hidden absolute right-4 top-4 p-2 text-slate-400"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Brand Logo */}
            <div className={cn("p-8 flex items-center gap-3 transition-all", isCollapsed ? "px-4 justify-center" : "")}>
                <div className="h-10 w-10 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center shadow-indigo-500/20 shadow-xl shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="overflow-hidden whitespace-nowrap"
                    >
                        <h1 className="text-xl font-black tracking-tighter dark:text-white text-slate-900">Scout.ai</h1>
                        <p className="text-[10px] text-slate-500 dark:text-white/40 font-bold uppercase tracking-widest leading-none mt-1">VC Analysis</p>
                    </motion.div>
                )}
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden">
                {!isCollapsed && (
                    <p className="px-4 text-[10px] font-black text-slate-400 dark:text-white/20 uppercase tracking-[0.2em] mb-4 mt-6">Admin Tools</p>
                )}
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={handleLinkClick}
                            className={cn(
                                "neuro-nav-item",
                                isActive ? "neuro-nav-item-active" : "neuro-nav-item-inactive",
                                isCollapsed && "justify-center px-0"
                            )}
                        >
                            <div className={cn(
                                "h-8 w-8 rounded-lg flex items-center justify-center transition-all shrink-0",
                                isActive ? "bg-blue-50 dark:bg-blue-500/10" : "bg-transparent group-hover:bg-slate-100 dark:group-hover:bg-white/5"
                            )}>
                                <item.icon className={cn("w-4.5 h-4.5 shrink-0 transition-colors", isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-white/40 group-hover:text-blue-500")} />
                            </div>
                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-sm font-bold tracking-tight"
                                >
                                    {item.name}
                                </motion.span>
                            )}
                            {isActive && !isCollapsed && (
                                <motion.div layoutId="sidebar-active" className="absolute left-0 w-1 h-6 bg-blue-600 dark:bg-blue-400 rounded-full -translate-x-1" />
                            )}
                        </Link>
                    );
                })}

                <div className="pt-8 opacity-40">
                    <hr className="border-slate-200 dark:border-white/10 mx-4" />
                </div>

                <div className="pt-4 space-y-1.5">
                    {secondaryItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={handleLinkClick}
                            className={cn(
                                "neuro-nav-item neuro-nav-item-inactive",
                                isCollapsed && "justify-center px-0"
                            )}
                        >
                            <div className="h-8 w-8 rounded-lg flex items-center justify-center transition-all shrink-0 group-hover:bg-slate-100 dark:group-hover:bg-white/5">
                                <item.icon className="w-4.5 h-4.5 shrink-0 text-slate-400 dark:text-white/40 group-hover:text-slate-600 dark:group-hover:text-white" />
                            </div>
                            {!isCollapsed && <span className="text-sm font-bold tracking-tight">{item.name}</span>}
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Footer / Profile Information */}
            <div className="p-4 space-y-4">
                <div className={cn(
                    "bg-slate-50 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-white/5 transition-all overflow-hidden",
                    isCollapsed ? "p-2" : "p-4"
                )}>
                    <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 border-2 border-white dark:border-slate-800 shadow-md flex-shrink-0" />
                        {!isCollapsed && (
                            <div className="min-w-0">
                                <p className="text-sm font-black truncate dark:text-white text-slate-900">Lucy Lure</p>
                                <p className="text-[10px] text-slate-500 dark:text-white/40 truncate font-bold uppercase tracking-widest">Principal Analyst</p>
                            </div>
                        )}
                    </div>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4 flex items-center justify-between gap-2 border-t border-slate-200 dark:border-white/5 pt-4"
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 hover:bg-white dark:hover:bg-white/10 text-slate-500 dark:text-white"
                                onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
                            >
                                {mounted && (theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />)}
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white dark:hover:bg-white/10 text-slate-500 dark:text-white">
                                <LogOut className="w-4 h-4" />
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>
        </aside>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block h-full group/sidebar shrink-0">
                {SidebarContent}
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMobile}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.div
                            variants={sidebarVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="fixed inset-y-0 left-0 z-50 lg:hidden"
                        >
                            {SidebarContent}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
