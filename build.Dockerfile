FROM node:6

WORKDIR /home/default

# copy build config files
COPY package.json package.json
COPY webpack.config.js webpack.config.js

RUN npm install

# copy source directories
COPY frontend frontend

ENTRYPOINT node_modules/.bin/webpack

