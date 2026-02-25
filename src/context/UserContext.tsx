"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UserProfile {
    name: string;
    email: string;
    title: string;
    location: string;
    occupation: string;
    bio: string;
}

const defaultProfile: UserProfile = {
    name: "Lucy Lure",
    email: "lucy@alphaventures.vc",
    title: "Principal Analyst",
    location: "San Francisco, CA",
    occupation: "Principal Venture Analyst",
    bio: "Focused on early-stage SaaS and Infrastructure. Hunting for the next unicorn in DevOps.",
};

interface UserContextType {
    profile: UserProfile;
    updateProfile: (updates: Partial<UserProfile>) => void;
    initials: string;
}

const UserContext = createContext<UserContextType>({
    profile: defaultProfile,
    updateProfile: () => { },
    initials: "LL",
});

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [profile, setProfile] = useState<UserProfile>(defaultProfile);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem("scout_user_profile");
            if (saved) setProfile(JSON.parse(saved));
        } catch { }
    }, []);

    const updateProfile = (updates: Partial<UserProfile>) => {
        setProfile((prev) => {
            const next = { ...prev, ...updates };
            try {
                localStorage.setItem("scout_user_profile", JSON.stringify(next));
            } catch { }
            return next;
        });
    };

    const initials = profile.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <UserContext.Provider value={{ profile, updateProfile, initials }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
