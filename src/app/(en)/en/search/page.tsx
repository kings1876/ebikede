import { catalogMetadata, catalogView } from '../../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/en/search/');
}

export default function Page() {
  return catalogView('/en/search/', 'en');
}
