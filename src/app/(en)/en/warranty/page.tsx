import { catalogMetadata, catalogView } from '../../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/en/warranty/');
}

export default function Page() {
  return catalogView('/en/warranty/', 'en');
}
