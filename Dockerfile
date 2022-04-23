FROM node:14-alpine as debug

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
# Bundle app source
COPY . .

ENTRYPOINT [ "nodemon", "--inspect=0.0.0.0","./index.js" ]

FROM node:14-alpine as prod

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . ./app

CMD [ "npm", "start" ]

