import { staticMetadata, staticView } from '../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/garantie/');
}

export default function Page() {
  return staticView('/garantie/', 'de');
}
