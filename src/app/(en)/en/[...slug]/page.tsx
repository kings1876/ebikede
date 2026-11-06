import { notFound } from 'next/navigation';
import { MainRouter } from '../../../../App';
import { allPaths, buildMetadata, pathFromSlug, resolvePage } from '../../../../lib/seo';
import { PRODUCTS } from '../../../../data/products';
import { isCatalogPath, isStaticPath } from '../../../../lib/staticPaths';
import { jsonLdScript } from '../../../../lib/jsonld';

type Props = { params: Promise<{ slug: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allPaths()
    .filter((p) => p.startsWith('/en/'))
    .filter((p) => p !== '/' && p !== '/en/')
    .filter((p) => !isStaticPath(p) && !isCatalogPath(p, p.includes('/e-bike/')))
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
  const ld = jsonLdScript(info);
  const path = pathFromSlug('en', slug);
  return (
    <>
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />}
      <MainRouter initialProduct={info.productSlug ? PRODUCTS.find((p) => p.slug === info.productSlug) : undefined} />
    </>
  );
}
