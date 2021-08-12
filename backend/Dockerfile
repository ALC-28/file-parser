FROM node:lts-slim

RUN npm -g config set user root

RUN npm install -g @nestjs/cli

RUN mkdir -p /usr/src/file-parser

WORKDIR /usr/src/file-parser

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]