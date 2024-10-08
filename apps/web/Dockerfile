FROM node:20.16.0-alpine3.20 AS base

FROM base AS builder
RUN apk update && \
  apk add --no-cache libc6-compat

WORKDIR /app
COPY . .
RUN npx turbo prune web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk update && \
  apk add --no-cache libc6-compat
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json /app/out/pnpm-lock.yaml ./
# for prisma
COPY --from=builder /app/out/full/packages/db packages/db
COPY --from=builder /app/out/full/tooling/eslint tooling/eslint
COPY --from=builder /app/out/full/tooling/prettier tooling/prettier
COPY --from=builder /app/out/full/tooling/typescript tooling/typescript
COPY --from=builder /app/out/full/apps/web/.env.development.local apps/web

RUN --mount=type=cache,id=pnmcache,target=/pnpm_store \
  npm install -g pnpm && \
  pnpm config set store-dir /pnpm_store && \
  pnpm config set package-import-method copy && \
  pnpm install --prefer-offline --ignore-scripts --frozen-lockfile && \
  pnpm -F @repo/db db:generate:dev:env && \
  pnpm -F @repo/db build

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json .

ENV NEXT_TELEMETRY_DISABLED 1

ARG ARG_NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$ARG_NEXT_PUBLIC_SITE_URL

RUN --mount=type=secret,id=SECRET_ENVS,required \
  source /run/secrets/SECRET_ENVS && \
  NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
  DATABASE_URL=$DATABASE_URL \
  ADMIN_USERNAME=$ADMIN_USERNAME \
  ADMIN_PASSWORD=$ADMIN_PASSWORD \
  pnpm turbo build --filter=web...

FROM base AS runner
WORKDIR /app

RUN npm install -g pnpm

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.mjs .
COPY --from=installer /app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone .
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public apps/web/public
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/uploads uploads

COPY --from=builder --chown=nextjs:nodejs /app/out/full/packages/db/src/schema.prisma packages/db/src/
COPY --from=builder --chown=nextjs:nodejs /app/out/full/packages/db/src/migrations packages/db/prisma/migrations

COPY --from=installer /app/apps/web/start.sh .

ENV PORT=3000 \
  NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD ["sh", "start.sh"]
