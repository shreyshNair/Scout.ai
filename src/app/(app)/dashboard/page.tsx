"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { mockCompanies } from "@/lib/mock-data";
import { useUser } from "@/context/UserContext";
import {
    Building2,
    TrendingUp,
    Globe,
    Users,
    Sparkles,
    ArrowUpRight,
    Clock,
    CheckCircle2,
    Circle,
    ChevronRight,
    Star,
    MoreHorizontal,
    Filter,
    Zap,
    Plus,
    Trash2,
    X,
    PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] as const } },
};
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
};

// ── Helpers ──────────────────────────────────────────────────────────────────
function initials(name: string) {
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function PriBadge({ p }: { p: "high" | "med" | "low" }) {
    if (p === "high") return <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-500 dark:text-red-400">High</span>;
    if (p === "med") return <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400">Med</span>;
    return <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400">Low</span>;
}

// ── Donut chart ───────────────────────────────────────────────────────────────
const sectorData = [
    { label: "AI/ML", pct: 44, color: "#6366f1" },
    { label: "B2B SaaS", pct: 22, color: "#22d3ee" },
    { label: "Fintech", pct: 18, color: "#f59e0b" },
    { label: "Dev Tools", pct: 10, color: "#34d399" },
    { label: "Other", pct: 6, color: "#94a3b8" },
];

function DonutChart() {
    const size = 88, r = 30, cx = size / 2, cy = size / 2;
    const circ = 2 * Math.PI * r;
    let offset = 0;
    const slices = sectorData.map((d) => {
        const len = (d.pct / 100) * circ;
        const s = { ...d, offset, len };
        offset += len;
        return s;
    });
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
            {slices.map((s) => (
                <circle key={s.label} cx={cx} cy={cy} r={r} fill="none"
                    stroke={s.color} strokeWidth={10}
                    strokeDasharray={`${s.len} ${circ - s.len}`}
                    strokeDashoffset={-s.offset} />
            ))}
        </svg>
    );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub }: { icon: React.ElementType; label: string; value: string | number; sub: string }) {
    return (
        <motion.div variants={fadeUp} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-11 w-11 rounded-2xl flex items-center justify-center shrink-0 bg-slate-900">
                <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
                <p className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{value}</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
            </div>
        </motion.div>
    );
}

interface Task {
    id: string;
    company: string;
    action: string;
    priority: "high" | "med" | "low";
    done: boolean;
}

interface Reminder {
    id: string;
    time: string;
    label: string;
    priority: "high" | "med" | "low";
}

const INITIAL_TASKS: Task[] = [
    { id: "1", company: "Mistral AI", action: "Review pitch deck", priority: "high", done: false },
    { id: "2", company: "ElevenLabs", action: "Send term sheet", priority: "high", done: false },
    { id: "3", company: "Runway", action: "Schedule partner call", priority: "med", done: true },
    { id: "4", company: "PostHog", action: "Due diligence checklist", priority: "low", done: false },
    { id: "5", company: "Cal.com", action: "Initial outreach email", priority: "low", done: true },
];

const INITIAL_REMINDERS: Reminder[] = [
    { id: "1", time: "10:00 AM", label: "Partner meeting — AI/ML round", priority: "high" },
    { id: "2", time: "01:00 PM", label: "Term sheet call: ElevenLabs", priority: "high" },
    { id: "3", time: "04:15 PM", label: "Update deal memo: Runway", priority: "med" },
];

const recentCompanies = mockCompanies.slice(0, 5);

