import { catalogMetadata, catalogView } from '../../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/en/withdrawal/');
}

export default function Page() {
  return catalogView('/en/withdrawal/', 'en');
}
