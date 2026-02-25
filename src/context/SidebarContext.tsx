"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SidebarContextType {
    isCollapsed: boolean;
    setIsCollapsed: (v: boolean) => void;
    isMobileOpen: boolean;
    setIsMobileOpen: (v: boolean) => void;
    toggleCollapsed: () => void;
    toggleMobile: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Close mobile sidebar on route change (logic can be added in Sidebar component)

    const toggleCollapsed = () => setIsCollapsed(!isCollapsed);
    const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

    return (
        <SidebarContext.Provider
            value={{
                isCollapsed,
                setIsCollapsed,
                isMobileOpen,
                setIsMobileOpen,
                toggleCollapsed,
                toggleMobile
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}
