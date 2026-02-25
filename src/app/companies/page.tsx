"use client";

import * as React from "react";
import { CompanyTable } from "@/components/companies/CompanyTable";
import { CompanyFilters } from "@/components/companies/CompanyFilters";
import { useSearch } from "@/hooks/useSearch";
import { mockCompanies } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Save, Sparkles, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { getSavedSearches, saveSavedSearches } from "@/lib/storage";
import { SavedSearch } from "@/lib/types";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function CompaniesPage() {
    const { filters, setFilters, filteredCompanies, activeFilterCount } = useSearch(mockCompanies, {
        stage: [],
        sector: [],
        geography: [],
        headcount: 'All',
        query: ''
    });

    const [saveDialogOpen, setSaveDialogOpen] = React.useState(false);
    const [searchName, setSearchName] = React.useState("");

    const handleSaveSearch = () => {
        if (!searchName) return;

        const newSavedSearch: SavedSearch = {
            id: Math.random().toString(36).substring(7),
            name: searchName,
            query: filters.query,
            filters: filters,
            savedAt: new Date().toISOString()
        };

        const currentSearches = getSavedSearches();
        saveSavedSearches([...currentSearches, newSavedSearch]);

        setSearchName("");
        setSaveDialogOpen(false);
        toast.success(`Saved search "${searchName}"`);
    };

    const clearFilters = () => {
        setFilters({
            stage: [],
            sector: [],
            geography: [],
            headcount: 'All',
            query: ''
        });
    };

    return (
        <div className="p-8 max-w-[1400px] mx-auto space-y-10">
            {/* Header / Hero Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2"
                    >
                        Welcome Back,
                    </motion.div>
                    <h1 className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                        Lucy Lure
                    </h1>
                    <p className="text-muted-foreground mt-2 font-medium">
                        Analyze {mockCompanies.length} high-fidelity signals in today's landscape.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                className="rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft font-bold text-xs uppercase tracking-wider h-11 px-6 gap-2"
                            >
                                <Save className="w-4 h-4 text-blue-600" />
                                Save Query
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-2xl">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-black tracking-tight">Save Intelligence Query</DialogTitle>
                            </DialogHeader>
                            <div className="py-6 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="search-name" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Search Title</Label>
                                    <Input
                                        id="search-name"
                                        placeholder="e.g., Early Stage AI Frontier"
                                        className="rounded-xl border-slate-200 dark:border-slate-800 h-12"
                                        value={searchName}
                                        onChange={(e) => setSearchName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="ghost" onClick={() => setSaveDialogOpen(false)} className="rounded-xl">Cancel</Button>
                                <Button onClick={handleSaveSearch} disabled={!searchName} className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-8">Confirm Save</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Button className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 font-bold text-xs uppercase tracking-wider h-11 px-8 gap-2">
                        <Sparkles className="w-4 h-4" />
                        Run Intelligence
                    </Button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1 space-y-8 h-fit lg:sticky lg:top-8">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        </div>
                        <Input
                            placeholder="Universal search..."
                            className="pl-11 h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft focus-visible:ring-blue-500/20 transition-all font-medium"
                            value={filters.query}
                            onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                        />
                    </div>

                    <div className="bg-slate-50/50 dark:bg-slate-900/30 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/50">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                                <Filter className="w-3 h-3 text-blue-600" />
                                Filters
                                {activeFilterCount > 0 && (
                                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[8px] text-white">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </div>
                            {activeFilterCount > 0 && (
                                <button
                                    onClick={clearFilters}
                                    className="text-[10px] font-bold text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    Reset
                                </button>
                            )}
                        </div>

                        <CompanyFilters filters={filters} setFilters={setFilters} />
                    </div>
                </div>

                {/* Results Area */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-black tracking-tight">Active Coverage</h2>
                            <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                {filteredCompanies.length} Identifiers
                            </span>
                        </div>
                    </div>

                    <CompanyTable companies={filteredCompanies} />
                </div>
            </div>
        </div>
    );
}
