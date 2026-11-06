import { catalogMetadata, catalogView } from '../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/garantie/');
}

export default function Page() {
  return catalogView('/garantie/', 'de');
}
