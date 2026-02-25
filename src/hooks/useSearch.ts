"use client";

import { useState, useMemo, useEffect } from 'react';
import { Company, FilterState } from '@/lib/types';

export function useSearch(companies: Company[], initialState: FilterState) {
    const [filters, setFilters] = useState<FilterState>(initialState);
    const [debouncedQuery, setDebouncedQuery] = useState(initialState.query);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(filters.query);
        }, 300);

        return () => clearTimeout(timer);
    }, [filters.query]);

    const filteredCompanies = useMemo(() => {
        return companies.filter((company) => {
            const matchesSearch =
                company.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                company.description.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
                company.sector.toLowerCase().includes(debouncedQuery.toLowerCase());

            const matchesStage = filters.stage.length === 0 || filters.stage.includes(company.stage);
            const matchesSector = filters.sector.length === 0 || filters.sector.includes(company.sector);
            const matchesGeography = filters.geography.length === 0 || filters.geography.includes(company.geography);
            const matchesHeadcount = filters.headcount === 'All' || filters.headcount === company.headcount;

            return matchesSearch && matchesStage && matchesSector && matchesGeography && matchesHeadcount;
        });
    }, [companies, debouncedQuery, filters]);

    return {
        filters,
        setFilters,
        filteredCompanies,
        activeFilterCount: filters.stage.length + filters.sector.length + filters.geography.length + (filters.headcount !== 'All' ? 1 : 0)
    };
}
