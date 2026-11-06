import { catalogMetadata, catalogParams, catalogView } from '../../../../lib/catalogRoute';

export const dynamicParams = false;

export function generateStaticParams() {
  return catalogParams('de', 'angebote');
}

type Props = { params: Promise<{ slug?: string[] }> };

const pathOf = (slug?: string[]) => '/angebote/' + (slug ?? []).map((s) => s + '/').join('');

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return catalogMetadata(pathOf(slug));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return catalogView(pathOf(slug), 'de');
}
