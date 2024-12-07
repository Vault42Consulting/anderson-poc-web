# Installs dev dependencies to build PHP and runs asdf install. Assumes ubuntu installation target. asdf installs composer and the target also installs the symfony cli
dev:
	sudo apt-get install -y build-essential autoconf automake pkgconf re2c libbz2-dev libcurl4-openssl-dev libxml2-dev libpng-dev libjpeg-dev libssl-dev libzip-dev libmcrypt-dev libreadline-dev libonig-dev libsodium-dev bison libsqlite3-dev libfreetype-dev libsystemd-dev libwebp-dev libxslt1-dev libkrb5-dev libldap2-dev libgd-dev libpq-dev
	asdf install
	wget https://get.symfony.com/cli/installer -O - | bash

make encore:
	npm run dev-server

make symfony:
	symfony serve