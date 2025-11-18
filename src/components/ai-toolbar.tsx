'use client';

import { useEffect, useRef, useState, type ComponentType } from 'react';
import {
  Bot,
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  Github,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

interface AIToolbarProps {
  pageUrl?: string;
  pageTitle?: string;
  className?: string;
  markdownContent?: string;
}

type OpenPlatform = 'github' | 'chatgpt' | 'claude';

interface OpenOption {
  id: OpenPlatform;
  label: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
  accent: string;
}

export function AIToolbar({
  pageUrl,
  pageTitle = 'Document',
  className = '',
  markdownContent,
}: AIToolbarProps) {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const baseUrl = 'https://doc.pandalla.ai';
  const normalizedPath = pageUrl
    ? pageUrl.startsWith('/')
      ? pageUrl
      : `/${pageUrl}`
    : '';
  const fullUrl = `${baseUrl}${normalizedPath}`;

  const englishPrompt = encodeURIComponent(
    `Read ${fullUrl || baseUrl}, I want to ask questions about it.`,
  );
  const chinesePrompt = encodeURIComponent(
    `请阅读并分析这个文档：${fullUrl || baseUrl}，我想向你提问相关问题。`,
  );

  const openOptions: OpenOption[] = [
    {
      id: 'github',
      label: 'Open in GitHub',
      icon: Github,
      href: 'https://github.com/pandalla',
      accent: 'bg-slate-100 text-slate-900',
    },
    {
      id: 'chatgpt',
      label: 'Open in ChatGPT',
      icon: MessageSquare,
      href: `https://chatgpt.com/?hints=search&q=${englishPrompt}`,
      accent: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'claude',
      label: 'Open in Claude',
      icon: Bot,
      href: `https://claude.ai/new?q=${englishPrompt}`,
      accent: 'bg-amber-50 text-amber-600',
    }
  ];

  const normalizedMarkdown = markdownContent?.trim();

  const copyContent = async () => {
    try {
      if (normalizedMarkdown) {
        await navigator.clipboard.writeText(normalizedMarkdown);
      } else {
        const article =
          document.querySelector('article, main, [role="main"], .prose');
        const textContent = article?.textContent?.trim() || '';
        const safeTitle = pageTitle.trim() || 'Document';
        const content = textContent
          ? `# ${safeTitle}\n\n${textContent}`
          : fullUrl || baseUrl;

        await navigator.clipboard.writeText(content);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleOpen = (option: OpenOption) => {
    window.open(option.href, '_blank', 'noopener,noreferrer');
    setMenuOpen(false);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={copyContent}
          className="inline-flex items-center gap-2 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-900 shadow-sm transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-100"
          title="Copy page content as Markdown"
          type="button"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? 'Copied!' : 'Copy Markdown'}
        </button>

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            Open
            <ChevronDown className="h-4 w-4" />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute left-0 z-20 mt-2 w-64 rounded-3xl border border-slate-100 bg-white p-2 shadow-2xl ring-1 ring-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:ring-0"
            >
              {openOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleOpen(option)}
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${option.accent}`}
                  >
                    <option.icon className="h-4 w-4" />
                  </span>
                  <span>{option.label}</span>
                  <ExternalLink className="ml-auto h-4 w-4 text-slate-400" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="ps-1">
        <hr
          className="h-[1.5px] w-full rounded-full border-0 bg-slate-200/80 dark:bg-white/15"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
