FROM php:8.3-apache

RUN apt-get update && apt-get install -y git unzip libssl-dev \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY composer.json .
RUN composer install --no-interaction

WORKDIR /var/www/html