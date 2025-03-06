# Build the React app
FROM node:21-alpine as runner

WORKDIR /app

# Add dependencies to get Bun working on Alpine
RUN apk --no-cache add ca-certificates wget
RUN wget https://raw.githubusercontent.com/athalonis/docker-alpine-rpi-glibc-builder/master/glibc-2.26-r1.apk
RUN apk add --allow-untrusted --force-overwrite glibc-2.26-r1.apk
RUN rm glibc-2.26-r1.apk

# Install Bun
RUN npm install -g bun

COPY . ./

RUN bun i
RUN bun run build
RUN bun run assemble

COPY . .

CMD ["bun", "run", "dist/main.js"]

