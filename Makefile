dev:
	asdf plugin add php
	asdf install
	wget https://get.symfony.com/cli/installer -O - | bash
	composer install
	npm i

encore:
	npm run dev-server

symfony:
	symfony serve

build-docker:
	docker compose -f ./docker/docker-compose.yaml build

run-docker:
	docker compose -f ./docker/docker-compose.yaml up -d


