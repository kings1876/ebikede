import '../globals.css';
import { Footer } from '../../components/Footer';
import { AppShell } from '../../components/AppShell';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-DE">
      <head>
        <meta name="msvalidate.01" content="7D6F07E69DC6B3FEAD27BC6A852B150E" />
        <script src="/js/webmcp.js" defer />
      </head>
      <body>
        <AppShell footer={<Footer lang="de" />}>{children}</AppShell>
      </body>
    </html>
  );
}
