import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import * as cheerio from 'cheerio';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const url = body.url || body.website;
        const { companyId } = body;

        if (!url || !url.startsWith('http')) {
            return NextResponse.json({ error: 'Invalid URL provided' }, { status: 400 });
        }

        // Step 2 — Fetch website content
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'VC-Scout-Enrichment/1.0',
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            return NextResponse.json({ error: `Failed to fetch website: ${response.statusText}` }, { status: 502 });
        }

        const html = await response.text();

        // Step 3 — Parse HTML to clean text
        const $ = cheerio.load(html);

        // Remove noise
        $('script, style, nav, footer, header, symbol, svg, iframe').remove();

        const title = $('title').text();
        const metaDescription = $('meta[name="description"]').attr('content') || '';
        const bodyText = $('body').text().replace(/\s+/g, ' ').trim().substring(0, 8000);

        const scrapedText = `
      Title: ${title}
      Description: ${metaDescription}
      Content: ${bodyText}
    `;

        // Step 4 — Call Anthropic Claude API
        const apiKey = process.env.ANTHROPIC_API_KEY;
        if (!apiKey) {
            console.warn("No Anthropic API key found. Returning mock enrichment data.");
            return NextResponse.json(getMockEnrichment(url));
        }

        const anthropic = new Anthropic({ apiKey });

        const message = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20240620',
            max_tokens: 1024,
            messages: [{
                role: 'user',
                content: `You are a VC analyst assistant. Analyze this company website content and extract intelligence.
        
Return ONLY valid JSON (no markdown, no explanation) with this exact structure:
{
  "oneLiner": "A concise market position statement",
  "competitors": ["competitor1", "competitor2", "competitor3"],
  "strategicValue": "A short paragraph on why this company is strategically valuable or their unique advantage",
  "summary": "1-2 sentence overview",
  "whatTheyDo": ["bullet 1", "bullet 2", "bullet 3"],
  "keywords": ["kw1", "kw2", "kw3", "kw4", "kw5"],
  "signals": [
    { "type": "careers", "label": "Careers page found — actively hiring", "positive": true }
  ]
}

Website content:
---
${scrapedText}
---`
            }]
        });

        const content = message.content[0];
        if (content.type !== 'text') {
            throw new Error('Unexpected response format from Claude');
        }

        const result = JSON.parse(content.text);

        return NextResponse.json({
            ...result,
            sources: [{ url, fetchedAt: new Date().toISOString() }]
        });

    } catch (error: any) {
        console.error('Enrichment error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}

function getMockEnrichment(url: string) {
    const hostname = new URL(url).hostname;
    return {
        oneLiner: `Market leader in modern infrastructure for the ${hostname} ecosystem.`,
        competitors: ["Competitor A", "Competitor B", "Competitor C"],
        strategicValue: "Strong network effects and high switching costs due to integration depth. Exceptional team with previous exits in the sector.",
        summary: `This company provides innovative solutions as seen on ${hostname}. They focus on delivering high-value products to their target market.`,
        whatTheyDo: [
            "Offers a comprehensive platform for enterprise clients",
            "Leverages modern technology to solve complex problems",
            "Provides intuitive user interfaces and robust APIs"
        ],
        keywords: ["Innovation", "Technology", "Enterprise", "Platform", "SaaS"],
        signals: [
            { type: "careers", label: "Careers page found — actively hiring", positive: true },
            { type: "blog", label: "Active blog detected", positive: true },
            { type: "pricing", label: "Public pricing available", positive: true }
        ],
        sources: [{ url, fetchedAt: new Date().toISOString() }]
    };
}
