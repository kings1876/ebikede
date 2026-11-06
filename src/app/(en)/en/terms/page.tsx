import { staticMetadata, staticView } from '../../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/en/terms/');
}

export default function Page() {
  return staticView('/en/terms/', 'en');
}
