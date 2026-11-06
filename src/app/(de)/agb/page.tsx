import { staticMetadata, staticView } from '../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/agb/');
}

export default function Page() {
  return staticView('/agb/', 'de');
}
