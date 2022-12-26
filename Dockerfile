FROM node:current-slim

WORKDIR /fromscratch/src
COPY package.json .
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]

COPY . .
