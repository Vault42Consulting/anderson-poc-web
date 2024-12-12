# Anderson POC Symfony+React Demo Project

Simple symfony front end that exposes a backend for frontend api via PHP and a ReactJS frontend using symfony encore.

The backend for frontend API allows the API for the react app to be customized to fit the react app itself in terms of inputs and outputs from the microservices.

## Prerequisites

- [asdf](https://asdf-vm.com/) for version management
- The following packages (or similar packages) are required for ASDF to build PHP 8.4: `build-essential autoconf automake pkgconf re2c libbz2-dev libcurl4-openssl-dev libxml2-dev libpng-dev libjpeg-dev libssl-dev libzip-dev libmcrypt-dev libreadline-dev libonig-dev libsodium-dev bison libsqlite3-dev libfreetype-dev libsystemd-dev libwebp-dev libxslt1-dev libkrb5-dev libldap2-dev libgd-dev libpq-dev`
- Docker and docker compose for building the GCP CloudRun image
- PHP 8.4

## Setup

To setup the dev environment. Make sure you have the PHP8.4 dependency packages installed and run:

```bash
make dev
```

## Development

Simliar to the Stimulus Symfony UX React package recommendations, this project uses Symfony encore with webpack to manage assets and also process CSS.
Because of this, the application requires 2 processes to run for local development. The symfony server and encore.

Encore transpiles the react code into plain JavaScript and post processes CSS.
To run Encore, run:

```bash
make encore
```

Symfony runs the PHP based server which servers out the React root element in the `index.html.twig` and includes the encore `encore_entry_link_tags` and `encore_entry_script_tags` in `base.html.twig`.
To run Symfony, run:

```bash
make symfony
```

The application will be available at http://localhost:8080

Note: All react elements reside within `assets/react/`

## Docker Compose Details

A docker compose file is included to build the docker image of the solution. The image uses `php8.4-apache` as the base runtime image.

To build the image you can run.

```bash
make build-docker
```

The default image name will be `anderson-pos-web`. To build with a different image name+tag you can use the `IMAGE_NAME` variable. This can be useful to push to a private repository like GCP Artifact Repository.

```bash
IMAGE_NAME=my-custom-image:latest make build-docker
```

If you want to run the image to locally to verify it is you can use.

```bash
make run-docker
```

Or if you used a custom image name

```bash
IMAGE_NAME=my-custom-image:latest make run-docker
```

## Authentication

This app is setup to optionally be run with IAP token validation enabled or disabled.

To enable IAP token validation set the following environment variables:

```bash
IAP_VALIDATION_ENABLED=true
JWKS_URI=<JWKS url for public keys>
```

When enabled, the JWT Token will be validated on each request using `firebase/php-jwt`.

Any controller tagged with the `IAPTokenAuthenticatedController` will ensure that the JWT is present and is valid.

If enabled the following `$request->attributes` will be added automatically by a symfony before filter. They will be available for the duration of the request

- identity_jwtToken (The original IAP JWT Token)
- identity_id (Token `sub` value. GCP recommends using this instead of `x-goog-authenticated-user-id` after you have validated the token. See https://cloud.google.com/iap/docs/signed-headers-howto#retrieving_the_user_identity)
- identity_email (Token `email` value. GCP recommends using this intead of `x-goog-authenticated-user-email` after you have validated the token. See https://cloud.google.com/iap/docs/signed-headers-howto#retrieving_the_user_identity)

## Microservice Interaction

Currently the symphony server side PHP code acts as a BFF for the internal only microservices.
All service requests are proxied through the symfony server to ensure that:

- All requests from clients are authenticated via GCP IAP before reaching any of the internal microservices
- The PHP layer can do additional validation and processing as needed before passing on the request to a microservice

Currently there is only one Microservice proxied which is the Contact microservice. To configure the internal endpoint to that service, use the following environment variable:

```bash
CONTACT_SERVICE_URL_ROOT="http://localhost:8888"
```

## Testing
