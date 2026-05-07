import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { ReduxProvider } from '@/components/ReduxProvider';
import AuthRehydrator from '@/components/AuthRehydrator';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Maison Noir — Fine Dining',
    template: '%s | Maison Noir',
  },
  description: 'An extraordinary fine dining experience. Award-winning cuisine, impeccable service, and an atmosphere of timeless elegance in the heart of the city.',
  keywords: ['fine dining', 'luxury restaurant', 'Michelin', 'gourmet', 'chef', 'reservation'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Maison Noir',
    title: 'Maison Noir — Fine Dining',
    description: 'An extraordinary fine dining experience.',
    images: [{ url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maison Noir — Fine Dining',
    description: 'An extraordinary fine dining experience.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-noir-950 text-cream-100 font-body antialiased">
        <ReduxProvider>
          <AuthRehydrator />
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e1e1e',
                color: '#faf8f2',
                border: '1px solid #d4af37',
                fontFamily: 'var(--font-jost)',
                fontSize: '14px',
                letterSpacing: '0.02em',
              },
              success: { iconTheme: { primary: '#d4af37', secondary: '#1e1e1e' } },
              error: { iconTheme: { primary: '#e53e3e', secondary: '#1e1e1e' } },
            }}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
