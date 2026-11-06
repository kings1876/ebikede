import { staticMetadata, staticView } from '../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/rueckgabe/');
}

export default function Page() {
  return staticView('/rueckgabe/', 'de');
}
