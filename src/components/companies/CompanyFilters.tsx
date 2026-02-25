"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { FilterState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CompanyFiltersProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const STAGES = ['Pre-seed', 'Seed', 'Series A', 'Series B', 'Series C', 'Series D', 'Series E', 'Series F', 'Acquired'];
const SECTORS = ['B2B SaaS', 'Fintech', 'HealthTech', 'AI/ML', 'Climate', 'HR Tech', 'Developer Tools'];
const GEOGRAPHIES = ['US', 'EU', 'APAC', 'Global', 'Canada'];
const HEADCOUNT_OPTIONS = ['All', '1-10', '11-50', '51-200', '200+'];

export function CompanyFilters({ filters, setFilters }: CompanyFiltersProps) {
    const toggleFilter = (type: 'stage' | 'sector' | 'geography', value: string) => {
        setFilters((prev) => {
            const current = prev[type] as string[];
            const next = current.includes(value)
                ? current.filter((i) => i !== value)
                : [...current, value];
            return { ...prev, [type]: next };
        });
    };

    const Section = ({ title, items, type, current }: { title: string, items: string[], type: 'stage' | 'sector' | 'geography', current: string[] }) => (
        <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {items.map((item) => {
                    const isActive = current.includes(item);
                    return (
                        <motion.button
                            key={item}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleFilter(type, item)}
                            className={cn(
                                "text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200",
                                isActive
                                    ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20"
                                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                            )}
                        >
                            {item}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="space-y-10">
            <Section title="Venture Stage" items={STAGES} type="stage" current={filters.stage} />
            <Section title="Sector Vertical" items={SECTORS} type="sector" current={filters.sector} />
            <Section title="Geography" items={GEOGRAPHIES} type="geography" current={filters.geography} />

            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Company Size</h3>
                <Select
                    value={filters.headcount}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, headcount: value }))}
                >
                    <SelectTrigger className="w-full rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:ring-blue-500/20">
                        <SelectValue placeholder="Select headcount" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800 shadow-xl">
                        {HEADCOUNT_OPTIONS.map((option) => (
                            <SelectItem key={option} value={option} className="rounded-lg">{option}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
