FROM node:alpine

WORKDIR /usr/app/auth-service
COPY . .
RUN npm install

EXPOSE 3000

ENTRYPOINT node lib/server.js
