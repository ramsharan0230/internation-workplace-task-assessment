FROM ubuntu:24.04

LABEL maintainer="Laravel Sail"

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    software-properties-common \
    curl \
    gnupg \
    ca-certificates \
    unzip \
    git \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libpq-dev \
    zip \
    supervisor \
    php8.4 \
    php8.4-cli \
    php8.4-common \
    php8.4-bcmath \
    php8.4-curl \
    php8.4-gd \
    php8.4-mbstring \
    php8.4-mysql \
    php8.4-pgsql \
    php8.4-xml \
    php8.4-zip \
    php8.4-soap \
    php8.4-readline \
    php8.4-xdebug \
    php8.4-pcov \
    php8.4-tokenizer \
    php8.4-intl \
    php8.4-sqlite3 \
    php8.4-opcache \
    php8.4-dev \
    php-redis \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Node.js 18 and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Add a non-root user (sail)
ARG WWWGROUP
ARG WWWUSER
RUN groupadd --force -g ${WWWGROUP:-1000} sail \
    && useradd -ms /bin/bash --no-user-group -g ${WWWGROUP:-1000} -u ${WWWUSER:-1000} sail

# Copy start script and supervisor config (you can customize this if needed)
COPY start-container /usr/local/bin/start-container
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY php.ini /etc/php/8.4/cli/conf.d/99-sail.ini

RUN chmod +x /usr/local/bin/start-container

# Default CMD
CMD ["start-container"]
