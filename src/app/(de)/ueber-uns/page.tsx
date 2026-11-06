import { catalogMetadata, catalogView } from '../../../lib/catalogRoute';

export function generateMetadata() {
  return catalogMetadata('/ueber-uns/');
}

export default function Page() {
  return catalogView('/ueber-uns/', 'de');
}
