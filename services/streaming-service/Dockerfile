FROM node:alpine

RUN apk update
RUN apk add python g++ make 

WORKDIR /usr/app/avatar-service

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
RUN mkdir uploads

COPY ./lib ./lib
COPY --from=hypertube/protos /protos protos
CMD node lib/server.js
