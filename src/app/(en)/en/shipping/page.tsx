import { staticMetadata, staticView } from '../../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/en/shipping/');
}

export default function Page() {
  return staticView('/en/shipping/', 'en');
}
