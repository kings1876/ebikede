import { staticMetadata, staticView } from '../../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/en/legal-notice/');
}

export default function Page() {
  return staticView('/en/legal-notice/', 'en');
}
