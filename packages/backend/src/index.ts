import { Server } from 'http';
import 'reflect-metadata';
import { bootstrap } from './server';

const PORT = process.env.PORT || 8000;

/**
 * Close an HTTP server with a Promise-based callback.
 *
 * @param {Server} server
 * @return {Promise<void>}
 */
const closeServer = (server: Server): Promise<void> => {
  return new Promise((resolve, reject) => {
    server.close(error => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
};

bootstrap()
  .then(({ app, connection }) => {
    const server = app.listen(PORT);

    /**
     * Gracefully shutdown on SIGTERM.
     */
    process.on('SIGTERM', () => {
      Promise.all([closeServer(server), connection.close()])
        .then(() => process.exit(0))
        .catch(error => {
          console.error('Could not gracefully stop server:', error);
          process.exit(1);
        });
    });
  })
  // tslint:disable-next-line:no-console
  .then(() => console.log(`Server is running on http://0.0.0.0:${PORT}`))
  .catch(console.error);
