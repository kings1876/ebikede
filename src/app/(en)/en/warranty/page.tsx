import { staticMetadata, staticView } from '../../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/en/warranty/');
}

export default function Page() {
  return staticView('/en/warranty/', 'en');
}
