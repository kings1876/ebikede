import { BASE_URL } from '../../lib/seo';

export const dynamic = 'force-static';

// Private / low-value pages that must not be crawled
const DISALLOW = ['/warenkorb/', '/kasse/', '/bestellbestaetigung/', '/suche/', '/en/cart/', '/en/checkout/', '/en/order-confirmation/', '/en/search/'];

const AI_BOTS = ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Applebot', 'Amazonbot', 'CCBot', 'Google-Extended', 'Meta-ExternalAgent', 'cohere-ai'];

export function GET() {
  const lines = [
    'User-agent: *',
    'Allow: /',
    ...DISALLOW.map((p) => `Disallow: ${p}`),
    '',
    // Crawling for search and AI answers is welcome; training use is opted out (change here if the owner decides otherwise)
    'Content-Signal: search=yes, ai-input=yes, ai-train=no',
    '',
    '# AI crawlers: welcome to read catalogue and guide pages',
    ...AI_BOTS.flatMap((b) => [`User-agent: ${b}`, 'Allow: /', ...DISALLOW.map((p) => `Disallow: ${p}`), '']),
    '# Agent-readable resources',
    `# llms.txt: ${BASE_URL}/llms.txt`,
    `# API catalog: ${BASE_URL}/.well-known/api-catalog`,
    `# MCP server card: ${BASE_URL}/.well-known/mcp/server-card.json`,
    '',
    `Sitemap: ${BASE_URL}/sitemap.xml`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
