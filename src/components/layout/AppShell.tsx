"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { GlobalSearch } from "@/components/layout/GlobalSearch";
import { useSidebar } from "@/context/SidebarContext";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { PageWrapper } from "@/components/layout/Providers";

export function AppShell({ children }: { children: React.ReactNode }) {
    const { toggleMobile } = useSidebar();

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md flex items-center justify-between px-4 md:px-8 shrink-0 z-10 transition-all">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden h-9 w-9 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                            onClick={toggleMobile}
                        >
                            <Menu className="w-5 h-5" />
                        </Button>
                        <GlobalSearch />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10" />
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
