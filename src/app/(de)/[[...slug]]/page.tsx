import { notFound } from 'next/navigation';
import { MainRouter } from '../../../App';
import { allPaths, buildMetadata, pathFromSlug, resolvePage } from '../../../lib/seo';
import { jsonLdScript } from '../../../lib/jsonld';

type Props = { params: Promise<{ slug?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allPaths()
    .filter((p) => !p.startsWith('/en/') && p !== '/en/')
    .map((p) => ({ slug: p.split('/').filter(Boolean) }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return buildMetadata(resolvePage(pathFromSlug('de', slug)));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const info = resolvePage(pathFromSlug('de', slug));
  if (info.kind === 'none') notFound();
  const ld = jsonLdScript(info);
  return (
    <>
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />}
      <MainRouter />
    </>
  );
}
