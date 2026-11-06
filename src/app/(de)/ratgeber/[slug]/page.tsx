import { staticMetadata, staticView } from '../../../../lib/staticRoutes';
import { GUIDES } from '../../../../data/guides';

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slugDe }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return staticMetadata(`/ratgeber/${slug}/`);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return staticView(`/ratgeber/${slug}/`, 'de');
}
