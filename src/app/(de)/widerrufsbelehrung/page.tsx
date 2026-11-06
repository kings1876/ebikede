import { staticMetadata, staticView } from '../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/widerrufsbelehrung/');
}

export default function Page() {
  return staticView('/widerrufsbelehrung/', 'de');
}
