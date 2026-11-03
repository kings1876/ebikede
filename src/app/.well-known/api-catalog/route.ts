import { BASE_URL } from '../../../lib/seo';
import { SITE_NAME, ENDPOINTS } from '../../../lib/agent';

export const dynamic = 'force-static';

export function GET() {
  const linkset = {
    linkset: [
      { anchor: BASE_URL + '/', 'service-doc': [{ href: BASE_URL + '/llms.txt', type: 'text/plain' }], title: SITE_NAME },
      { anchor: ENDPOINTS.products, 'service-doc': [{ href: BASE_URL + '/llms.txt' }], type: 'application/json', title: 'Product list (read-only JSON)' },
      { anchor: ENDPOINTS.search, type: 'application/json', title: 'Search (read-only JSON)' },
      { anchor: ENDPOINTS.categories, type: 'application/json', title: 'Categories (read-only JSON)' },
      { anchor: ENDPOINTS.mcp, 'service-desc': [{ href: BASE_URL + '/.well-known/mcp/server-card.json', type: 'application/json' }], type: 'application/json', title: 'MCP server (Streamable HTTP, read-only tools)' },
    ],
  };
  return new Response(JSON.stringify(linkset, null, 2), {
    headers: { 'Content-Type': 'application/linkset+json', 'Cache-Control': 'public, max-age=3600', 'Access-Control-Allow-Origin': '*' },
  });
}
