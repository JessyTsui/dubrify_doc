# syntax=docker/dockerfile:1

FROM oven/bun:1.1.8 AS deps
WORKDIR /app

COPY package.json bun.lockb ./
COPY source.config.ts tsconfig.json ./
RUN bun install --frozen-lockfile --ignore-scripts

FROM node:22-bookworm-slim AS builder
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/bun.lockb ./bun.lockb
COPY --from=deps /app/source.config.ts ./source.config.ts
COPY --from=deps /app/tsconfig.json ./tsconfig.json
COPY . .

RUN mkdir -p public

RUN node --input-type=module -e "import { rm } from 'fs/promises'; import { postInstall } from 'fumadocs-mdx/next'; await rm('.source',{recursive:true,force:true}); await postInstall('source.config.ts','.source');" \
  && npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001

RUN apt-get update \
  && apt-get install -y --no-install-recommends nginx ca-certificates bash curl \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* \
  && mkdir -p /run/nginx \
  && addgroup --system nginx && adduser --system --ingroup nginx --no-create-home nginx

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/start.sh /start.sh

COPY --from=builder /app/.next/standalone ./standalone
COPY --from=builder /app/.next/static ./standalone/.next/static
COPY --from=builder /app/public ./standalone/public

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD curl -f http://127.0.0.1:3000/ || exit 1

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "/start.sh"]
CMD ["nginx", "-g", "daemon off;"]
