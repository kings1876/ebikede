import { BASE_URL } from '../../../lib/seo';
import { json } from '../../../lib/agent';

export const dynamic = 'force-static';

export function GET() {
  return json({
    issuer: BASE_URL,
    note: 'This site does not operate an OpenID Connect provider. All resources are public.',
    public_site: true,
    authorization_endpoint: null,
    token_endpoint: null,
    userinfo_endpoint: null,
    jwks_uri: null,
    scopes_supported: [],
    response_types_supported: [],
    grant_types_supported: [],
    subject_types_supported: [],
    id_token_signing_alg_values_supported: [],
  }, 200, { 'Cache-Control': 'public, max-age=3600' });
}
