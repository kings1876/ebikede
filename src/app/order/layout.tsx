import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Bestellung | EBike Zu Verkaufen',
  robots: { index: false, follow: false },
};

export default function OrderLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-slate-50 text-slate-900">
        <div className="max-w-xl mx-auto px-4 py-10">
          <a href="/" className="text-sm font-black text-slate-900">
            EBike Zu Verkaufen
          </a>
          {children}
        </div>
      </body>
    </html>
  );
}
