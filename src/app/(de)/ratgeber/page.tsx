import { staticMetadata, staticView } from '../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/ratgeber/');
}

export default function Page() {
  return staticView('/ratgeber/', 'de');
}
