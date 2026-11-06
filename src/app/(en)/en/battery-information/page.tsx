import { staticMetadata, staticView } from '../../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/en/battery-information/');
}

export default function Page() {
  return staticView('/en/battery-information/', 'en');
}
