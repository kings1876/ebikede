import { staticMetadata, staticView } from '../../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/en/withdrawal-policy/');
}

export default function Page() {
  return staticView('/en/withdrawal-policy/', 'en');
}
