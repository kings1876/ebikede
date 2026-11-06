import { catalogMetadata, catalogView } from '../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/zahlungsarten/');
}

export default function Page() {
  return catalogView('/zahlungsarten/', 'de');
}
