# Build packages
FROM node:12-alpine as builder

WORKDIR /app
COPY tsconfig.json package.json yarn.lock ./
COPY ./packages/common ./packages/common/
COPY ./packages/backend ./packages/backend/

RUN apk add --no-cache python3 python3-dev build-base && \
    yarn install --silent --frozen-lockfile && \
    yarn workspace @endnote/common run build && \
    yarn workspace @endnote/backend run build

# Install production dependencies
FROM node:12-alpine as dependencies

WORKDIR /app
COPY tsconfig.json package.json yarn.lock ./
COPY ./packages/common/package.json ./packages/common/
COPY ./packages/backend/package.json ./packages/backend/

RUN apk add --no-cache python3 python3-dev build-base && \
    yarn install --silent --frozen-lockfile --production

# Application runner
FROM node:12-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY package.json ./
COPY --from=dependencies /app/node_modules/ ./node_modules/
COPY --from=builder /app/packages/common/ ./packages/common/
COPY --from=builder /app/packages/backend/ ./packages/backend/

WORKDIR /app/packages/backend
EXPOSE 8000
CMD yarn run start
