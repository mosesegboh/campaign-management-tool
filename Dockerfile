# stage 1: Build the Laravel application
FROM php:8.2-fpm AS build

# set the working directory
WORKDIR /var/www

# install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    nginx

# install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# copy existing application directory contents
COPY . /var/www

# install Laravel dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# copy existing application permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# stage 2: serve the Laravel application using nginx
FROM nginx:stable-alpine

# remove the default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d

# copy the built Laravel application from Stage 1
COPY --from=build /var/www /var/www

# expose port 80
EXPOSE 80

# start nginx and PHP-FPM
CMD ["sh", "-c", "php-fpm & nginx -g 'daemon off;'"]
