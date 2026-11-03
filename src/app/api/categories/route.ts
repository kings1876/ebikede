import { json, preflight, categories, brands } from '../../../lib/agent';

export const dynamic = 'force-static';
export const OPTIONS = preflight;

export function GET() {
  return json({ currency: 'EUR', categories: categories(), brands: brands() });
}
