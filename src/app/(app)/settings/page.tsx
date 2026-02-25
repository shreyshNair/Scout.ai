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
    Briefcase,
    Key,
    Smartphone,
    Globe,
    Lock,
    AlertTriangle,
    Check,
    CreditCard,
    Trash2,
    BellRing,
    BellOff,
    MessageSquare,
    TrendingUp,
    Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

type Tab = "profile" | "account" | "security" | "notifications";

const tabs = [
    { id: "profile" as Tab, name: "Profile", icon: User },
    { id: "account" as Tab, name: "Account", icon: Mail },
    { id: "security" as Tab, name: "Security", icon: Shield },
    { id: "notifications" as Tab, name: "Notifications", icon: Bell },
];

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState<Tab>("profile");
    const { profile, updateProfile } = useUser();

    const [form, setForm] = React.useState({
        name: profile.name,
        email: profile.email,
        title: profile.title,
        location: profile.location,
        occupation: profile.occupation,
        bio: profile.bio,
    });

    React.useEffect(() => {
        setForm({
            name: profile.name,
            email: profile.email,
            title: profile.title,
            location: profile.location,
            occupation: profile.occupation,
            bio: profile.bio,
        });
    }, [profile.name, profile.email, profile.title, profile.location, profile.occupation, profile.bio]);

    React.useEffect(() => setMounted(true), []);

    const handleChange = (field: keyof typeof form) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSave = () => {
        updateProfile(form);
        toast.success("Profile updated successfully");
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Sidebar Tabs */}
                <div className="space-y-1">
                    {tabs.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                                activeTab === item.id
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                    : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="md:col-span-2 space-y-6">

                    {/* ── PROFILE ── */}
                    {activeTab === "profile" && (
                        <>
                            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                                    <User className="w-5 h-5 text-blue-600" />
                                    Public Profile
                                </h2>

                                <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                                    <div className="relative group">
                                        <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500 border-4 border-white dark:border-slate-800 shadow-xl flex items-center justify-center">
                                            <span className="text-2xl font-black text-white select-none">
                                                {form.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)}
                                            </span>
                                        </div>
                                        <button className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Camera className="w-6 h-6 text-white" />
                                        </button>
                                    </div>
                                    <div className="space-y-1 mt-2">
                                        <h3 className="font-bold text-xl">{form.name}</h3>
                                        <p className="text-sm text-muted-foreground">{form.title} @ Alpha Ventures</p>
                                        <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mt-4">
                                            Super User
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2"><Label htmlFor="full-name">Full Name</Label><Input id="full-name" value={form.name} onChange={handleChange("name")} /></div>
                                    <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" value={form.email} onChange={handleChange("email")} /></div>
                                    <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" value={form.title} onChange={handleChange("title")} /></div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location">Location</Label>
                                        <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><Input id="location" className="pl-9" value={form.location} onChange={handleChange("location")} /></div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="job">Occupation</Label>
                                        <div className="relative"><Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><Input id="job" className="pl-9" value={form.occupation} onChange={handleChange("occupation")} /></div>
                                    </div>
                                    <div className="space-y-2 sm:col-span-2"><Label htmlFor="bio">Bio</Label><Textarea id="bio" value={form.bio} onChange={handleChange("bio")} /></div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8">Save Changes</Button>
                                </div>
                            </section>

                            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2"><Monitor className="w-5 h-5 text-blue-600" />Appearance</h2>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { id: "light", label: "Light", icon: Sun, color: "bg-slate-50" },
                                        { id: "dark", label: "Dark", icon: Moon, color: "bg-slate-950" },
                                        { id: "system", label: "System", icon: Monitor, color: "bg-gradient-to-br from-slate-50 to-slate-950" },
                                    ].map((mode) => (
                                        <button key={mode.id} onClick={() => mounted && setTheme(mode.id)} className={cn("relative flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all", mounted && theme === mode.id ? "border-blue-600 bg-blue-50 dark:bg-blue-900/10" : "border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700")}>
                                            <div className={cn("h-12 w-full rounded-lg shadow-sm flex items-center justify-center", mode.color)}>
                                                <mode.icon className={cn("w-5 h-5", mounted && theme === mode.id ? "text-blue-600" : "text-slate-400")} />
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-wider">{mode.label}</span>
                                            {mounted && theme === mode.id && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-600" />}
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </>
                    )}

                    {/* ── ACCOUNT ── */}
                    {activeTab === "account" && (
                        <>
                            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2"><Mail className="w-5 h-5 text-blue-600" />Account Details</h2>
                                <div className="space-y-4">
                                    <div className="space-y-2"><Label>Primary Email</Label><Input defaultValue={profile.email} /></div>
                                    <div className="space-y-2"><Label>Display Language</Label>
                                        <div className="relative"><Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <select className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                <option>English (US)</option><option>English (UK)</option><option>French</option><option>German</option><option>Spanish</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2"><Label>Timezone</Label>
                                        <select className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option>UTC-8 Pacific Time</option><option>UTC-5 Eastern Time</option><option>UTC+0 London</option><option>UTC+5:30 India (IST)</option><option>UTC+8 Singapore</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <Button onClick={() => toast.success("Account settings saved")} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8">Save Changes</Button>
                                </div>
                            </section>

                            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                                <h2 className="text-lg font-semibold mb-1 flex items-center gap-2"><CreditCard className="w-5 h-5 text-blue-600" />Subscription</h2>
                                <p className="text-sm text-muted-foreground mb-6">You are on the <strong>Pro Plan</strong> — renews on Mar 1, 2026.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {[{ name: "Starter", price: "Free", features: ["5 searches/mo", "Basic filters", "1 list"] }, { name: "Pro", price: "$49/mo", features: ["Unlimited searches", "AI analysis", "10 lists"], active: true }, { name: "Enterprise", price: "Custom", features: ["Team access", "API access", "Unlimited lists"] }].map((plan) => (
                                        <div key={plan.name} className={cn("rounded-xl border-2 p-4 space-y-3 transition-all", plan.active ? "border-blue-600 bg-blue-50 dark:bg-blue-900/10" : "border-slate-200 dark:border-slate-700")}>
                                            <div className="flex items-center justify-between"><p className="font-bold text-sm">{plan.name}</p>{plan.active && <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-blue-600 text-white rounded-full">Current</span>}</div>
                                            <p className="text-lg font-black">{plan.price}</p>
                                            <ul className="space-y-1">{plan.features.map((f) => <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground"><Check className="w-3 h-3 text-blue-500 shrink-0" />{f}</li>)}</ul>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-red-100 dark:border-red-900/30 p-6">
                                <h2 className="text-lg font-semibold mb-1 flex items-center gap-2 text-red-600"><Trash2 className="w-5 h-5" />Danger Zone</h2>
                                <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                                <Button variant="destructive" onClick={() => toast.error("Account deletion requires email confirmation.")} className="rounded-xl">Delete Account</Button>
                            </section>
                        </>
                    )}

                    {/* ── SECURITY ── */}
                    {activeTab === "security" && (
                        <>
                            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2"><Key className="w-5 h-5 text-blue-600" />Change Password</h2>
                                <div className="space-y-4">
                                    <div className="space-y-2"><Label htmlFor="curr-pw">Current Password</Label><Input id="curr-pw" type="password" placeholder="••••••••" /></div>
                                    <div className="space-y-2"><Label htmlFor="new-pw">New Password</Label><Input id="new-pw" type="password" placeholder="••••••••" /></div>
                                    <div className="space-y-2"><Label htmlFor="conf-pw">Confirm New Password</Label><Input id="conf-pw" type="password" placeholder="••••••••" /></div>
                                    <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-xs">
                                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                                        Use at least 12 characters including uppercase, numbers, and symbols.
                                    </div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <Button onClick={() => toast.success("Password updated successfully")} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8">Update Password</Button>
                                </div>
                            </section>

                            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                                <h2 className="text-lg font-semibold mb-1 flex items-center gap-2"><Smartphone className="w-5 h-5 text-blue-600" />Two-Factor Authentication</h2>
                                <p className="text-sm text-muted-foreground mb-6">Add an extra layer of security to your account.</p>
                                <div className="space-y-3">
                                    {[{ label: "Authenticator App", desc: "Use Google Authenticator or Authy", enabled: true }, { label: "SMS / Text Message", desc: "Receive a code via SMS", enabled: false }, { label: "Hardware Key (FIDO2)", desc: "YubiKey or similar device", enabled: false }].map((method) => (
                                        <div key={method.label} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                            <div><p className="text-sm font-semibold">{method.label}</p><p className="text-xs text-muted-foreground">{method.desc}</p></div>
                                            <button onClick={() => toast.success(`${method.label} ${method.enabled ? "disabled" : "enabled"}`)} className={cn("relative w-11 h-6 rounded-full transition-colors", method.enabled ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700")}>
                                                <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform", method.enabled ? "translate-x-6" : "translate-x-1")} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Lock className="w-5 h-5 text-blue-600" />Active Sessions</h2>
                                <div className="space-y-3">
                                    {[{ device: "MacBook Pro 16\"", location: "San Francisco, CA", time: "Active now", current: true }, { device: "iPhone 15 Pro", location: "San Francisco, CA", time: "2 hours ago" }, { device: "Chrome · Windows", location: "New York, NY", time: "Yesterday" }].map((session) => (
                                        <div key={session.device} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                            <div><p className="text-sm font-semibold flex items-center gap-2">{session.device}{session.current && <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">Current</span>}</p><p className="text-xs text-muted-foreground">{session.location} · {session.time}</p></div>
                                            {!session.current && <Button variant="ghost" size="sm" onClick={() => toast.success("Session revoked")} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 text-xs rounded-lg">Revoke</Button>}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </>
                    )}

                    {/* ── NOTIFICATIONS ── */}
                    {activeTab === "notifications" && (
                        <>
                            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2"><BellRing className="w-5 h-5 text-blue-600" />Email Notifications</h2>
                                <div className="space-y-4">
                                    {[
                                        { icon: TrendingUp, label: "Deal Flow Alerts", desc: "New companies matching your saved searches", enabled: true },
                                        { icon: Tag, label: "Portfolio Updates", desc: "Funding rounds, news, and milestones", enabled: true },
                                        { icon: MessageSquare, label: "Weekly Digest", desc: "Summary of activity every Monday", enabled: false },
                                        { icon: Bell, label: "System Announcements", desc: "Product updates and maintenance notices", enabled: true },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-start justify-between gap-4 py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-0.5 w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0"><item.icon className="w-4 h-4 text-blue-600" /></div>
                                                <div><p className="text-sm font-semibold">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                                            </div>
                                            <button onClick={() => toast.success(`${item.label} ${item.enabled ? "disabled" : "enabled"}`)} className={cn("relative w-11 h-6 rounded-full transition-colors shrink-0 mt-1", item.enabled ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700")}>
                                                <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform", item.enabled ? "translate-x-6" : "translate-x-1")} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                                <h2 className="text-lg font-semibold mb-6 flex items-center gap-2"><BellOff className="w-5 h-5 text-blue-600" />Push & In-App</h2>
                                <div className="space-y-4">
                                    {[
                                        { label: "Browser Push Notifications", desc: "Receive alerts directly in your browser", enabled: false },
                                        { label: "In-App Toasts", desc: "Show pop-up messages while using Scout.ai", enabled: true },
                                        { label: "Sound Alerts", desc: "Play a sound with new high-priority alerts", enabled: false },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center justify-between gap-4 py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                                            <div><p className="text-sm font-semibold">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                                            <button onClick={() => toast.success(`${item.label} toggled`)} className={cn("relative w-11 h-6 rounded-full transition-colors shrink-0", item.enabled ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700")}>
                                                <div className={cn("absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform", item.enabled ? "translate-x-6" : "translate-x-1")} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <Button onClick={() => toast.success("Notification preferences saved")} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8">Save Preferences</Button>
                                </div>
                            </section>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
