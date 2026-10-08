import type { Metadata } from 'next';
import '@fontsource-variable/archivo';
import '@fontsource/noto-sans-thaana/400.css';
import '@fontsource/noto-sans-thaana/700.css';
import './globals.css';
import { copy } from '@/lib/copy';

export const metadata: Metadata = {
  title: `${copy.siteName} ${copy.year}`,
  description: copy.metaDescription,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="dv" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
