import { staticMetadata, staticView } from '../../../lib/staticRoutes';

export function generateMetadata() {
  return staticMetadata('/batterie-hinweise/');
}

export default function Page() {
  return staticView('/batterie-hinweise/', 'de');
}
