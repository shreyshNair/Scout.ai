"use client";

import * as React from "react";
import {
    User,
    Mail,
    Shield,
    Bell,
    Moon,
    Sun,
    Monitor,
    Camera,
    MapPin,
    Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    const handleSave = () => {
        toast.success("Profile updated successfully");
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar Tabs (Mock) */}
                <div className="space-y-1">
                    {[
                        { name: "Profile", icon: User, active: true },
                        { name: "Account", icon: Mail },
                        { name: "Security", icon: Shield },
                        { name: "Notifications", icon: Bell },
                    ].map((item) => (
                        <button
                            key={item.name}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                                item.active
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                    : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="md:col-span-2 space-y-6">
                    {/* Profile Section */}
                    <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft">
                        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <User className="w-5 h-5 text-blue-600" />
                            Public Profile
                        </h2>

                        <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                            <div className="relative group">
                                <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-pink-400 to-amber-300 border-4 border-white dark:border-slate-800 shadow-xl overflow-hidden" />
                                <button className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="w-6 h-6 text-white" />
                                </button>
                            </div>
                            <div className="space-y-1 mt-2">
                                <h3 className="font-bold text-xl">Lucy Lure</h3>
                                <p className="text-sm text-muted-foreground">Principal Analyst @ Alpha Ventures</p>
                                <div className="flex items-center gap-3 mt-4">
                                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                        Super User
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="full-name">Full Name</Label>
                                <Input id="full-name" defaultValue="Lucy Lure" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" defaultValue="lucy@alphaventures.vc" />
                            </div>
                            <div className="space-y-2 sm:col-span-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    placeholder="Tell us about yourself..."
                                    defaultValue="Focused on early-stage SaaS and Infrastructure. Hunting for the next unicorn in DevOps."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input id="location" className="pl-9" defaultValue="San Francisco, CA" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="job">Occupation</Label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <Input id="job" className="pl-9" defaultValue="Principal Venture Analyst" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8">Save Changes</Button>
                        </div>
                    </section>

                    {/* Theme Section */}
                    <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft">
                        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <Monitor className="w-5 h-5 text-blue-600" />
                            Appearance
                        </h2>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { id: "light", label: "Light", icon: Sun, color: "bg-slate-50" },
                                { id: "dark", label: "Dark", icon: Moon, color: "bg-slate-950" },
                                { id: "system", label: "System", icon: Monitor, color: "bg-gradient-to-br from-slate-50 to-slate-950" },
                            ].map((mode) => (
                                <button
                                    key={mode.id}
                                    onClick={() => mounted && setTheme(mode.id)}
                                    className={cn(
                                        "relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all",
                                        mounted && theme === mode.id
                                            ? "border-blue-600 bg-blue-50 dark:bg-blue-900/10"
                                            : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
                                    )}
                                >
                                    <div className={cn("h-12 w-full rounded-lg shadow-sm flex items-center justify-center", mode.color)}>
                                        <mode.icon className={cn("w-5 h-5", mounted && theme === mode.id ? "text-blue-600" : "text-slate-400")} />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider">{mode.label}</span>
                                    {mounted && theme === mode.id && (
                                        <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-600" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
