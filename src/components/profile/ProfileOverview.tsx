"use client";

import { Company } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Users, Calendar, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProfileOverviewProps {
    company: Company;
}

export function ProfileOverview({ company }: ProfileOverviewProps) {
    return (
        <div className="space-y-10">
            <Link
                href="/companies"
                className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-blue-600 transition-all"
            >
                <div className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:border-blue-600/30 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
                    <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" />
                </div>
                Back to Intelligence
            </Link>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
                        <div className="w-20 h-20 rounded-[2rem] bg-blue-600 dark:bg-blue-500 shadow-xl shadow-blue-500/20 flex items-center justify-center text-white font-black text-3xl shrink-0">
                            {company.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-5xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-white dark:to-slate-400">
                                {company.name}
                            </h1>
                            <p className="text-xl text-slate-500 dark:text-slate-400 font-bold tracking-tight">{company.oneLiner}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Badge className="rounded-full px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50 text-[10px] font-black uppercase tracking-widest">
                            {company.sector}
                        </Badge>
                        <Badge className="rounded-full px-4 py-1.5 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest">
                            {company.stage}
                        </Badge>
                        <Badge className="rounded-full px-4 py-1.5 bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                            <MapPin className="w-3 h-3" />
                            {company.geography}
                        </Badge>
                    </div>
                </div>

                <div className="flex shrink-0">
                    <Button variant="outline" className="rounded-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft h-12 px-8 font-black text-xs uppercase tracking-widest gap-3 hover:border-blue-200 dark:hover:border-blue-800 hover:text-blue-600 transition-all" asChild>
                        <a href={company.website} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 text-blue-600" />
                            Visit Platform
                        </a>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-10 border-y border-slate-100 dark:border-slate-800/50">
                {[
                    { label: "Growth Capital", value: company.headcount, icon: Users, sub: "Headcount" },
                    { label: "Origin Epoch", value: company.foundedYear, icon: Calendar, sub: "Founded" },
                    { label: "Digital Domain", value: new URL(company.website).hostname, icon: ExternalLink, sub: "Identity" },
                ].map((stat, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-black">
                            <stat.icon className="w-3.5 h-3.5" />
                            {stat.label}
                        </div>
                        <div>
                            <div className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-200">{stat.value}</div>
                            <div className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest mt-0.5">{stat.sub}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Executive Summary</h3>
                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800/50" />
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg max-w-4xl">{company.description}</p>
            </div>
        </div>
    );
}
