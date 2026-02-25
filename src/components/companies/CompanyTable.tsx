"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Company } from "@/lib/types";
import { ArrowUpDown, ChevronRight, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CompanyTableProps {
    companies: Company[];
}

export function CompanyTable({ companies }: CompanyTableProps) {
    const router = useRouter();
    const [sortConfig, setSortConfig] = React.useState<{ key: keyof Company; direction: 'asc' | 'desc' } | null>(null);
    const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);

    const sortedCompanies = React.useMemo(() => {
        let sortableItems = [...companies];
        if (sortConfig) {
            const { key, direction } = sortConfig;
            sortableItems.sort((a, b) => {
                const aValue = a[key] ?? '';
                const bValue = b[key] ?? '';
                if (aValue < bValue) {
                    return direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [companies, sortConfig]);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;

            if (e.key === 'j') {
                setSelectedIndex(prev => Math.min(prev + 1, sortedCompanies.length - 1));
            } else if (e.key === 'k') {
                setSelectedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter' && selectedIndex >= 0) {
                router.push(`/companies/${sortedCompanies[selectedIndex].id}`);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, router, sortedCompanies]);

    const requestSort = (key: keyof Company) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getScoreStyles = (score: number) => {
        if (score >= 75) return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
        if (score >= 50) return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
    };

    return (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft overflow-hidden transition-all duration-300">
            <Table>
                <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md">
                    <TableRow className="border-b border-slate-200 dark:border-slate-800">
                        <TableHead className="py-4 px-6">
                            <button
                                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                                onClick={() => requestSort('name')}
                            >
                                Company
                                <ArrowUpDown className="h-3 w-3" />
                            </button>
                        </TableHead>
                        <TableHead className="py-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Context</span>
                        </TableHead>
                        <TableHead className="py-4">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Demographics</span>
                        </TableHead>
                        <TableHead className="py-4 text-right pr-6">
                            <button
                                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors ml-auto"
                                onClick={() => requestSort('score')}
                            >
                                Intelligence
                                <ArrowUpDown className="h-3 w-3" />
                            </button>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedCompanies.length > 0 ? (
                        sortedCompanies.map((company, idx) => (
                            <TableRow
                                key={company.id}
                                className={cn(
                                    "group cursor-pointer border-b border-slate-100 dark:border-slate-800/50 transition-all duration-200",
                                    selectedIndex === idx
                                        ? "bg-blue-50/30 dark:bg-blue-900/10 ring-1 ring-inset ring-blue-500/20"
                                        : "hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                                )}
                                onClick={() => router.push(`/companies/${company.id}`)}
                            >
                                <TableCell className="py-4 px-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 flex items-center justify-center font-bold text-blue-600 dark:text-blue-400 shadow-sm relative overflow-hidden group-hover:scale-105 transition-transform">
                                            {company.name.charAt(0)}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/40 dark:to-white/10" />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="font-bold text-sm tracking-tight">{company.name}</span>
                                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                                                <Globe className="w-2.5 h-2.5" />
                                                {company.website}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <Badge variant="outline" className="w-fit text-[10px] font-bold uppercase tracking-wider py-0 px-2 h-5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700">
                                            {company.sector}
                                        </Badge>
                                        <Badge variant="outline" className="w-fit text-[10px] font-bold uppercase tracking-wider py-0 px-2 h-5 bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800/30">
                                            {company.stage}
                                        </Badge>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <div className="flex flex-col gap-1 text-xs font-medium">
                                        <span className="text-slate-700 dark:text-slate-300">{company.geography}</span>
                                        <div className="flex items-center gap-1.5 text-muted-foreground text-[10px]">
                                            <Users className="w-3 h-3" />
                                            {company.headcount} employees
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4 pr-6">
                                    <div className="flex items-center justify-end gap-3">
                                        <div className={cn("flex flex-col items-end gap-1 px-3 py-1 rounded-xl border transition-colors", getScoreStyles(company.score))}>
                                            <span className="text-lg font-black leading-none">{company.score}</span>
                                            <span className="text-[8px] font-bold uppercase tracking-widest opacity-70">Signal</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="h-64 text-center">
                                <div className="flex flex-col items-center justify-center gap-2 opacity-40">
                                    <Globe className="w-8 h-8 mb-2" />
                                    <p className="font-bold text-sm tracking-tight">Intelligence Mismatch</p>
                                    <p className="text-xs">No companies identified with current filter set.</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
