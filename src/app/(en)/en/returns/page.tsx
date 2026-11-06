import { catalogMetadata, catalogView } from '../../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/en/returns/');
}

export default function Page() {
  return catalogView('/en/returns/', 'en');
}
