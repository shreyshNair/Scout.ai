"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, AlertCircle, CheckCircle2, Zap } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface EnrichmentPanelProps {
    companyId: string;
    website: string;
}

export function EnrichmentPanel({ companyId, website }: EnrichmentPanelProps) {
    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState<any>(null);
    const [error, setError] = React.useState<string | null>(null);

    const handleEnrich = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/enrich', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ website })
            });

            if (!response.ok) throw new Error('Enrichment failed');

            const data = await response.json();
            setResult(data);

            toast.success("Intelligence Synchronized", {
                description: `Deep analysis of ${new URL(website).hostname} completed.`
            });
        } catch (err: any) {
            const msg = err.message || "Something went wrong during enrichment.";
            setError(msg);
            toast.error("Process Failed", { description: msg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft overflow-hidden transition-all duration-300">
            <div className="p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black tracking-tight">Live Enrichment</h3>
                            <p className="text-xs text-muted-foreground font-medium">Powered by Anthropic Intelligence</p>
                        </div>
                    </div>
                </div>

                {!result && !loading && !error && (
                    <div className="py-10 flex flex-col items-center text-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-2">
                            <Zap className="w-8 h-8 text-blue-500 opacity-20" />
                        </div>
                        <p className="text-sm text-slate-500 max-w-[280px]">
                            Extract deep market context, growth signals, and competitive positioning.
                        </p>
                        <Button
                            onClick={handleEnrich}
                            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 font-bold px-8 h-12 gap-2"
                        >
                            <Sparkles className="w-4 h-4" />
                            Enrich
                        </Button>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            className="py-12 flex flex-col items-center gap-6"
                        >
                            <div className="relative">
                                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                                <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-blue-400 rounded-full blur-xl"
                                />
                            </div>
                            <div className="space-y-1">
                                <p className="font-bold tracking-tight">Synchronizing data points...</p>
                                <p className="text-xs text-muted-foreground animate-pulse text-center">Identifying growth vectors</p>
                            </div>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-800/50 flex flex-col items-center gap-4 text-center"
                        >
                            <AlertCircle className="w-8 h-8 text-rose-500" />
                            <div className="space-y-1">
                                <p className="font-bold text-rose-900 dark:text-rose-100">Analysis Halted</p>
                                <p className="text-xs text-rose-600 dark:text-rose-400">{error}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleEnrich} className="text-rose-600 hover:text-rose-700 hover:bg-rose-100 dark:hover:bg-rose-900/20 rounded-lg">
                                Attempt Re-sync
                            </Button>
                        </motion.div>
                    )}

                    {result && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 space-y-1">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Market Position</p>
                                    <p className="font-bold text-sm leading-tight text-blue-600 dark:text-blue-400">{result.oneLiner}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 space-y-1">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Competitors Identified</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {result.competitors?.map((c: string) => (
                                            <span key={c} className="text-[10px] bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-medium">
                                                {c}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 flex items-start gap-3">
                                <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5" />
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-600/70">Strategic Advantage</p>
                                    <p className="text-sm font-medium leading-relaxed">{result.strategicValue}</p>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setResult(null)}
                                className="w-full rounded-xl border-slate-200 dark:border-slate-800 h-10 font-bold text-[10px] uppercase tracking-widest"
                            >
                                Clear Analysis
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
