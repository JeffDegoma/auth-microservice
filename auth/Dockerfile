# FROM node:15.2.1-alpine3.12
# FROM node:20-alpine3.17
FROM node:15-buster

WORKDIR /usr/src/app
COPY . /usr/src/app
# RUN apk add curl-dev
# RUN apk add --update curl
# RUN wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-debian10-6.0.0.tgz \
#     && tar -zxvf mongodb-linux-x86_64-debian10-6.0.0.tgz \
#     && rm mongodb-linux-x86_64-debian10-6.0.0.tgz

# Rename extracted
# RUN mv mongodb-* /etc/mongodb

# Point env variable to binary
# ENV MONGOMS_SYSTEM_BINARY=/etc/mongodb/bin/mongod


RUN npm install --only=prod
COPY . .
EXPOSE 3000

CMD ["npm", "run", "start"]
