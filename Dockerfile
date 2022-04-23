FROM node:14-alpine as debug


LABEL version="1.0"
LABEL description="This is the base docker image for the portfolio web backend API."
LABEL maintainer = ["217013622@stu.vtc.edu.hk"]

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN ls
RUN npm install
# Bundle app source
COPY . ./app

CMD [ "npm", "start" ]