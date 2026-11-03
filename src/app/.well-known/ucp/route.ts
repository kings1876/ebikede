import { BASE_URL } from '../../../lib/seo';
import { SITE_NAME, SITE_DESC, ENDPOINTS, json } from '../../../lib/agent';

export const dynamic = 'force-static';

export function GET() {
  return json({
    ucp: '1.0',
    protocol_version: '1.0',
    spec: 'https://ucp.dev/specification/overview/',
    schema: 'https://ucp.dev/schema/v1.json',
    site: BASE_URL,
    name: SITE_NAME,
    description: SITE_DESC,
    services: [
      { id: 'product-catalog', type: 'catalog', url: ENDPOINTS.products, description: 'Read-only product list (JSON)' },
      { id: 'search', type: 'catalog', url: ENDPOINTS.search, description: 'Read-only product search (JSON)' },
    ],
    capabilities: ['browse', 'search'],
    endpoints: { catalog: ENDPOINTS.products, search: ENDPOINTS.search, categories: ENDPOINTS.categories, mcp_server_card: BASE_URL + '/.well-known/mcp/server-card.json', api_catalog: BASE_URL + '/.well-known/api-catalog', llms_txt: BASE_URL + '/llms.txt' },
    currency: 'EUR',
    ordering: 'none',
  }, 200, { 'Cache-Control': 'public, max-age=3600' });
}
