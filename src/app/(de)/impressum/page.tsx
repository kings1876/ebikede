import { staticMetadata, staticView } from '../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/impressum/');
}

export default function Page() {
  return staticView('/impressum/', 'de');
}
