FROM oven/bun:latest as base

WORKDIR /app

COPY package.json bun.lock ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/

RUN bun install --frozen-lockfile --production

FROM base as builder

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build
RUN bun run assemble

FROM oven/bun:slim as production

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD ["bun", "run", "dist/main.js"]
