# Endnote

End-to-end encrypted note sharing application.

https://endnote.to

## How it works

Before you send a note to the server, a random password is generated, which is used to derive a cryptographic key using
[PBKDF2](https://en.wikipedia.org/wiki/PBKDF2). The note is then encrypted with
[AES-256 encryption](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard), and a Hash-based Message
Authentication Code is generated
([Encrypt-then-MAC](<https://en.wikipedia.org/wiki/Authenticated_encryption#Encrypt-then-MAC_(EtM)>)). The encrypted
content, together with the initialisation vector (IV) that was used to encrypt the content, and the HMAC are sent to the
server. The server generates a random ID for the note, which is used for sharing purposes, and the generated password is
appended as URL hash (which is not sent to the server at all). Only with this password you will be able to see a note.

When viewing a note, the encrypted content, initialisation vector and HMAC are fetched from the server. A new HMAC is
generated from the encrypted content, and compared with the HMAC fetched from the server. If the HMAC matches, the
content is decrypted using the password and you will see the note.

## Running your own

You can also deploy your own version of Endnote by following these instructions. Endnote consists of two separate
modules: the back-end API server and a front-end website. You can run and deploy these modules separate from each other.

### Docker

The easiest way to deploy Endnote is to use Docker (or `docker-compose`).

### `docker-compose`

Here is a basic example of a `docker-compose` stack you can use to deploy the application.

```yaml
version: '2'

services:
  postgres:
    image: postgres:latest
    restart: always
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=securenote

  backend:
    image: endnote/backend:v0.1.0
    restart: always
    env_file:
      - .env
    ports:
      - 8000:8000
    links:
      - postgres:postgres

  front-end:
    image: endnote/frontend:v0.1.0
    restart: always
    depends_on:
      - backend
    env_file:
      - .env
    ports:
      - 8001:8000
```

For the environment variables, see the section below.

### Development

To run Endnote locally, these are the requirements:

- Node.js 12 or newer
- Yarn
- Docker
- Docker-compose

Please note that **npm is not supported**. This project uses Yarn's workspaces feature.

First run `yarn` to install all dependencies:

```
$ yarn
```

Then you can use the `dev:docker` scripts to run a development stack with Postgres.

```
$ yarn dev:docker
```

### Environment variables

Endnote uses environment variables to configure the application's behaviour. Below is a list of available environment
variables that you can use. Some of these environment variables are required to run Endnote.

#### DATABASE_TYPE

Set the database type you want to use. Supported values are: `postgres`, `mysql`, `mariadb`, `sqlite`.

#### DATABASE_NAME

The name of the database (or file if you're using SQLite) to use.

#### DATABASE_HOST

The hostname or IP address to use to connect to the database.

#### DATABASE_USER

The username to use to connect to the database.

#### DATABASE_PASSWORD

The password to use to connect to the database.

#### RECAPTCHA_SECRET

The secret key to use for reCAPTCHA authentication.
