# syntax=docker/dockerfile:1

FROM oven/bun:1.1.8 AS deps
WORKDIR /app

COPY package.json bun.lockb ./
COPY source.config.ts tsconfig.json ./
RUN bun install --frozen-lockfile --ignore-scripts

FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/bun.lockb ./bun.lockb
COPY --from=deps /app/source.config.ts ./source.config.ts
COPY --from=deps /app/tsconfig.json ./tsconfig.json
COPY . .

RUN node scripts/prepare-fonts.mjs

RUN mkdir -p public

RUN node --input-type=module -e "import { rm } from 'fs/promises'; import { postInstall } from 'fumadocs-mdx/next'; await rm('.source',{recursive:true,force:true}); await postInstall('source.config.ts','.source');" \
  && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN apk add --no-cache nginx curl bash ca-certificates \
  && mkdir -p /run/nginx /tmp/client_temp /tmp/proxy_temp_path /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp \
  && addgroup -S nginx >/dev/null 2>&1 || true \
  && adduser -S -G nginx nginx >/dev/null 2>&1 || true \
  && chown -R nginx:nginx /run/nginx /tmp/client_temp /tmp/proxy_temp_path /tmp/fastcgi_temp /tmp/uwsgi_temp /tmp/scgi_temp

COPY docker/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/.next/standalone ./standalone
COPY --from=builder /app/.next/static ./standalone/.next/static
COPY --from=builder /app/public ./standalone/public

RUN chown -R nginx:nginx /app

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD curl -f http://127.0.0.1:8080/ || exit 1

USER nginx

EXPOSE 8080

CMD ["bash", "-lc", "node /app/standalone/server.js & exec nginx -g 'daemon off;'"]
