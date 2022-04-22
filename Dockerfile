FROM node:14-alpine

LABEL version="1.0"
LABEL description="This is the base docker image for the profolio web backend API."
LABEL maintainer = ["217013622@stu.vtc.edu.hk"]

WORKDIR /app

# Install app dependencies
COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "start" ]