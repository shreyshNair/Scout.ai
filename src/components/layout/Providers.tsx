"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/context/SidebarContext";
import { UserProvider } from "@/context/UserContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
            <UserProvider>
                <SidebarProvider>
                    {children}
                </SidebarProvider>
            </UserProvider>
        </NextThemesProvider>
    );
}

export function PageWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{
                    duration: 0.35,
                    ease: [0.23, 1, 0.32, 1] // Custom ease for a premium feel
                }}
                className="h-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
