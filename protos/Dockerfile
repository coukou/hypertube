FROM node:slim

RUN apt-get update
RUN apt-get install -y \
  protobuf-compiler \
  libprotobuf-dev \
  libprotoc-dev \
  git \
  g++ \
  make 

WORKDIR /tmp/grpc-web
RUN git clone https://github.com/grpc/grpc-web.git /tmp/grpc-web
RUN make install-plugin

WORKDIR /protos
COPY . .
RUN npm install 

