import { catalogMetadata, catalogView } from '../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/versand/');
}

export default function Page() {
  return catalogView('/versand/', 'de');
}
