
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn quasar build

# production stage
FROM node:lts-alpine as production-stage
RUN npm install -g http-server
COPY --from=build-stage /app/dist/spa /app

USER node
EXPOSE 8080
CMD [ "http-server", "app" ]


