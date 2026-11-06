import { catalogMetadata, catalogView } from '../../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/en/payment-methods/');
}

export default function Page() {
  return catalogView('/en/payment-methods/', 'en');
}
