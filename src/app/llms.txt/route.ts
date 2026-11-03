import { BASE_URL } from '../../lib/seo';
import { SITE_NAME, SITE_DESC, ENDPOINTS, categories, brands, guides, priceRange, text } from '../../lib/agent';
import { PRODUCTS } from '../../data/products';

export const dynamic = 'force-static';

export function GET() {
  const r = priceRange();
  const cats = categories().map((c) => `- [${c.name}](${c.url}): ${c.count} models, from ${c.price_from.toLocaleString('de-DE')} EUR`).join('\n');
  const bs = brands().map((b) => `- [${b.name}](${b.url}): ${b.count} models`).join('\n');
  const gs = guides().map((g) => `- [${g.title}](${g.url})`).join('\n');
  const body = `# ${SITE_NAME}

> ${SITE_DESC}

${SITE_NAME} lists ${PRODUCTS.length} new e-bikes from ${r.min.toLocaleString('de-DE')} EUR to ${r.max.toLocaleString('de-DE')} EUR. Every model page shows the manufacturer's specifications (motor, battery, drivetrain, brakes), photos and a list price in EUR. Prices are list prices and are confirmed by the shop; this file does not describe an online ordering API.

## Categories

${cats}

## Brands

${bs}

## Guides

${gs}

## Machine-readable resources

- [Product API](${ENDPOINTS.products}): JSON, filter with ?category=, ?brand=, ?q=, ?max_price=, ?limit=
- [Search API](${ENDPOINTS.search}?q=cube): JSON
- [Categories API](${ENDPOINTS.categories}): JSON
- [Sitemap](${BASE_URL}/sitemap.xml): all pages in German and English

## Optional

- [API catalog](${BASE_URL}/.well-known/api-catalog)
- [Agent skills](${BASE_URL}/.well-known/agent-skills/index.json)
- [MCP server card](${BASE_URL}/.well-known/mcp/server-card.json)
- [Auth](${BASE_URL}/auth.md)
`;
  return text(body, 'text/plain; charset=utf-8');
}
