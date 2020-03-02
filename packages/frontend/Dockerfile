# Build packages
FROM node:12-alpine as builder

ENV NODE_ENV=production

WORKDIR /app
COPY tsconfig.json package.json yarn.lock ./
COPY ./packages/common ./packages/common/
COPY ./packages/frontend ./packages/frontend/

RUN yarn install --silent --frozen-lockfile --production=false && \
    yarn workspace @endnote/common run build && \
    yarn workspace @endnote/frontend run build

# Static web server
FROM nginx:alpine

COPY package.json ./
COPY --from=builder /app/packages/frontend/dist/ /usr/share/nginx/html/
COPY ./packages/frontend/environment.sh ./packages/frontend/nginx.conf /app/

RUN apk add --no-cache bash && chmod +x /app/environment.sh

EXPOSE 8000

CMD /bin/bash -c /app/environment.sh > /usr/share/nginx/html/config.json && nginx -c /app/nginx.conf
