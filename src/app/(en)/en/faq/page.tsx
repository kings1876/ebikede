import { catalogMetadata, catalogView } from '../../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/en/faq/');
}

export default function Page() {
  return catalogView('/en/faq/', 'en');
}
