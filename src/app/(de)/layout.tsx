import '../globals.css';
import { Footer } from '../../components/Footer';
import { AppShell } from '../../components/AppShell';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-DE">
      <head>
        <script src="/js/webmcp.js" defer />
      </head>
      <body>
        <AppShell footer={<Footer lang="de" />}>{children}</AppShell>
      </body>
    </html>
  );
}
