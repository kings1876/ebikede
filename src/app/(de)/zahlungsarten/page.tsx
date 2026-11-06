import { staticMetadata, staticView } from '../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/zahlungsarten/');
}

export default function Page() {
  return staticView('/zahlungsarten/', 'de');
}
