FROM node:12

ARG COMMAND=start
ENV COMMAND ${COMMAND}
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY tsconfig.json .
COPY package.json .
COPY yarn.lock .

WORKDIR /app/packages/common
COPY ./packages/common .

WORKDIR /app/packages/backend
COPY ./packages/backend/package.json .

WORKDIR /app
RUN yarn install --frozen-lockfile

WORKDIR /app/packages/backend
COPY ./packages/backend .

EXPOSE 8000

CMD yarn run ${COMMAND}
