import { catalogMetadata, catalogView } from '../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/suche/');
}

export default function Page() {
  return catalogView('/suche/', 'de');
}
