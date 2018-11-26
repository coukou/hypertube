FROM node:alpine

WORKDIR /usr/app/profile-service

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY ./lib ./lib
COPY --from=hypertube/protos /protos protos
CMD node lib/server.js
