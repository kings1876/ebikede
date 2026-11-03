import { BASE_URL } from '../../../../lib/seo';
import { SITE_NAME, SITE_DESC, ENDPOINTS, TOOLS, json } from '../../../../lib/agent';

export const dynamic = 'force-static';

export function GET() {
  return json({
    $schema: 'https://modelcontextprotocol.io/schemas/server-card/v1.json',
    serverInfo: { name: SITE_NAME, version: '1.0.0', description: SITE_DESC, homepage: BASE_URL },
    transport: { type: 'streamable-http', endpoint: ENDPOINTS.mcp },
    capabilities: { tools: TOOLS },
    commerce: { ordering: 'none', note: 'Read-only catalogue. Prices are list prices; orders are not taken through this endpoint.', currency: 'EUR' },
  }, 200, { 'Cache-Control': 'public, max-age=3600' });
}
