import { mkdir, copyFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

async function main() {
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const projectRoot = resolve(scriptDir, '..');
  const fontsDir = resolve(projectRoot, 'src/fonts');
  const pkgDir = dirname(require.resolve('@fontsource-variable/inter/package.json'));

  await mkdir(fontsDir, { recursive: true });

  const fonts = [
    {
      src: 'inter-latin-wght-normal.woff2',
      dest: 'inter-latin-wght-normal.woff2',
    },
    {
      src: 'inter-latin-wght-italic.woff2',
      dest: 'inter-latin-wght-italic.woff2',
    },
  ];

  await Promise.all(
    fonts.map(async ({ src, dest }) => {
      const from = resolve(pkgDir, 'files', src);
      const to = resolve(fontsDir, dest);
      await copyFile(from, to);
    }),
  );
}

main().catch((error) => {
  console.error('Failed to prepare fonts:', error);
  process.exit(1);
});
