FROM node:alpine

RUN apk update
RUN apk add python g++ make 

WORKDIR /usr/app/auth-service

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY ./lib ./lib
COPY --from=hypertube/protos /protos protos
CMD node lib/server.js
