import { staticMetadata, staticView } from '../../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/en/privacy/');
}

export default function Page() {
  return staticView('/en/privacy/', 'en');
}
