# Anderson POC web frontend

This repo contains the Symfony based front end running. Symfony is exposing an entire reactjs app as well as a backend service proxy.

## Running

`make dev` should setup PHP & composer through asdf for you.

`make encore` will run the Symfony encore server (this is the one that does TS transpiling and minification)

`make symfony` will run the Symfony process.

## Development

Try to keep react elements in `assets/react/` as frontend APIs will still be built here using Symfony. This will allow the front end service proxy to validate IAP tokens prior to making any requests to backend services. We are not using [Symfony UX React](https://symfony.com/bundles/ux-react/current/index.html) here as that is much more useful when using a Hybrid model with some twig template pages as well as some react components sprinkled in. In our case, the entire FrontEnd is react so the base template simply outputs the react container root node.

## Routing

Routing is accomplished using `react-router`. React will happily change the URL client side but if someone refreshes that page if we don't have Symfony routing for it the user will receive 404 ATM.

## Authentication

This project is setup to validate GCP IAP JWT Tokens. Any controllers that require their actions to validate that token must implement `App\Controller\IAPTokenAuthenticatedController` as a tagging mechanism.

`JWKS_URI` needs to be set and `JWKS_VALIDATION_ENABLED` needs to be truthy to enable it.
