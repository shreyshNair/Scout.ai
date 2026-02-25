"use client";

import { Signal } from "@/lib/types";
import {
    CircleDollarSign,
    UserPlus,
    Rocket,
    Newspaper,
    Circle
} from "lucide-react";
import { format, parseISO } from "date-fns";

interface SignalsTimelineProps {
    signals: Signal[];
}

const signalIcons = {
    funding: CircleDollarSign,
    hire: UserPlus,
    product: Rocket,
    press: Newspaper,
};

const signalColors = {
    funding: "text-emerald-600 bg-emerald-50 border-emerald-100",
    hire: "text-blue-600 bg-blue-50 border-blue-100",
    product: "text-purple-600 bg-purple-50 border-purple-100",
    press: "text-amber-600 bg-amber-50 border-amber-100",
};

export function SignalsTimeline({ signals }: SignalsTimelineProps) {
    // Sort signals by date descending
    const sortedSignals = [...signals].sort((a, b) =>
        parseISO(b.date).getTime() - parseISO(a.date).getTime()
    );

    return (
        <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Signals Timeline</h3>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {sortedSignals.map((signal, idx) => {
                    const Icon = signalIcons[signal.type];
                    return (
                        <div key={idx} className="relative">
                            <div className="absolute -left-[1.65rem] top-1 h-3 w-3 rounded-full border-2 border-white bg-blue-600" />
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <div className={`p-1.5 rounded-md border ${signalColors[signal.type]}`}>
                                        <Icon className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                        {signal.type} • {format(parseISO(signal.date), 'MMM d, yyyy')}
                                    </span>
                                </div>
                                <p className="text-sm font-medium text-slate-900 leading-snug">
                                    {signal.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
