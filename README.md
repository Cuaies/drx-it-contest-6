# DRX IT Contest 6

## Prerequisites

- [Docker](https://docs.docker.com/get-started/get-docker/)
- [Node.js](https://nodejs.org/en/download)

## Getting Started

Viewing the decrypted contents of the `.env*` keys: [docs link](https://dotenvx.com/docs/advanced/decrypt)

### Running the project:

Install the deps:

```sh
$ npm ci
```

Build packages:

```sh
$ npm run build
```

Start production server:

```sh
$ npm run start:prod -w packages/server
```

Teardown Docker container:

```sh
$ npx dotenvx run -f .env.production -- npm run docker:clean
```
