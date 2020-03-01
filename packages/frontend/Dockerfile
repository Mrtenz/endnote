FROM node:12

ARG COMMAND=start
ENV COMMAND ${COMMAND}

WORKDIR /app
COPY tsconfig.json .
COPY package.json .
COPY yarn.lock .

WORKDIR /app/packages/common
COPY ./packages/common .

WORKDIR /app/packages/frontend
COPY ./packages/frontend/package.json .

WORKDIR /app
RUN yarn install --frozen-lockfile

WORKDIR /app/packages/frontend
COPY ./packages/frontend .

EXPOSE 8001

CMD yarn run ${COMMAND}
