FROM node:current-slim

WORKDIR /fromscratch/src/app
COPY package.json .
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]

COPY . .
