# Self Hosting Guide

**It is recommended that you use Docker / Docker Compose**

### Requirements

- [`Node.js`](https://nodejs.org): To run the bot
- [`PostgreSQL`](https://www.postgresql.org/): To store persistent data

### Optional additions

- [`Sentry`](https://sentry.io): Stack tracing
- [`KSoft.Si`](https://api.ksoft.si): Provides images

### Setup

- Firstly we need to install yarn if we don't have it already via NPM: `npm i -g yarn`
- Now we need to install our dependencies and dev-dependencies: `yarn` or `yarn install`

### Configuration

- Now we must configure the the bot by copying the .env.development file: `cp src/.env.development src/.env.development.local`
- Then fill out the fields.

### Setting up our Database

- We need to generate our prisma typings: `yarn prisma:gen`
- Now we need to copy the .env.example file as .env: `cp prisma/.env.example src/.env`
- Now add your PostgreSQL connection string in the DATABASE_URL variable.

### Finishing

- Now we can build the bot: `yarn build`
- To start the discord bot: `yarn start`

Finished!

## Setup (Docker)

**Firstly follow the Configuration and Database setup steps above**

### Running

- cd into the .docker directory: `cd .docker`
- Now run docker compose: `docker compose up --build` or `docker compose up --build -d` (Runs detached)

Finished!

If you are having trouble join the discord [here](https://discord.gg/sb9sF2kFg8)
