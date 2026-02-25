"use client";

import { Company } from "@/lib/types";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ScorePanelProps {
    company: Company;
}

export function ScorePanel({ company }: ScorePanelProps) {
    const getScoreColor = (score: number) => {
        if (score >= 75) return "text-emerald-600 dark:text-emerald-400";
        if (score >= 50) return "text-amber-600 dark:text-amber-400";
        return "text-rose-600 dark:text-rose-400";
    };

    const getCircleColor = (score: number) => {
        if (score >= 75) return "stroke-emerald-500";
        if (score >= 50) return "stroke-amber-500";
        return "stroke-rose-500";
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-soft transition-all duration-300">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-8 text-center">
                Thesis Match Score
            </h3>

            <div className="flex flex-col items-center mb-8">
                <div className="relative h-40 w-40">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                            className="stroke-slate-100 dark:stroke-slate-800"
                            strokeWidth="6"
                            fill="transparent"
                            r="42"
                            cx="50"
                            cy="50"
                        />
                        <motion.circle
                            initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - company.score / 100) }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={cn("transition-all", getCircleColor(company.score))}
                            strokeWidth="8"
                            strokeDasharray={2 * Math.PI * 42}
                            strokeLinecap="round"
                            fill="transparent"
                            r="42"
                            cx="50"
                            cy="50"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={cn("text-5xl font-black tracking-tighter", getScoreColor(company.score))}>
                            {company.score}
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mt-1">Percentile</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {company.scoreReasons.map((reason, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/30 transition-all">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <Check className="w-3 h-3 text-emerald-500" />
                        </div>
                        <span className="text-xs text-slate-700 dark:text-slate-300 font-bold tracking-tight leading-none">{reason}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
