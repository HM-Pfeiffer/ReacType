# Stage 1: Build
FROM node:19-alpine as build

# python: required dependency for node alpine, shrinks image size from 2.17GB to 1.67GB
RUN apk add --no-cache --virtual .gyp \
         python3 \
         make \
         g++

WORKDIR /app

COPY package*.json ./

RUN npm install --no-install-recommends

COPY . .

# Stage 2: Node Server
FROM node:19-alpine as node_server

WORKDIR /app

COPY --from=build /app/package*.json ./

RUN npm install --no-install-recommends --only=production

COPY --from=build /app/.env .env
COPY --from=build /app/config.js ./config.js
COPY --from=build /app/server ./server

EXPOSE 5656

ENV IS_DOCKER true

CMD [ "npm", "start" ]

# Stage 3: Nginx Server
FROM nginx:alpine as nginx_server

# Copy the build output to the Nginx html directory
COPY --from=build /app/app/dist /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]