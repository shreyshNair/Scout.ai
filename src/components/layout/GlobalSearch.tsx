"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
    Building2, Search, LayoutDashboard, ListTodo,
    Settings, Star, ArrowRight,
} from "lucide-react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import { mockCompanies } from "@/lib/mock-data";

const quickNav = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, shortcut: "G D" },
    { name: "Companies", href: "/companies", icon: Building2, shortcut: "G C" },
    { name: "My Lists", href: "/lists", icon: ListTodo, shortcut: "G L" },
    { name: "Saved Searches", href: "/saved", icon: Star, shortcut: "G S" },
    { name: "Settings", href: "/settings", icon: Settings, shortcut: "G ," },
];

export function GlobalSearch() {
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const router = useRouter();

    React.useEffect(() => {
        // Cmd/Ctrl + K → open search
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((v) => !v);
            }
            // G + letter shortcuts (only when no input focused)
            const tag = (e.target as HTMLElement).tagName;
            if (tag === "INPUT" || tag === "TEXTAREA") return;
            if (e.key === "g" || e.key === "G") {
                const next = (e2: KeyboardEvent) => {
                    document.removeEventListener("keydown", next);
                    const map: Record<string, string> = {
                        d: "/dashboard", c: "/companies",
                        l: "/lists", s: "/saved", ",": "/settings",
                    };
                    const dest = map[e2.key.toLowerCase()];
                    if (dest) { e2.preventDefault(); router.push(dest); }
                };
                document.addEventListener("keydown", next, { once: true });
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [router]);

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false);
        setQuery("");
        command();
    }, []);

    const filtered = query.length > 0
        ? mockCompanies.filter((c) =>
            c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.sector.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8)
        : mockCompanies.slice(0, 5);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 bg-slate-100/60 dark:bg-slate-900/60 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-800 transition-all w-72 justify-between backdrop-blur-sm group"
                aria-label="Open global search (⌘K)"
            >
                <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    <span className="font-medium tracking-tight">Search intelligence...</span>
                </div>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-white dark:bg-slate-950 px-1.5 font-mono text-[10px] font-bold text-slate-400 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <span className="text-[11px]">⌘</span>K
                </kbd>
            </button>

            <CommandDialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setQuery(""); }}>
                <CommandInput
                    placeholder="Search companies, navigate pages..."
                    value={query}
                    onValueChange={setQuery}
                />
                <CommandList>
                    <CommandEmpty className="py-8 text-center text-sm text-slate-500">
                        <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
                        No results for &ldquo;{query}&rdquo;
                    </CommandEmpty>

                    {/* Quick navigation */}
                    <CommandGroup heading="Navigate">
                        {quickNav.map((n) => (
                            <CommandItem key={n.href} value={n.name}
                                onSelect={() => runCommand(() => router.push(n.href))}>
                                <n.icon className="mr-2 h-4 w-4 text-slate-400" />
                                {n.name}
                                <CommandShortcut>{n.shortcut}</CommandShortcut>
                            </CommandItem>
                        ))}
                    </CommandGroup>

                    <CommandSeparator />

                    {/* Company search */}
                    <CommandGroup heading={query ? "Search results" : "Recent companies"}>
                        {filtered.map((c) => (
                            <CommandItem key={c.id} value={c.name}
                                onSelect={() => runCommand(() => router.push(`/companies/${c.id}`))}>
                                <Building2 className="mr-2 h-4 w-4 text-slate-400" />
                                <div className="flex-1 min-w-0">
                                    <span className="font-semibold">{c.name}</span>
                                    <span className="ml-2 text-xs text-muted-foreground">{c.sector}</span>
                                </div>
                                <ArrowRight className="ml-2 h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
