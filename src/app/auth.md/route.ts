import { BASE_URL } from '../../lib/seo';
import { SITE_NAME, ENDPOINTS, text } from '../../lib/agent';

export const dynamic = 'force-static';

export function GET() {
  const body = `# Auth.md

${SITE_NAME} is a public product catalogue. No account, key or token is needed to read it.

## Agent registration

There is nothing to register. All pages and the read-only JSON endpoints are public.

| Resource | URL |
|---|---|
| Product API | ${ENDPOINTS.products} |
| Search API | ${ENDPOINTS.search} |
| Categories API | ${ENDPOINTS.categories} |
| MCP endpoint (read-only tools) | ${ENDPOINTS.mcp} |
| llms.txt | ${BASE_URL}/llms.txt |

\`\`\`json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public and read-only."
  }
}
\`\`\`

## Limits

The endpoints are read-only. They cannot place orders, take payments or change anything. Prices are list prices and are confirmed by the shop.
`;
  return text(body, 'text/markdown; charset=utf-8');
}
