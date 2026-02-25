"use client";

import * as React from "react";
import { List, Company } from "@/lib/types";
import { getLists, saveLists } from "@/lib/storage";
import { mockCompanies } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
    Plus,
    Trash2,
    Table as TableIcon,
    Download,
    Users,
    ChevronRight,
    ListTodo,
    Sparkles,
    FolderPlus,
    Search
} from "lucide-react";
import { CompanyTable } from "@/components/companies/CompanyTable";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function ListsPage() {
    const [lists, setLists] = React.useState<List[]>([]);
    const [selectedListId, setSelectedListId] = React.useState<string | null>(null);

    React.useEffect(() => {
        const allLists = getLists();
        setLists(allLists);
        if (allLists.length > 0 && !selectedListId) {
            setSelectedListId(allLists[0].id);
        }
    }, [selectedListId]);

    const selectedList = React.useMemo(() =>
        lists.find(l => l.id === selectedListId),
        [lists, selectedListId]);

    const listCompanies = React.useMemo(() => {
        if (!selectedList) return [];
        return mockCompanies.filter(c => selectedList.companyIds.includes(c.id));
    }, [selectedList]);

    const handleCreateList = () => {
        const name = prompt("Intelligence Repository Name:");
        if (!name) return;

        const newList: List = {
            id: Math.random().toString(36).substring(7),
            name,
            companyIds: [],
            createdAt: new Date().toISOString()
        };

        const updated = [...lists, newList];
        setLists(updated);
        saveLists(updated);
        setSelectedListId(newList.id);
        toast.success(`Repository "${name}" initialized`);
    };

    const handleDeleteList = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to decommission this repository?")) return;

        const updated = lists.filter(l => l.id !== id);
        setLists(updated);
        saveLists(updated);
        if (selectedListId === id) {
            setSelectedListId(updated.length > 0 ? updated[0].id : null);
        }
        toast.info("Repository decommissioned");
    };

    const handleExportCSV = () => {
        if (!selectedList) return;
        const headers = ["Name", "Website", "Sector", "Stage", "Score"];
        const rows = listCompanies.map(c => [c.name, c.website, c.sector, c.stage, c.score.toString()]);
        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `${selectedList.name}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Intelligence report exported");
    };

    return (
        <div className="flex h-full overflow-hidden bg-slate-50/50 dark:bg-slate-950/20">
            {/* Left Sidebar - List Directory */}
            <div className="w-80 border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl flex flex-col shrink-0">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800/50 flex items-center justify-between">
                    <div>
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">Repositories</h2>
                        <span className="text-xl font-black tracking-tight">Archives</span>
                    </div>
                    <Button
                        onClick={handleCreateList}
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-800"
                    >
                        <FolderPlus className="w-5 h-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {lists.length > 0 ? (
                        lists.map(list => (
                            <motion.div
                                layout
                                key={list.id}
                                onClick={() => setSelectedListId(list.id)}
                                className={cn(
                                    "w-full text-left p-4 rounded-2xl border transition-all relative group cursor-pointer",
                                    selectedListId === list.id
                                        ? "bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-800 shadow-lg shadow-blue-500/5 ring-1 ring-blue-500/10"
                                        : "bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700"
                                )}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setSelectedListId(list.id);
                                    }
                                }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className={cn(
                                        "text-sm font-bold tracking-tight truncate",
                                        selectedListId === list.id ? "text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-slate-300"
                                    )}>{list.name}</span>
                                    <button
                                        onClick={(e) => handleDeleteList(list.id, e)}
                                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-slate-500">
                                        <Users className="w-3 h-3" />
                                        {list.companyIds.length} Signals
                                    </div>
                                    <div className="h-1 w-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                                    <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600">
                                        {new Date(list.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                {selectedListId === list.id && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className="absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-blue-600 rounded-full"
                                    />
                                )}
                            </motion.div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                            <div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center text-slate-300 dark:text-slate-600 mb-6 border border-slate-100 dark:border-slate-800">
                                <ListTodo className="w-8 h-8" />
                            </div>
                            <p className="text-sm font-bold tracking-tight text-slate-700 dark:text-slate-300">No active repositories</p>
                            <p className="text-xs text-muted-foreground mt-2 max-w-[180px]">Initialize your first archive to start indexing signals.</p>
                            <Button onClick={handleCreateList} variant="outline" size="sm" className="mt-6 rounded-xl border-slate-200 dark:border-slate-800 h-10 px-6 font-bold text-[10px] uppercase tracking-widest">
                                <Plus className="w-4 h-4 mr-2" />
                                Initialize
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                    {selectedList ? (
                        <motion.div
                            key={selectedList.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-12 max-w-7xl mx-auto space-y-12"
                        >
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div>
                                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                                        <Sparkles className="w-4 h-4" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Repository Active</span>
                                    </div>
                                    <h1 className="text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                                        {selectedList.name}
                                    </h1>
                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50">
                                            <Users className="w-3.5 h-3.5 text-slate-400" />
                                            <span className="text-xs font-bold">{listCompanies.length} Identifiers</span>
                                        </div>
                                        <div className="text-xs font-medium text-muted-foreground">
                                            Initialized <span className="text-slate-900 dark:text-slate-100 font-bold">{new Date(selectedList.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button onClick={handleExportCSV} variant="outline" className="rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft h-12 px-8 font-bold text-xs uppercase tracking-wider gap-3">
                                        <Download className="w-4 h-4 text-blue-600" />
                                        Export Intelligence
                                    </Button>
                                </div>
                            </div>

                            {listCompanies.length > 0 ? (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-xl font-black tracking-tight">Synchronized Signals</h2>
                                        <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                            Table View
                                        </span>
                                    </div>
                                    <CompanyTable companies={listCompanies} />
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-[32px] py-32 flex flex-col items-center justify-center text-center px-10 shadow-soft">
                                    <div className="w-20 h-20 rounded-[28px] bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center text-slate-200 dark:text-slate-700 mb-8 border border-slate-100/50 dark:border-slate-800">
                                        <Search className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-slate-100">Archive Empty</h3>
                                    <p className="text-muted-foreground max-w-sm mt-3 font-medium">
                                        No intelligence identifies have been indexed into this repository yet.
                                    </p>
                                    <Button variant="default" className="mt-10 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black px-10 h-14 shadow-lg shadow-blue-500/20" asChild>
                                        <a href="/companies">Analyze Market</a>
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-center px-6">
                            <div className="max-w-xs space-y-4 opacity-40">
                                <ListTodo className="w-12 h-12 mx-auto text-slate-400" />
                                <p className="text-sm font-bold uppercase tracking-[0.2em]">Select Repository</p>
                                <p className="text-xs font-medium">Choose an archive from the sidebar to view synchronized signals.</p>
                            </div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
