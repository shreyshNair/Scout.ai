"use client";

import * as React from "react";
import { useSavedSearches } from "@/hooks/useSavedSearches";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Trash2,
    Play,
    Calendar,
    Filter as FilterIcon
} from "lucide-react";
import { format, parseISO } from "date-fns";

export default function SavedSearchesPage() {
    const { searches, deleteSearch } = useSavedSearches();
    const router = useRouter();

    const handleReRun = (search: any) => {
        router.push(`/companies${search.urlParams || ''}`);
    };

    return (
        <div className="p-8 max-w-6xl mx-auto pb-20">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold tracking-tight">Saved Searches</h1>
                <p className="text-muted-foreground text-sm">
                    Quickly re-run your most frequent sourcing queries.
                </p>
            </div>

            {searches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searches.map((search) => (
                        <Card key={search.id} className="group hover:border-blue-200 transition-all shadow-sm flex flex-col">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="p-2 rounded-md bg-blue-50 text-blue-600">
                                        <Search className="w-4 h-4" />
                                    </div>
                                    <button
                                        onClick={() => deleteSearch(search.id)}
                                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <CardTitle className="text-lg mt-3 truncate">{search.name}</CardTitle>
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                                    <Calendar className="w-3 h-3" />
                                    Saved on {format(parseISO(search.savedAt), 'MMM d, yyyy')}
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="space-y-3">
                                    {search.query && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Query:</span>
                                            <span className="text-xs font-medium text-slate-700">"{search.query}"</span>
                                        </div>
                                    )}
                                    <div className="flex flex-wrap gap-1.5">
                                        {search.filters.stage.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 w-full mb-1">Stages</span>
                                                {search.filters.stage.map((s: string) => (
                                                    <Badge key={s} variant="secondary" className="text-[9px] px-1.5 py-0 bg-blue-50 text-blue-700 border-blue-100">
                                                        {s}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                        {search.filters.sector.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 w-full mb-1">Sectors</span>
                                                {search.filters.sector.map((s: string) => (
                                                    <Badge key={s} variant="secondary" className="text-[9px] px-1.5 py-0 bg-emerald-50 text-emerald-700 border-emerald-100">
                                                        {s}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                        {search.filters.geography.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 w-full mb-1">Geographies</span>
                                                {search.filters.geography.map((s: string) => (
                                                    <Badge key={s} variant="secondary" className="text-[9px] px-1.5 py-0 bg-amber-50 text-amber-700 border-amber-100">
                                                        {s}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                        {search.filters.headcount !== 'All' && (
                                            <div className="flex flex-wrap gap-1">
                                                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 w-full mb-1">Size</span>
                                                <Badge variant="secondary" className="text-[9px] px-1.5 py-0 bg-purple-50 text-purple-700 border-purple-100">
                                                    {search.filters.headcount}
                                                </Badge>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="pt-0">
                                <Button
                                    onClick={() => handleReRun(search)}
                                    className="w-full bg-slate-900 group-hover:bg-blue-600 transition-colors"
                                >
                                    <Play className="w-3.5 h-3.5 mr-2" />
                                    Re-run Search
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-dashed rounded-2xl">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                        <Search className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold">No saved searches</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-6">
                        Save your filter configurations from the Companies page to see them here.
                    </p>
                    <Button variant="outline" asChild>
                        <a href="/companies">Go to Companies</a>
                    </Button>
                </div>
            )}
        </div>
    );
}
