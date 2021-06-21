FROM node:latest

WORKDIR /usr/app

COPY ./ /usr/app

RUN npm install

EXPOSE 8000

CMD [ "npm", "start" ]