import { staticMetadata, staticView } from '../../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/en/returns/');
}

export default function Page() {
  return staticView('/en/returns/', 'en');
}
