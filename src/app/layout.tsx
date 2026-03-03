
import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageContext';
import AppLayout from '@/components/layout/AppLayout';

export const metadata: Metadata = {
  title: 'GlobeFlow – Immigration Command Center',
  description: 'Premium Indonesian financial immigration services.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <AppLayout>
            {children}
          </AppLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}
