import { staticMetadata, staticView } from '../../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/en/guides/');
}

export default function Page() {
  return staticView('/en/guides/', 'en');
}
