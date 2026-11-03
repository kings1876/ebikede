import { BASE_URL } from '../../../lib/seo';
import { SITE_NAME, SITE_DESC, ENDPOINTS, json } from '../../../lib/agent';

export const dynamic = 'force-static';

export function GET() {
  return json({
    protocol: { name: 'acp', version: '0.1.0' },
    name: SITE_NAME,
    description: SITE_DESC,
    api_base_url: BASE_URL,
    homepage: BASE_URL,
    transports: ['https'],
    capabilities: { services: ['product-catalog', 'search', 'guides'], ordering: 'none', currency: 'EUR', catalog_endpoint: ENDPOINTS.products },
    legal: { region: 'DE', product_type: 'new e-bikes' },
  }, 200, { 'Cache-Control': 'public, max-age=3600' });
}
