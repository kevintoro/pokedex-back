# Install dependencies only when needed
FROM node:25-alpine3.23 AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build the app with cache dependencies
FROM node:25-alpine3.23 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


# Production image, copy all the files and run next
FROM node:25-alpine3.23 AS runner

# Set working directory
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist

CMD [ "node","dist/main" ]
