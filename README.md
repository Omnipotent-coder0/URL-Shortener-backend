# Typescript Node.js Backend Boilerplate code

Hello Everyone, this is a monolithic architecture based, Typescript Node.js Backend Boilerplate code, using mongoose as orm with sample authentication setuped.


### Setup your local .env file

We use a `.env` file to declare a number of environment variables that are needed to run the application. Most of these can be left as is in your development environment, but a few need to be customized.

### Install npm packages

There are a number of package.json files in the repo, and for each one npm install needs to be run.

From the root of the repo, run the following commands:

```shell
npm install
```

### coding structure
Controller:
  1. Do not include business logic.
  2. Always invoke policies and services.
  3. Avoid direct calls to repositories.
  4. Refrain from invoking validators.

Services:
  1. Consistently invoke repositories.
  2. Do not invoke validators or policies.
  3. Avoid direct usage of request objects.

Policies:
  1. Consistently invoke repositories.
  2. Do not implement business logic.
  3. Focus solely on parameter validation and object creation.

## Running the app locally

Running the app locally is managed via a number of npm scripts.

```shell
npm run dev
```

Hope you guys find it helpful.

