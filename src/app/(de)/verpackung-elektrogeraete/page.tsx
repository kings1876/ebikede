import { staticMetadata, staticView } from '../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/verpackung-elektrogeraete/');
}

export default function Page() {
  return staticView('/verpackung-elektrogeraete/', 'de');
}
