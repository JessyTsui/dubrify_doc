'use client';

import { ApiReferenceReact } from '@scalar/api-reference-react';
import '@scalar/api-reference-react/style.css';
import Link from 'next/link';

export default function ApiReferencePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-zinc-900 border-b border-zinc-800">
        <div className="flex items-center gap-6">
          <Link
            href="/docs"
            className="flex items-center gap-2 text-zinc-100 hover:text-white transition-colors font-medium"
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
            Docs
          </Link>
          <span className="text-zinc-500">|</span>
          <span className="text-white font-semibold">API Reference</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://api.pandalla.ai"
            target="_blank"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            API Portal →
          </Link>
        </div>
      </header>

      {/* Scalar API Reference */}
      <div className="flex-1">
        <ApiReferenceReact
          configuration={{
            url: '/openapi.json',
            metaData: {
              title: 'Dubrify API Reference',
              description: 'Dubrify API 接口文档',
            },
            theme: 'kepler',
            hideModels: false,
            darkMode: true,
            layout: 'modern',
          }}
        />
      </div>
    </div>
  );
}
