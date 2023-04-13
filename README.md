# Chirp

Chirp is a social media platform built with Nuxt.js, Prisma, and MongoDB.

Live version: https://chirp-gamma-five.vercel.app/
GitHub: https://github.com/DavidDomkar/chirp

## Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```
AUTH_ORIGIN=<authentication origin (http://localhost:3000 for local development)>
NUXT_AUTH_SECRET=<32 characters long secure random string>
DATABASE_URL=<mongodb connection string>
```

## Setup

Make sure to install the dependencies:

```bash
yarn install
```

## Seed the database

This will seed the database with the script located in `prisma/seed.ts`:

```bash
yarn seed
```

## Development Server

Start the development server on http://localhost:3000

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```
