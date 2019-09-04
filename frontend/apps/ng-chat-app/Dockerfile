# Build Image
FROM node:12-alpine AS build-env

WORKDIR /usr/app
COPY . .

RUN npm install
RUN npm run build-prod

# Runtime Image
FROM nginx:alpine
COPY --from=build-env /usr/app/dist/chat-app /usr/share/nginx/html
