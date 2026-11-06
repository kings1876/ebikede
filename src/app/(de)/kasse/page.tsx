import { catalogMetadata, catalogView } from '../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/kasse/');
}

export default function Page() {
  return catalogView('/kasse/', 'de');
}
