import { staticMetadata, staticView } from '../../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/en/payment-methods/');
}

export default function Page() {
  return staticView('/en/payment-methods/', 'en');
}
