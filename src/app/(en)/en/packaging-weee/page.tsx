import { staticMetadata, staticView } from '../../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/en/packaging-weee/');
}

export default function Page() {
  return staticView('/en/packaging-weee/', 'en');
}
