import { catalogMetadata, catalogView } from '../../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/en/checkout/');
}

export default function Page() {
  return catalogView('/en/checkout/', 'en');
}
