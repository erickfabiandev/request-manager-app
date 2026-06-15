# Etapa 1 — Base
FROM node:20-alpine AS base

# Etapa 2 — Instala dependencias
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Etapa 3 — Compila la app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_PUBLIC_API_URL=http://localhost:3000
RUN npm run build

# Etapa 4 — Runner (imagen final liviana)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=http://localhost:3000

# Copiamos solo los archivos necesarios del build (standalone output)
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]