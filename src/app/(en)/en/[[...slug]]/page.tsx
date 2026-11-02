import { notFound } from 'next/navigation';
import { MainRouter } from '../../../../App';
import { allPaths, buildMetadata, pathFromSlug, resolvePage } from '../../../../lib/seo';

type Props = { params: Promise<{ slug?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allPaths()
    .filter((p) => p.startsWith('/en/'))
    .map((p) => ({ slug: p.replace(/^\/en\//, '').split('/').filter(Boolean) }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildMetadata(resolvePage(pathFromSlug('en', slug)));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const info = resolvePage(pathFromSlug('en', slug));
  if (info.kind === 'none') notFound();
  return <MainRouter />;
}
