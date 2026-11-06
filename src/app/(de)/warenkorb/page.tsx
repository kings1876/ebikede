import { catalogMetadata, catalogView } from '../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/warenkorb/');
}

export default function Page() {
  return catalogView('/warenkorb/', 'de');
}
