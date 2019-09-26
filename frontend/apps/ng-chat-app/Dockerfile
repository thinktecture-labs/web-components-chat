# Build Image
FROM node:12-alpine AS build-env
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY projects ./projects
COPY src ./src
COPY config ./config
COPY browserslist ./
COPY angular.json ./
COPY tsconfig.json ./
COPY tsconfig.app.json ./
COPY tslint.json ./

RUN npm run build-prod

# Runtime Image
FROM nginx:alpine
COPY --from=build-env /app/dist/chat-app /usr/share/nginx/html
COPY --from=build-env /app/config/nginx.conf /etc/nginx/conf.d/default.conf
