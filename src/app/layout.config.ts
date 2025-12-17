import type { LinkItemType } from 'fumadocs-ui/layouts/shared';

export const layoutConfig: { links: LinkItemType[] } = {
  links: [
    {
      type: 'main',
      text: 'API Reference',
      url: '/api-reference',
    },
    {
      type: 'main',
      text: 'API Portal',
      url: 'https://api.pandalla.ai',
      external: true,
    },
  ],
};
