![Node.js CI](https://github.com/pedroeml/dragons-crud/workflows/Node.js%20CI/badge.svg)

# Dragons CRUD

This is a simple Angular project generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9 later upgraded to version 9.1.4.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ ng serve

```

## Build

```bash
# development
$ ng build

# production
$ ng build --prod

# production (GitHub Pages via docs folder)
$ ng build --prod --output-path docs --base-href /dragons-crud/

# production (GitHub Pages via angular-cli-ghpages)
$ ng deploy --base-href=/dragons-crud/ --repo=https://github.com/<username>/<repositoryname>.git --name="Your Git Username" --email=your.mail@example.org
```

## Test

```bash
# unit tests
$ ng test

# end-to-end
$ ng e2e
```

## Serve on a Docker container with NGINX (Production only)

```bash
# starting up
$ docker-compose up

# shutting down
$ docker-compose down
```

Open your browser on `http://localhost/` or `http://127.0.0.1/`.

## Mocked User Credentials

There is only one mocked user at the moment:

```
username: john
password: 123
```
