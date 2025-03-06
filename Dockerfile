# Base stage for installing dependencies
FROM node:21-alpine as base

WORKDIR /app

# Add dependencies to get Bun working on Alpine
RUN apk --no-cache add ca-certificates wget \
    && wget https://raw.githubusercontent.com/athalonis/docker-alpine-rpi-glibc-builder/master/glibc-2.26-r1.apk \
    && apk add --allow-untrusted --force-overwrite glibc-2.26-r1.apk \
    && rm glibc-2.26-r1.apk

# Install Bun
RUN npm install -g bun

# Install dependencies
COPY package.json bun.lock ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/
RUN bun i

# Build stage
FROM base as builder

COPY . .
RUN bun run build
RUN bun run assemble

# Production stage
FROM node:21-alpine as production

WORKDIR /app

# Copy necessary files from builder stage
COPY --from=builder /app/dist ./dist

CMD ["bun", "run", "dist/main.js"]
