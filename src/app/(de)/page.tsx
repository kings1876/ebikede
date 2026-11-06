import { notFound } from 'next/navigation';
import { buildMetadata, resolvePage } from '../../lib/seo';
import { jsonLdScript } from '../../lib/jsonld';
import { HomePage } from '../../components/HomePage';

const PATH = '/';

export function generateMetadata() {
  return buildMetadata(resolvePage(PATH));
}

export default function Page() {
  const info = resolvePage(PATH);
  if (info.kind === 'none') notFound();
  const ld = jsonLdScript(info);
  return (
    <>
      {ld && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ld }} />}
      <HomePage lang="de" />
    </>
  );
}
