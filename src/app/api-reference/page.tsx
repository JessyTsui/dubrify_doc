'use client';

import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ThemeToggle } from 'fumadocs-ui/components/layout/theme-toggle';
import { useEffect, useState } from 'react';

export default function ApiReferencePage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
        <div className="flex items-center gap-6">
          <Link
            href="/docs"
            className="flex items-center gap-2 text-zinc-700 dark:text-zinc-100 hover:text-black dark:hover:text-white transition-colors font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            使用指南
          </Link>
          <span className="text-zinc-300 dark:text-zinc-500">|</span>
          <span className="text-zinc-900 dark:text-white font-semibold">接口调试</span>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/docs"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
          >
            使用指南 →
          </Link>
        </div>
      </header>

      {/* Scalar API Reference */}
      <div className="flex-1">
        <ApiReferenceReact
          key={isDark ? 'dark' : 'light'}
          configuration={{
            url: '/openapi.json',
            metaData: {
              title: 'Dubrify 接口调试',
              description: 'Dubrify API 接口文档',
            },
            theme: 'kepler',
            hideModels: false,
            defaultOpenAllTags: true,
            darkMode: isDark,
            layout: 'modern',
          }}
        />
      </div>
    </div>
  );
}
