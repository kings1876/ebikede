import { BASE_URL } from '../../../lib/seo';
import { ENDPOINTS, json } from '../../../lib/agent';

export const dynamic = 'force-static';

export function GET() {
  return json({
    issuer: BASE_URL,
    authorization_endpoint: null,
    token_endpoint: null,
    jwks_uri: null,
    grant_types_supported: [],
    response_types_supported: [],
    scopes_supported: [],
    note: 'There are no protected APIs. All resources are public and read-only.',
    public_resources: [ENDPOINTS.products, ENDPOINTS.search, ENDPOINTS.categories, ENDPOINTS.mcp, BASE_URL + '/llms.txt'],
    agent_auth: { register_uri: null, identity_types_supported: ['none'], credential_types_supported: ['none'], notes: 'No registration required.' },
  }, 200, { 'Cache-Control': 'public, max-age=3600' });
}
