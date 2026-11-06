import { catalogMetadata, catalogView } from '../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/faq/');
}

export default function Page() {
  return catalogView('/faq/', 'de');
}
