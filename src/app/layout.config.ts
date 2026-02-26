import type { LinkItemType } from 'fumadocs-ui/layouts/shared';

export const layoutConfig: { links: LinkItemType[] } = {
  links: [
    {
      type: 'main',
      text: '使用指南',
      url: '/docs',
    },
    {
      type: 'main',
      text: '接口调试',
      url: '/api-reference',
    },
  ],
};
