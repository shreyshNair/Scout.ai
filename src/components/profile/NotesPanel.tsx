"use client";

import * as React from "react";
import { getNotes, saveNotes } from "@/lib/storage";
import { Sparkles } from "lucide-react";

interface NotesPanelProps {
    companyId: string;
}

export function NotesPanel({ companyId }: NotesPanelProps) {
    const [notes, setNotes] = React.useState("");
    const [isSaved, setIsSaved] = React.useState(false);

    React.useEffect(() => {
        setNotes(getNotes(companyId));
    }, [companyId]);

    const handleBlur = () => {
        saveNotes(companyId, notes);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 transition-colors">Analyst Intelligence Notes</h3>
                {isSaved && (
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-500 font-black uppercase tracking-widest animate-in fade-in slide-in-from-right-2">
                        <div className="w-1 h-1 rounded-full bg-emerald-500" />
                        Synchronized
                    </div>
                )}
            </div>

            <div className="relative group">
                <textarea
                    className="w-full min-h-[200px] p-6 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-soft resize-none font-medium leading-relaxed"
                    placeholder="Capture strategic context... (autosaves on focus loss)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onBlur={handleBlur}
                />
                <div className="absolute right-6 bottom-6 opacity-20 pointer-events-none group-focus-within:opacity-40 transition-opacity">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                </div>
            </div>
        </div>
    );
}
