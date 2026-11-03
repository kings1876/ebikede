import { BASE_URL } from '../../../../lib/seo';
import { SITE_NAME, SITE_DESC, ENDPOINTS, json } from '../../../../lib/agent';
import { createHash } from 'node:crypto';

export const dynamic = 'force-static';

const sha = (s: string) => createHash('sha256').update(s).digest('hex');

export function GET() {
  const skills = [
    { name: 'browse-products', type: 'navigation', description: 'Browse the e-bike catalogue by category or brand', url: BASE_URL + '/e-bikes/' },
    { name: 'search-products-api', type: 'catalog', description: 'Search e-bikes as JSON by text, category, brand and maximum price', url: ENDPOINTS.search },
    { name: 'list-categories-api', type: 'catalog', description: 'List categories with model counts and starting prices as JSON', url: ENDPOINTS.categories },
    { name: 'read-guides', type: 'content', description: 'Buying guides: leasing, subsidies, battery care, traffic law', url: BASE_URL + '/ratgeber/' },
  ].map((s) => ({ ...s, sha256: sha(s.name + s.url) }));
  return json({ $schema: 'https://agentskills.io/schema/v0.2.0/index.json', name: SITE_NAME, url: BASE_URL, description: SITE_DESC, skills }, 200, { 'Cache-Control': 'public, max-age=3600' });
}
