# Symfony depdencies
FROM composer:latest AS build
ENV APP_ENV=prod
WORKDIR /app/
COPY composer.json composer.lock /app/
RUN composer install --no-scripts --no-autoloader \
  && composer dump-autoload --optimize && composer dump-env prod --empty


############
# Frontend #
############
FROM node:23-alpine AS frontend-build

WORKDIR /application
COPY . /application

COPY package.json package-lock.json ./

RUN npm install

COPY assets   ./assets
COPY webpack* ./
COPY public   ./public
COPY tsconfig.json ./

RUN ./node_modules/.bin/encore production

FROM php:8.4-apache

ARG DATABASE_URL
ARG PORT
ENV DATABASE_URL $DATABASE_URL
ENV PORT $PORT

# Configure PHP for Cloud Run.
# Precompile PHP code with opcache.
RUN docker-php-ext-install -j "$(nproc)" opcache
RUN set -ex; \
  { \
  echo "; Cloud Run enforces memory & timeouts"; \
  echo "memory_limit = -1"; \
  echo "max_execution_time = 0"; \
  echo "; File upload at Cloud Run network limit"; \
  echo "upload_max_filesize = 1M"; \
  echo "post_max_size = 1M"; \
  echo "; Configure Opcache for Containers"; \
  echo "opcache.enable = On"; \
  echo "opcache.validate_timestamps = Off"; \
  echo "; Configure Opcache Memory (Application-specific)"; \
  echo "opcache.memory_consumption = 32"; \
  } > "$PHP_INI_DIR/conf.d/cloud-run.ini"

WORKDIR /var/www

COPY docker/vhost.conf /etc/apache2/sites-available/000-default.conf
COPY --from=build /app/vendor /var/www/vendor
COPY --from=build /app/.env.local.php /var/www/.env.local.php
COPY --chown=www-data:www-data . /var/www/
COPY --chown=www-data:www-data --from=frontend-build           /application/public/build  /var/www/public/build

RUN sed -i 's/80/${PORT}/g' /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

RUN a2enmod rewrite

USER www-data

ENV APP_ENV=prod

# Clear the project cache and compile the assets
RUN php bin/console cache:clear --no-warmup && \
  php bin/console cache:warmup


CMD ["apache2-foreground"]