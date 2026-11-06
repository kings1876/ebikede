import { catalogMetadata, catalogView } from '../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/rueckgabe/');
}

export default function Page() {
  return catalogView('/rueckgabe/', 'de');
}
