import { catalogMetadata, catalogView } from '../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/widerruf/');
}

export default function Page() {
  return catalogView('/widerruf/', 'de');
}
