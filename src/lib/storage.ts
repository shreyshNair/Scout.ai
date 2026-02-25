import { List, SavedSearch, EnrichmentCache } from './types';

const IS_SERVER = typeof window === 'undefined';

const KEYS = {
    LISTS: 'vc_scout_lists',
    SAVED_SEARCHES: 'vc_scout_saved_searches',
    ENRICHMENT_CACHE: 'vc_scout_enrichment_cache',
    NOTES: 'vc_scout_notes_', // prefix
};

export const getLists = (): List[] => {
    if (IS_SERVER) return [];
    const data = localStorage.getItem(KEYS.LISTS);
    return data ? JSON.parse(data) : [];
};

export const saveLists = (lists: List[]) => {
    if (IS_SERVER) return;
    localStorage.setItem(KEYS.LISTS, JSON.stringify(lists));
};

export const getSavedSearches = (): SavedSearch[] => {
    if (IS_SERVER) return [];
    const data = localStorage.getItem(KEYS.SAVED_SEARCHES);
    return data ? JSON.parse(data) : [];
};

export const saveSavedSearches = (searches: SavedSearch[]) => {
    if (IS_SERVER) return;
    localStorage.setItem(KEYS.SAVED_SEARCHES, JSON.stringify(searches));
};

export const getEnrichmentCache = (): EnrichmentCache => {
    if (IS_SERVER) return {};
    const data = localStorage.getItem(KEYS.ENRICHMENT_CACHE);
    return data ? JSON.parse(data) : {};
};

export const saveEnrichmentCache = (cache: EnrichmentCache) => {
    if (IS_SERVER) return;
    localStorage.setItem(KEYS.ENRICHMENT_CACHE, JSON.stringify(cache));
};

export const getNotes = (companyId: string): string => {
    if (IS_SERVER) return '';
    return localStorage.getItem(KEYS.NOTES + companyId) || '';
};

export const saveNotes = (companyId: string, notes: string) => {
    if (IS_SERVER) return;
    localStorage.setItem(KEYS.NOTES + companyId, notes);
};
