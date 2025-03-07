FROM oven/bun:latest AS base

WORKDIR /app

COPY package.json bun.lock ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/

RUN bun install --frozen-lockfile --production --ignore-scripts

FROM base AS builder

RUN bun install --frozen-lockfile --ignore-scripts

COPY . .

RUN bun run build
RUN bun run assemble

FROM oven/bun:slim AS production

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=builder /app/dist/ .

EXPOSE 3000

CMD ["bun", "run", "src/main.js"]
