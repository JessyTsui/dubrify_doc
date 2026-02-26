import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const inter = localFont({
  src: [
    {
      path: '../fonts/inter-latin-wght-normal.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../fonts/inter-latin-wght-italic.woff2',
      weight: '100 900',
      style: 'italic',
    },
  ],
  display: 'swap',
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
});

export const metadata: Metadata = {
  title: {
    default: 'Dubrify API Documentation',
    template: '%s | Dubrify API',
  },
  description: 'Comprehensive API documentation for Dubrify AI services. Learn how to integrate and use our AI APIs for your applications.',
  keywords: ['API', 'Documentation', 'Dubrify', 'AI', 'Machine Learning', 'Developer'],
  authors: [{ name: 'Dubrify AI' }],
  openGraph: {
    title: 'Dubrify API Documentation',
    description: 'Comprehensive API documentation for Dubrify AI services',
    url: 'https://docs.dubrify.com',
    siteName: 'Dubrify API Docs',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dubrify API Documentation',
    description: 'Comprehensive API documentation for Dubrify AI services',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <RootProvider
          search={{
            enabled: true,
          }}
          theme={{
            enabled: true,
            defaultTheme: 'system',
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
