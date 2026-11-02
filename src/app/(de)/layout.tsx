import '../globals.css';
import { AppShell } from '../../App';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de-DE">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
