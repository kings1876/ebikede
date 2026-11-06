import { catalogMetadata, catalogView } from '../../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/en/cart/');
}

export default function Page() {
  return catalogView('/en/cart/', 'en');
}