// ═════════════════════════════════════════════════════════════════════════════
export default function DashboardPage() {
    const { profile } = useUser();
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [reminders, setReminders] = React.useState<Reminder[]>([]);
    const [isAddingTask, setIsAddingTask] = React.useState(false);
    const [isAddingReminder, setIsAddingReminder] = React.useState(false);
    const [editingTask, setEditingTask] = React.useState<Task | null>(null);
    const [editingReminder, setEditingReminder] = React.useState<Reminder | null>(null);

    // Form states
    const [newTask, setNewTask] = React.useState<{ company: string; action: string; priority: "high" | "med" | "low" }>({ company: "", action: "", priority: "med" });
    const [newReminder, setNewReminder] = React.useState<{ time: string; ampm: "AM" | "PM"; label: string; priority: "high" | "med" | "low" }>({ time: "09:00", ampm: "AM", label: "", priority: "med" });

    // Load from localStorage
    React.useEffect(() => {
        const savedTasks = localStorage.getItem("scout_tasks");
        const savedReminders = localStorage.getItem("scout_reminders");
        if (savedTasks) setTasks(JSON.parse(savedTasks));
        else setTasks(INITIAL_TASKS);

        if (savedReminders) setReminders(JSON.parse(savedReminders));
        else setReminders(INITIAL_REMINDERS);
    }, []);

    // Save to localStorage
    React.useEffect(() => {
        if (tasks.length > 0 || localStorage.getItem("scout_tasks")) {
            localStorage.setItem("scout_tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

    React.useEffect(() => {
        if (reminders.length > 0 || localStorage.getItem("scout_reminders")) {
            localStorage.setItem("scout_reminders", JSON.stringify(reminders));
        }
    }, [reminders]);

    const totalCompanies = mockCompanies.length;
    const stages = [...new Set(mockCompanies.map((c) => c.stage))].length;
    const sectors = [...new Set(mockCompanies.map((c) => c.sector))].length;

    const greeting = () => {
        const h = new Date().getHours();
        if (h < 12) return "Good morning";
        if (h < 17) return "Good afternoon";
        return "Good evening";
    };

    const addTask = () => {
        if (!newTask.action) return;
        const task: Task = {
            id: Math.random().toString(36).substr(2, 9),
            ...newTask,
            done: false
        };
        setTasks(prev => [task, ...prev]);
        setNewTask({ company: "", action: "", priority: "med" });
        setIsAddingTask(false);
    };

    const updateTask = () => {
        if (!editingTask || !editingTask.action) return;
        setTasks(prev => prev.map(t => t.id === editingTask.id ? editingTask : t));
        setEditingTask(null);
    };

    const deleteTask = (id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const toggleTask = (id: string) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const addReminder = () => {
        if (!newReminder.label) return;
        const reminder: Reminder = {
            id: Math.random().toString(36).substr(2, 9),
            time: `${newReminder.time} ${newReminder.ampm}`,
            label: newReminder.label,
            priority: newReminder.priority
        };
        setReminders(prev => [...prev, reminder].sort((a, b) => a.time.localeCompare(b.time)));
        setNewReminder({ time: "09:00", ampm: "AM", label: "", priority: "med" });
        setIsAddingReminder(false);
    };

    const updateReminder = () => {
        if (!editingReminder || !editingReminder.label) return;
        setReminders(prev => prev.map(r => r.id === editingReminder.id ? editingReminder : r).sort((a, b) => a.time.localeCompare(b.time)));
        setEditingReminder(null);
    };

    const deleteReminder = (id: string) => {
        setReminders(prev => prev.filter(r => r.id !== id));
    };

    return (
        <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">

            {/* ── Hero greeting ─────────────────────────────────────────── */}
            <motion.div variants={fadeUp} initial="hidden" animate="show"
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                        {greeting()}, {profile.name.split(" ")[0]}
                    </h1>
                    <p className="text-muted-foreground mt-1">Here&apos;s what&apos;s happening in your pipeline today.</p>
                </div>
                <Link href="/companies">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl gap-2">
                        <Sparkles className="w-4 h-4" />
                        Explore Companies
                    </Button>
                </Link>
            </motion.div>

            {/* ── Stat cards ────────────────────────────────────────────── */}
            <motion.div variants={stagger} initial="hidden" animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Building2} label="Companies Tracked" value={totalCompanies} sub="In your database" />
                <StatCard icon={TrendingUp} label="Funding Stages" value={stages} sub="Seed to Series C+" />
                <StatCard icon={Globe} label="Sectors Covered" value={sectors} sub="Across all verticals" />
                <StatCard icon={Users} label="Saved Searches" value={3} sub="Active filters" />
            </motion.div>

            {/* ── Main 2-column grid ────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* Left: Recent Companies + Quick Actions + AI card */}
                <div className="lg:col-span-2 space-y-4">

                    {/* Recent Companies */}
                    <motion.div variants={fadeUp} initial="hidden" animate="show"
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-slate-400" />
                                <h2 className="text-sm font-black text-slate-900 dark:text-white">Recent Companies</h2>
                            </div>
                            <Link href="/companies" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5">
                                View all <ChevronRight className="w-3 h-3" />
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentCompanies.map((company) => (
                                <Link key={company.id} href={`/companies/${company.id}`}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors group">
                                    <div className="h-9 w-9 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
                                        <span className="text-[10px] font-black text-white">{initials(company.name)}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{company.name}</p>
                                        <p className="text-xs text-slate-400 truncate">{company.sector} · {company.stage}</p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className="text-xs font-black text-blue-600 dark:text-blue-400">{company.score}</span>
                                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div variants={stagger} initial="hidden" animate="show"
                        className="grid grid-cols-3 gap-3">
                        {[
                            { label: "Explore Companies", href: "/companies", icon: Building2, color: "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400" },
                            { label: "My Lists", href: "/lists", icon: Star, color: "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400" },
                            { label: "Saved Searches", href: "/saved", icon: Filter, color: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
                        ].map((q) => (
                            <motion.div key={q.label} variants={fadeUp}>
                                <Link href={q.href}
                                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all text-center group">
                                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${q.color}`}>
                                        <q.icon className="w-5 h-5" />
                                    </div>
                                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{q.label}</p>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* AI Insights promo */}
                    <motion.div variants={fadeUp} initial="hidden" animate="show"
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-6 text-white shadow-lg shadow-blue-500/20">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23ffffff opacity=0.05%3E%3Cpath d=M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />
                        <div className="relative flex items-start gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-black">AI Deal Insights</h3>
                                <p className="text-sm text-white/70 mt-1">Get AI-powered analysis on any company in your pipeline — signals, risks, and thesis fit in seconds.</p>
                                <Link href="/companies">
                                    <button className="mt-3 text-xs font-bold bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5">
                                        <Zap className="w-3 h-3" /> Try AI Analysis
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Tasks + Reminders + Sector Mix */}
                <div className="space-y-4">

                    {/* Pipeline tasks */}
                    <motion.div variants={fadeUp} initial="hidden" animate="show"
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Today's Tasks</span>
                                <button onClick={() => setIsAddingTask(true)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600 transition-colors">
                                    <PlusCircle className="w-4 h-4" />
                                </button>
                            </div>
                            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">{tasks.filter(t => t.done).length}/{tasks.length}</span>
                        </div>
                        <div className="space-y-2">
                            {tasks.map((t) => (
                                <div key={t.id} className="flex items-start gap-2.5 group">
                                    <button onClick={() => toggleTask(t.id)} className="shrink-0">
                                        {t.done
                                            ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                                            : <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600 mt-0.5" />}
                                    </button>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-semibold truncate ${t.done ? "line-through text-slate-400 dark:text-slate-600" : "text-slate-800 dark:text-slate-200"}`}>{t.action}</p>
                                        <p className="text-[10px] text-slate-400">{t.company}</p>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <PriBadge p={t.priority} />
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                            <button onClick={() => setEditingTask(t)} className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                                                <MoreHorizontal className="w-3 h-3" />
                                            </button>
                                            <button onClick={() => deleteTask(t.id)} className="p-1 rounded-md hover:bg-red-50 text-red-400 hover:text-red-500">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {tasks.length === 0 && (
                                <p className="text-center py-4 text-xs text-slate-400 italic">No tasks for today. Chill out!</p>
                            )}
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                            <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full transition-all duration-500"
                                    style={{ width: `${tasks.length > 0 ? (tasks.filter(t => t.done).length / tasks.length) * 100 : 0}%` }} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Reminders */}
                    <motion.div variants={fadeUp} initial="hidden" animate="show"
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Reminders</span>
                            </div>
                            <button onClick={() => setIsAddingReminder(true)} className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline">Manage</button>
                        </div>
                        <div className="space-y-2">
                            {reminders.map((r) => (
                                <div key={r.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 group">
                                    <div className="shrink-0 text-center w-12 border-r border-slate-200 dark:border-slate-700 pr-2">
                                        <p className="text-[10px] font-black text-slate-900 dark:text-white">
                                            {r.time.split(" ")[0]}
                                        </p>
                                        <p className="text-[9px] text-slate-400 uppercase font-bold">{r.time.split(" ")[1]}</p>
                                    </div>
                                    <p className="flex-1 text-[11px] font-semibold text-slate-700 dark:text-slate-200 leading-tight min-w-0 truncate">{r.label}</p>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <PriBadge p={r.priority} />
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                            <button onClick={() => {
                                                const [time, ampm] = r.time.split(" ");
                                                setEditingReminder({ ...r, time, ampm: ampm as "AM" | "PM" });
                                            }} className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600">
                                                <MoreHorizontal className="w-3 h-3" />
                                            </button>
                                            <button onClick={() => deleteReminder(r.id)} className="p-1 rounded-md hover:bg-red-50 text-red-400 hover:text-red-500">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {reminders.length === 0 && (
                                <p className="text-center py-4 text-xs text-slate-400 italic">No reminders. All clear!</p>
                            )}
                        </div>
                    </motion.div>

                    {/* Sector Mix */}
                    <motion.div variants={fadeUp} initial="hidden" animate="show"
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5 text-slate-400" />
                                <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Sector Mix</span>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400">{totalCompanies} co.</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative shrink-0">
                                <DonutChart />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-base font-black text-slate-900 dark:text-white">44<span className="text-[9px] text-slate-400">%</span></span>
                                </div>
                            </div>
                            <div className="space-y-1.5 flex-1 min-w-0">
                                {sectorData.map((s) => (
                                    <div key={s.label} className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            <div className="h-2 w-2 rounded-full shrink-0" style={{ background: s.color }} />
                                            <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{s.label}</span>
                                        </div>
                                        <span className="text-[11px] font-bold text-slate-900 dark:text-white shrink-0">{s.pct}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* ── Modals ── */}
            {/* Add/Edit Task Modal */}
            {(isAddingTask || editingTask) && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-slate-900 rounded-[28px] shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-sm overflow-hidden text-slate-900 dark:text-white">
                        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-black">{editingTask ? "Edit Task" : "Add New Task"}</h3>
                            <button onClick={() => { setIsAddingTask(false); setEditingTask(null); }} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Action</label>
                                <input type="text"
                                    value={editingTask ? editingTask.action : newTask.action}
                                    onChange={e => editingTask ? setEditingTask({ ...editingTask, action: e.target.value }) : setNewTask(n => ({ ...n, action: e.target.value }))}
                                    placeholder="Review pitch deck..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Company (Optional)</label>
                                <input type="text"
                                    value={editingTask ? editingTask.company : newTask.company}
                                    onChange={e => editingTask ? setEditingTask({ ...editingTask, company: e.target.value }) : setNewTask(n => ({ ...n, company: e.target.value }))}
                                    placeholder="e.g. OpenAI"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Priority</label>
                                <div className="flex gap-2">
                                    {(["low", "med", "high"] as const).map(p => (
                                        <button key={p}
                                            onClick={() => editingTask ? setEditingTask({ ...editingTask, priority: p }) : setNewTask(n => ({ ...n, priority: p }))}
                                            className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${(editingTask ? editingTask.priority : newTask.priority) === p ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200"}`}>{p}</button>
                                    ))}
                                </div>
                            </div>
                            <button onClick={editingTask ? updateTask : addTask} className="w-full py-3.5 mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xl shadow-blue-500/20 transition-all">
                                {editingTask ? "Update Task" : "Create Task"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Add/Edit Reminder Modal */}
            {(isAddingReminder || editingReminder) && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-slate-900 rounded-[28px] shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-sm overflow-hidden text-slate-900 dark:text-white">
                        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-black">{editingReminder ? "Edit Reminder" : "Add Reminder"}</h3>
                            <button onClick={() => { setIsAddingReminder(false); setEditingReminder(null); }} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Reminder Note</label>
                                <input type="text"
                                    value={editingReminder ? editingReminder.label : newReminder.label}
                                    onChange={e => editingReminder ? setEditingReminder({ ...editingReminder, label: e.target.value }) : setNewReminder(r => ({ ...r, label: e.target.value }))}
                                    placeholder="Partner meeting..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" />
                            </div>
                            <div className="flex gap-3">
                                <div className="flex-1 space-y-1">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Time</label>
                                    <input type="time"
                                        value={editingReminder ? editingReminder.time : newReminder.time}
                                        onChange={e => editingReminder ? setEditingReminder({ ...editingReminder, time: e.target.value }) : setNewReminder(r => ({ ...r, time: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Period</label>
                                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                                        {["AM", "PM"].map(p => (
                                            <button key={p}
                                                onClick={() => editingReminder ? setEditingReminder({ ...editingReminder, ampm: p as any }) : setNewReminder(r => ({ ...r, ampm: p as any }))}
                                                className={`px-3 py-2 rounded-lg text-[10px] font-bold transition-all ${(editingReminder ? editingReminder.ampm : newReminder.ampm) === p ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-500"}`}>{p}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Priority</label>
                                <div className="flex gap-2">
                                    {(["low", "med", "high"] as const).map(p => (
                                        <button key={p}
                                            onClick={() => editingReminder ? setEditingReminder({ ...editingReminder, priority: p }) : setNewReminder(r => ({ ...r, priority: p }))}
                                            className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${(editingReminder ? editingReminder.priority : newReminder.priority) === p ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200"}`}>{p}</button>
                                    ))}
                                </div>
                            </div>
                            <button onClick={editingReminder ? updateReminder : addReminder} className="w-full py-3.5 mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-xl shadow-blue-500/20 transition-all">
                                {editingReminder ? "Update Reminder" : "Create Reminder"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
