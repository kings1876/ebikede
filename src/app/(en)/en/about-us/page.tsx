import { catalogMetadata, catalogView } from '../../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/en/about-us/');
}

export default function Page() {
  return catalogView('/en/about-us/', 'en');
}
