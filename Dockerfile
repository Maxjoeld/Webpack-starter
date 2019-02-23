FROM node:alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run create
#nginx starts by default-localhost: 80 is default for nginx
FROM nginx
COPY --from=builder app/dist /usr/share/nginx/html