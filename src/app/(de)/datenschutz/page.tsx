import { staticMetadata, staticView } from '../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/datenschutz/');
}

export default function Page() {
  return staticView('/datenschutz/', 'de');
}
