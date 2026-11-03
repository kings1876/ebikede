import { BASE_URL } from '../../../lib/seo';
import { SITE_NAME, json } from '../../../lib/agent';

export const dynamic = 'force-static';

export function GET() {
  return json({
    resource: BASE_URL,
    resource_name: SITE_NAME + ' public catalogue',
    authorization_servers: [],
    scopes_supported: [],
    bearer_methods_supported: [],
    resource_documentation: BASE_URL + '/auth.md',
    tls_client_certificate_bound_access_tokens: false,
    note: 'All resources are public and read-only. No OAuth token is required.',
  }, 200, { 'Cache-Control': 'public, max-age=3600' });
}
