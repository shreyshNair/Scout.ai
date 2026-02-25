"use client";

import { useState, useEffect } from 'react';
import { SavedSearch } from '@/lib/types';
import { getSavedSearches, saveSavedSearches } from '@/lib/storage';

export function useSavedSearches() {
    const [searches, setSearches] = useState<SavedSearch[]>([]);

    useEffect(() => {
        setSearches(getSavedSearches());
    }, []);

    const deleteSearch = (id: string) => {
        const updated = searches.filter(s => s.id !== id);
        setSearches(updated);
        saveSavedSearches(updated);
    };

    const addSearch = (search: SavedSearch) => {
        const updated = [...searches, search];
        setSearches(updated);
        saveSavedSearches(updated);
    };

    return {
        searches,
        deleteSearch,
        addSearch
    };
}
