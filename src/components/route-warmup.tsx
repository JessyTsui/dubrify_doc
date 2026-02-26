'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type RouteWarmupProps = {
  href: string;
  warmCompileInDev?: boolean;
};

export function RouteWarmup({ href, warmCompileInDev = false }: RouteWarmupProps) {
  const router = useRouter();

  useEffect(() => {
    const warm = () => {
      router.prefetch(href);

      // Next.js dev server compiles routes on demand; this warms the target route in background.
      if (warmCompileInDev && process.env.NODE_ENV === 'development') {
        fetch(href, {
          cache: 'no-store',
          credentials: 'same-origin',
        }).catch(() => {
          // Best effort warmup; ignore failures.
        });
      }
    };

    const windowWithIdle = window as Window & {
      requestIdleCallback?: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (windowWithIdle.requestIdleCallback) {
      const idleId = windowWithIdle.requestIdleCallback(() => warm(), { timeout: 2000 });

      return () => {
        windowWithIdle.cancelIdleCallback?.(idleId);
      };
    }

    const timeoutId = window.setTimeout(warm, 800);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [href, router, warmCompileInDev]);

  return null;
}
