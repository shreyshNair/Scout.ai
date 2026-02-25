export interface Signal {
  date: string;
  type: 'funding' | 'hire' | 'product' | 'press';
  description: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  website: string;
  oneLiner: string;
  description: string;
  sector: string;
  stage: string;
  geography: string;
  headcount: string;
  foundedYear: number;
  score: number;
  scoreReasons: string[];
  signals: Signal[];
}

export interface EnrichedSignal {
  type: 'careers' | 'blog' | 'changelog' | 'pricing' | 'enterprise' | 'api';
  label: string;
  positive: boolean;
}

export interface EnrichmentResult {
  summary: string;
  whatTheyDo: string[];
  keywords: string[];
  signals: EnrichedSignal[];
  sources: {
    url: string;
    fetchedAt: string;
  }[];
}

export interface EnrichmentCache {
  [companyId: string]: {
    result: EnrichmentResult;
    cachedAt: string;
  };
}

export interface List {
  id: string;
  name: string;
  companyIds: string[];
  createdAt: string;
}

export interface FilterState {
  stage: string[];
  sector: string[];
  geography: string[];
  headcount: string;
  query: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: FilterState;
  urlParams: string;
  savedAt: string;
}
