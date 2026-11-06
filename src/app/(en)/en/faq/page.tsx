import { staticMetadata, staticView } from '../../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/en/faq/');
}

export default function Page() {
  return staticView('/en/faq/', 'en');
}
