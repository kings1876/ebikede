import { staticMetadata, staticView } from '../../../../../lib/staticRoutes';
import { GUIDES } from '../../../../../data/guides';

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slugEn }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return staticMetadata(`/en/guides/${slug}/`);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return staticView(`/en/guides/${slug}/`, 'en');
}
