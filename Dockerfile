FROM node:latest as node
COPY . .
RUN npm init
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/demo-app /usr/share/nginx/html
