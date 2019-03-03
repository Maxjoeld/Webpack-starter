FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build
# apparently all of this is happening to have this default our client
# on our router
FROM nginx
#were exposing 3000 this time so it can link to client 
EXPOSE 3000
# we're also copying nginx config files so routing is now working in our application 
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html