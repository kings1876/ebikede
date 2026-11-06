import { staticMetadata, staticView } from '../../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/en/about-us/');
}

export default function Page() {
  return staticView('/en/about-us/', 'en');
}
