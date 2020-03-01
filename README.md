# Endnote

End-to-end encrypted note sharing application.

https://endnote.to

## How it works

Before you send a note to the server, a random password is generated, which is used to derive a cryptographic key
using [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2). The note is then encrypted with
[AES-256 encryption](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard), and a Hash-based Message
Authentication Code is generated. The encrypted content, together with the initialisation vector (IV) that was used
to encrypt the content, and the HMAC are sent to the server. The server generates a random ID
for the note, which is used for sharing purposes, and the generated password is appended as URL hash (which is not sent
to the server at all). Only with this password you will be able to see a note.

## Getting Started

You can also deploy your own version of Endnote by following these instructions. Endnote consists of two separate
modules: the back-end API server and a front-end website. You can run and deploy these modules separate from each other.

### Docker

The easiest way to deploy Endnote is to use Docker (or `docker-compose`).

### `docker-compose`

Here is an example `docker-compose` stack you can use to deploy the application.

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

  back-end:
    image: mortenz/endnote-back-end:latest
    restart: always
    env_file:
      - .env
    environment:
      - PORT=8000
    ports:
      - 8000:8000
    links:
      - postgres:postgres

  front-end:
    image: mortenz/endnote-front-end:latest
    restart: always
    depends_on:
      - back-end
    env_file:
      - .env
    environment:
     - PORT=8001
    ports:
      - 8001:8001
```

### Locally

To install Endnote locally, without Docker, these are the requirements:

- Node.js 12 or newer
- Yarn

Please note that **npm is not supported**. This project uses Yarn's workspaces feature.

First run `yarn` to install all dependencies:

```
$ yarn install
```

Then you can use the `start` and `dev` scripts to run Endnote in production and development mode respectively.

```
$ yarn start
```

```
$ yarn dev
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
