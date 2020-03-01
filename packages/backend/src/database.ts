import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import migrations from './migrations';
import { Note } from './models';

interface DatabaseOptions {
  type: string;
  database: string;
  username?: string;
  password?: string;
  host?: string;
  port?: number;
}

/**
 * Initialise a connection with the database.
 */
export const initialiseConnection = async (options: DatabaseOptions): Promise<Connection> => {
  const connection = await createConnection({
    ...options,
    entities: [Note],
    migrations,
    migrationsRun: true
  } as ConnectionOptions);

  await connection.runMigrations();

  return connection;
};
