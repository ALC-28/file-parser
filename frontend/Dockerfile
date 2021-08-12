FROM node:lts-slim

RUN npm -g config set user root

RUN npm install -g @angular/cli

RUN mkdir -p /usr/src/file-parser

WORKDIR /usr/src/file-parser

EXPOSE 4200

CMD [ "npm", "start" ]