import { Company } from './types';

export const mockCompanies: Company[] = [
    {
        id: 'linear',
        name: 'Linear',
        website: 'https://linear.app',
        oneLiner: 'The issue tracker you’ll actually enjoy using.',
        description: 'Linear helps teams streamline software projects, sprints, tasks, and bug tracking. It’s built for high-performance teams.',
        sector: 'B2B SaaS',
        stage: 'Series B',
        geography: 'US',
        headcount: '51-200',
        foundedYear: 2019,
        score: 92,
        scoreReasons: ['Matched: B2B SaaS ✓', 'Series B stage ✓', 'US-based ✓'],
        signals: [
            { date: '2023-09-15', type: 'product', description: 'Launched Linear Asks for customer support integration.' },
            { date: '2023-05-10', type: 'funding', description: 'Raised $35M in Series B led by Accel.' },
            { date: '2022-11-01', type: 'hire', description: 'Appointed New Head of Design from Airbnb.' }
        ]
    },
    {
        id: 'rippling',
        name: 'Rippling',
        website: 'https://rippling.com',
        oneLiner: 'The all-in-one HR, IT, and Finance platform.',
        description: 'Rippling gives businesses one place to manage all their employee operations—from payroll and benefits to devices and apps.',
        sector: 'HR Tech',
        stage: 'Series E',
        geography: 'US',
        headcount: '200+',
        foundedYear: 2016,
        score: 85,
        scoreReasons: ['Strong growth ✓', 'Large headcount ✓', 'US-based ✓'],
        signals: [
            { date: '2024-01-20', type: 'funding', description: 'Raised $200M in Series E at a $13.5B valuation.' },
            { date: '2023-08-12', type: 'product', description: 'Expanded global payroll to 50+ countries.' }
        ]
    },
    {
        id: 'notion',
        name: 'Notion',
        website: 'https://notion.so',
        oneLiner: 'Your connected workspace for wiki, docs & projects.',
        description: 'Notion is a single space where you can think, write, and plan. Capture thoughts, manage projects, or even run an entire company.',
        sector: 'B2B SaaS',
        stage: 'Series C',
        geography: 'US',
        headcount: '200+',
        foundedYear: 2013,
        score: 88,
        scoreReasons: ['Market leader ✓', 'B2B SaaS ✓', 'US-based ✓'],
        signals: [
            { date: '2023-11-05', type: 'product', description: 'Released Notion AI for all users.' },
            { date: '2022-06-15', type: 'press', description: 'Surpassed 30 million users globally.' }
        ]
    },
    {
        id: 'deel',
        name: 'Deel',
        website: 'https://deel.com',
        oneLiner: 'Everything you need to hire, pay and manage a global team.',
        description: 'Deel helps companies hire anyone, anywhere in minutes. It handles compliance, payroll, and benefits in 150+ countries.',
        sector: 'Fintech',
        stage: 'Series D',
        geography: 'Global',
        headcount: '200+',
        foundedYear: 2019,
        score: 90,
        scoreReasons: ['Global reach ✓', 'Fintech sector ✓', 'Rapid scaling ✓'],
        signals: [
            { date: '2023-03-22', type: 'funding', description: 'Raised $50M at a $12B valuation.' },
            { date: '2022-10-10', type: 'hire', description: 'Hired 500+ employees in 12 months.' }
        ]
    },
    {
        id: 'retool',
        name: 'Retool',
        website: 'https://retool.com',
        oneLiner: 'The fast way to build internal tools.',
        description: 'Retool is a low-code platform that makes it easy to build internal tools. Connect to any database or API.',
        sector: 'Developer Tools',
        stage: 'Series C',
        geography: 'US',
        headcount: '200+',
        foundedYear: 2017,
        score: 82,
        scoreReasons: ['Strong developer adoption ✓', 'US-based ✓'],
        signals: [
            { date: '2023-12-01', type: 'product', description: 'Launched Retool Workflows for automation.' },
            { date: '2022-07-28', type: 'funding', description: 'Raised $45M Series C led by Sequoia.' }
        ]
    },
    {
        id: 'brex',
        name: 'Brex',
        website: 'https://brex.com',
        oneLiner: 'Corporate cards and spend management for scaling businesses.',
        description: 'Brex helps companies of all sizes manage their finances with corporate cards, spend management, and business accounts.',
        sector: 'Fintech',
        stage: 'Series D',
        geography: 'US',
        headcount: '200+',
        foundedYear: 2017,
        score: 78,
        scoreReasons: ['Fintech sector ✓', 'High valuation ✓', 'US-based ✓'],
        signals: [
            { date: '2024-02-15', type: 'press', description: 'Announced integration with NetSuite for enterprise clients.' },
            { date: '2023-06-30', type: 'product', description: 'Launched Brex Empower for global expense management.' }
        ]
    },
    {
        id: 'scale-ai',
        name: 'Scale AI',
        website: 'https://scale.com',
        oneLiner: 'Data infrastructure for AI.',
        description: 'Scale AI provides the data engine for AI applications, offering high-quality training data for machine learning models.',
        sector: 'AI/ML',
        stage: 'Series F',
        geography: 'US',
        headcount: '200+',
        foundedYear: 2016,
        score: 95,
        scoreReasons: ['AI/ML leader ✓', 'Critical infrastructure ✓', 'US-based ✓'],
        signals: [
            { date: '2024-05-21', type: 'funding', description: 'Raised $1B Series F led by Accel at $13.8B valuation.' },
            { date: '2023-11-15', type: 'press', description: 'Partnered with OpenAI for fine-tuning data.' }
        ]
    },
    {
        id: 'wandb',
        name: 'Weights & Biases',
        website: 'https://wandb.ai',
        oneLiner: 'The developer-first MLOps platform.',
        description: 'Weights & Biases helps AI developers track experiments, version data, and collaborate on models.',
        sector: 'AI/ML',
        stage: 'Series C',
        geography: 'US',
        headcount: '51-200',
        foundedYear: 2017,
        score: 87,
        scoreReasons: ['MLOps niche ✓', 'Strong community ✓', 'AI/ML ✓'],
        signals: [
            { date: '2023-10-10', type: 'product', description: 'Released W&B Prompts for LLM debugging.' },
            { date: '2023-01-15', type: 'funding', description: 'Raised $50M in strategic funding.' }
        ]
    },
    {
        id: 'posthog',
        name: 'PostHog',
        website: 'https://posthog.com',
        oneLiner: 'The open-source specialized product OS.',
        description: 'PostHog provides open-source product analytics, session recording, feature flags, and A/B testing in one platform.',
        sector: 'B2B SaaS',
        stage: 'Series B',
        geography: 'Global',
        headcount: '51-200',
        foundedYear: 2020,
        score: 84,
        scoreReasons: ['Open source growth ✓', 'B2B SaaS ✓', 'Global team ✓'],
        signals: [
            { date: '2024-02-01', type: 'product', description: 'Launched PostHog 3.0 with Data Warehouse features.' },
            { date: '2023-04-12', type: 'funding', description: 'Raised $15M led by Y Combinator Continuity.' }
        ]
    },
    {
        id: 'cal-com',
        name: 'Cal.com',
        website: 'https://cal.com',
        oneLiner: 'Open-source scheduling infrastructure.',
        description: 'Cal.com is the open-source alternative to Calendly, allowing you to own your data and customize your scheduling.',
        sector: 'B2B SaaS',
        stage: 'Series A',
        geography: 'Global',
        headcount: '11-50',
        foundedYear: 2021,
        score: 80,
        scoreReasons: ['Series A stage ✓', 'Open source ✓', 'Product-led growth ✓'],
        signals: [
            { date: '2023-08-25', type: 'product', description: 'Launched Cal.com v3.0 with atoms and modularity.' },
            { date: '2022-12-05', type: 'funding', description: 'Raised $25M Series A led by Seven Seven Six.' }
        ]
    },
    {
        id: 'pika',
        name: 'Pika',
        website: 'https://pika.art',
        oneLiner: 'An idea-to-video platform that brings your creativity to life.',
        description: 'Pika is an AI video generator that allows users to create high-quality animations from text or images.',
        sector: 'AI/ML',
        stage: 'Series A',
        geography: 'US',
        headcount: '1-10',
        foundedYear: 2023,
        score: 91,
        scoreReasons: ['Viral AI product ✓', 'Series A stage ✓', 'Cutting-edge AI ✓'],
        signals: [
            { date: '2023-11-28', type: 'funding', description: 'Raised $35M led by Lightspeed Venture Partners.' },
            { date: '2023-12-15', type: 'press', description: 'Went viral on Twitter with Pika 1.0 launch.' }
        ]
    },
    {
        id: 'elevenlabs',
        name: 'ElevenLabs',
        website: 'https://elevenlabs.io',
        oneLiner: 'The most realistic AI speech software.',
        description: 'ElevenLabs develops natural-sounding speech synthesis and text-to-speech software using deep learning.',
        sector: 'AI/ML',
        stage: 'Series B',
        geography: 'Global',
        headcount: '51-200',
        foundedYear: 2022,
        score: 94,
        scoreReasons: ['Audio AI leader ✓', 'Rapid revenue growth ✓', 'Series B stage ✓'],
        signals: [
            { date: '2024-01-22', type: 'funding', description: 'Raised $80M Series B at $1.1B valuation led by a16z.' },
            { date: '2023-10-05', type: 'product', description: 'Launched AI Dubbing for creators.' }
        ]
    },
    {
        id: 'mistral',
        name: 'Mistral AI',
        website: 'https://mistral.ai',
        oneLiner: 'Frontier AI models, designed in Europe.',
        description: 'Mistral AI is a European AI company developing large language models with a focus on efficiency and openness.',
        sector: 'AI/ML',
        stage: 'Series B',
        geography: 'EU',
        headcount: '11-50',
        foundedYear: 2023,
        score: 96,
        scoreReasons: ['European AI champion ✓', 'High efficiency models ✓', 'Series B ✓'],
        signals: [
            { date: '2024-06-11', type: 'funding', description: 'Raised €600M led by General Catalyst at €5.8B valuation.' },
            { date: '2023-12-08', type: 'product', description: 'Released Mixtral 8x7B open-weight model.' }
        ]
    },
    {
        id: 'cohere',
        name: 'Cohere',
        website: 'https://cohere.com',
        oneLiner: 'Enterprise-grade AI for search, retrieval, and generation.',
        description: 'Cohere builds large language models that are easy to integrate into business applications, focusing on search and RAG.',
        sector: 'AI/ML',
        stage: 'Series C',
        geography: 'Canada',
        headcount: '200+',
        foundedYear: 2019,
        score: 89,
        scoreReasons: ['Enterprise AI focus ✓', 'Series C stage ✓', 'Strong partnerships ✓'],
        signals: [
            { date: '2023-06-08', type: 'funding', description: 'Raised $270M Series C led by Inovia Capital.' },
            { date: '2024-04-04', type: 'product', description: 'Launched Command R+ for enterprise RAG.' }
        ]
    },
    {
        id: 'ramp',
        name: 'Ramp',
        website: 'https://ramp.com',
        oneLiner: 'The ultimate spend management platform.',
        description: 'Ramp combines corporate cards, expense management, and bill pay into one platform designed to save companies money.',
        sector: 'Fintech',
        stage: 'Series D',
        geography: 'US',
        headcount: '200+',
        foundedYear: 2019,
        score: 86,
        scoreReasons: ['Fintech sector ✓', 'High capital efficiency ✓', 'US-based ✓'],
        signals: [
            { date: '2024-04-17', type: 'funding', description: 'Raised $150M at $7.65B valuation led by Khosla and Founders Fund.' },
            { date: '2023-08-22', type: 'press', description: 'Acquired Cohere.io (customer support AI).' }
        ]
    },
    {
        id: 'mercury',
        name: 'Mercury',
        website: 'https://mercury.com',
        oneLiner: 'Banking built for startups.',
        description: 'Mercury provides business banking and financial tools tailored for startups and tech companies.',
        sector: 'Fintech',
        stage: 'Series B',
        geography: 'US',
        headcount: '200+',
        foundedYear: 2017,
        score: 83,
        scoreReasons: ['Startup focus ✓', 'Fintech sector ✓', 'US-based ✓'],
        signals: [
            { date: '2023-11-10', type: 'product', description: 'Launched Mercury IO, a corporate card for complex spend.' },
            { date: '2022-05-15', type: 'press', description: 'Reached 100,000 startup customers.' }
        ]
    },
    {
        id: 'vercel',
        name: 'Vercel',
        website: 'https://vercel.com',
        oneLiner: 'The platform for frontend developers.',
        description: 'Vercel is the creator of Next.js and provides a platform for developers to build, preview, and deploy websites.',
        sector: 'Developer Tools',
        stage: 'Series D',
        geography: 'US',
        headcount: '200+',
        foundedYear: 2015,
        score: 93,
        scoreReasons: ['Frontend leader ✓', 'Creator of Next.js ✓', 'US-based ✓'],
        signals: [
            { date: '2024-05-16', type: 'funding', description: 'Raised $250M Series E led by Accel at $3.25B valuation.' },
            { date: '2023-10-26', type: 'product', description: 'v0.dev launched for AI-driven UI generation.' }
        ]
    },
    {
        id: 'airtable',
        name: 'Airtable',
        website: 'https://airtable.com',
        oneLiner: 'Build any business app on your data.',
        description: 'Airtable is a low-code platform for building collaborative apps that combine the power of a database with the familiarity of a spreadsheet.',
        sector: 'B2B SaaS',
        stage: 'Series F',
        geography: 'US',
        headcount: '200+',
        foundedYear: 2012,
        score: 79,
        scoreReasons: ['Large enterprise base ✓', 'B2B SaaS ✓', 'US-based ✓'],
        signals: [
            { date: '2023-09-20', type: 'product', description: 'Launched Airtable AI for enterprise workflows.' },
            { date: '2022-12-15', type: 'hire', description: 'Appointed new CFO from Salesforce.' }
        ]
    },
    {
        id: 'loom',
        name: 'Loom',
        website: 'https://loom.com',
        oneLiner: 'Video messaging for work.',
        description: 'Loom is a video messaging tool for work that helps you get your message across through instantly shareable videos.',
        sector: 'B2B SaaS',
        stage: 'Acquired',
        geography: 'US',
        headcount: '200+',
        foundedYear: 2016,
        score: 75,
        scoreReasons: ['Acquired by Atlassian ✓', 'Product category leader ✓'],
        signals: [
            { date: '2023-10-12', type: 'press', description: 'Acquired by Atlassian for $975M.' },
            { date: '2023-03-05', type: 'product', description: 'Launched Loom AI features for video summaries.' }
        ]
    },
    {
        id: 'runway',
        name: 'Runway',
        website: 'https://runwayml.com',
        oneLiner: 'Advancing creativity with artificial intelligence.',
        description: 'Runway is an applied AI research company building the next generation of creative tools for film and video.',
        sector: 'AI/ML',
        stage: 'Series C',
        geography: 'US',
        headcount: '51-200',
        foundedYear: 2018,
        score: 97,
        scoreReasons: ['Creative AI leader ✓', 'SOTA video models ✓', 'US-based ✓'],
        signals: [
            { date: '2024-06-17', type: 'product', description: 'Released Gen-3 Alpha model.' },
            { date: '2023-06-29', type: 'funding', description: 'Raised $141M from Google, Nvidia, and Salesforce.' }
        ]
    }
];
