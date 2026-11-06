import { staticMetadata, staticView } from '../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/ueber-uns/');
}

export default function Page() {
  return staticView('/ueber-uns/', 'de');
}
