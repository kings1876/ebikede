import { staticMetadata, staticView } from '../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/versand/');
}

export default function Page() {
  return staticView('/versand/', 'de');
}
