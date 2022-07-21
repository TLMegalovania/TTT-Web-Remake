FROM node:lts-alpine3.15 AS build
WORKDIR /src
COPY package.json .
RUN npm config set registry="https://registry.npmmirror.com/" && npm i
COPY . .
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/dist .
EXPOSE 80

