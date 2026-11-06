import { catalogMetadata, catalogView } from '../../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/en/shipping/');
}

export default function Page() {
  return catalogView('/en/shipping/', 'en');
}
