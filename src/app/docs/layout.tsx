import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { RouteWarmup } from '@/components/route-warmup';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions()}>
      <RouteWarmup href="/api-reference" warmCompileInDev />
      {children}
    </DocsLayout>
  );
}
