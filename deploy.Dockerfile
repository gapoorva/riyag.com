FROM node:6

WORKDIR /home/default


# copy dependency config
COPY ./package.json /home/default
COPY ./webpack.config.js /home/default

# we didn't need webpack.config.js but pulling it allows docker to use 
# the layer it computed when building our last image

# install dependencies
RUN npm install

# copy dist
COPY dist dist

# copy server files
COPY backend backend

# when this image is run, start our server
ENTRYPOINT ["npm", "start"]