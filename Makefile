build:
	rm -rf static/bundle; NODE_ENV=production ./node_modules/.bin/webpack --config ./webpack.config.js

rebuild:
	sudo rm -rf node_modules
	make

init:
	npm install --depth=0
	npm install -g webpack --depth=0

install:
	npm install
