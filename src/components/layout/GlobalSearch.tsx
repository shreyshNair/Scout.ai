"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Building2, Search } from "lucide-react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { mockCompanies } from "@/lib/mock-data";

export function GlobalSearch() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, []);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 bg-slate-100/50 dark:bg-slate-900/50 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 transition-all w-72 justify-between shadow-soft backdrop-blur-sm"
            >
                <div className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    <span className="font-medium tracking-tight">Search intelligence...</span>
                </div>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-white dark:bg-slate-950 px-1.5 font-mono text-[10px] font-bold text-slate-400 border border-slate-200 dark:border-slate-800 shadow-sm opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a company name or sector..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Companies">
                        {mockCompanies.map((company) => (
                            <CommandItem
                                key={company.id}
                                value={company.name}
                                onSelect={() => {
                                    runCommand(() => router.push(`/companies/${company.id}`));
                                }}
                            >
                                <Building2 className="mr-2 h-4 w-4" />
                                <span>{company.name}</span>
                                <span className="ml-auto text-xs text-muted-foreground">{company.sector}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
