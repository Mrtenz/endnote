import { Handlers, init } from '@sentry/node';
import { ApolloServer } from 'apollo-server-express';
import express, { Express } from 'express';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { Connection, useContainer } from 'typeorm';
import { initialiseConnection } from './database';
import { getVariable } from './environment';
import { NoteResolver } from './resolvers';

if (process.env.SENTRY_BACKEND_ENDPOINT) {
  init({ dsn: process.env.SENTRY_BACKEND_ENDPOINT });
}

useContainer(Container);

/**
 * This function initialises the connection with the database, and sets up the Express and Apollo (GraphQL) server.
 */
export const bootstrap = async (): Promise<{ app: Express; connection: Connection }> => {
  const schema = await buildSchema({
    resolvers: [NoteResolver],
    container: Container
  });

  const connection = await initialiseConnection({
    type: getVariable('DATABASE_TYPE'),
    database: getVariable('DATABASE_NAME'),
    host: getVariable('DATABASE_HOST', false),
    username: getVariable('DATABASE_USER', false),
    password: getVariable('DATABASE_PASSWORD', false)
  });

  const server = new ApolloServer({ schema });
  const app = express();

  if (process.env.SENTRY_ENDPOINT) {
    app.use(Handlers.requestHandler());
  }

  server.applyMiddleware({ app });

  return { app, connection };
};
