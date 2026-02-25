"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { GlobalSearch } from "@/components/layout/GlobalSearch";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { PageWrapper } from "@/components/layout/Providers";
import { useUser } from "@/context/UserContext";

const AUTH_KEY = "scout_authed";

export function AppShell({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);
    const { initials } = useUser();
    const router = useRouter();

    // Route guard — redirect to landing if not authed
    React.useEffect(() => {
        const authed = typeof window !== "undefined" && localStorage.getItem(AUTH_KEY) === "true";
        if (!authed) router.replace("/");
    }, [router]);

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar
                isCollapsed={isCollapsed}
                onToggleCollapsed={() => setIsCollapsed((c) => !c)}
                isMobileOpen={isMobileOpen}
                onCloseMobile={() => setIsMobileOpen(false)}
            />
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 shrink-0 z-10 transition-all">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden h-9 w-9 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                            onClick={() => setIsMobileOpen((o) => !o)}
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                        <GlobalSearch />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 border-2 border-white dark:border-slate-800 shadow-md flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => router.push("/settings")}
                            title="Profile settings">
                            <span className="text-[11px] font-black text-white tracking-tight select-none">{initials}</span>
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto">
                    <PageWrapper>
                        {children}
                    </PageWrapper>
                </div>
            </main>
        </div>
    );
}
