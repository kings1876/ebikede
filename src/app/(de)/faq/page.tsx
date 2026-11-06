import { staticMetadata, staticView } from '../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/faq/');
}

export default function Page() {
  return staticView('/faq/', 'de');
}
