# STEP 1 : Build React front-end
FROM node:16-alpine as build-step
RUN mkdir /dashboard
ENV PATH /dashboard/node_modules/.bin:$PATH
COPY ./package.json ./yarn.lock ./.env /dashboard/
COPY ./src /dashboard/src
COPY ./public /dashboard/public
WORKDIR /dashboard
RUN npm install
RUN npm run build


# STEP 2 : Host a webserver
FROM nginx:stable-alpine

COPY --from=build-step /dashboard/build/ /usr/share/nginx/html
COPY ./nginx/nginx.default.conf /etc/nginx/conf.d/default.conf