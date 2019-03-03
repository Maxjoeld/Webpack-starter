FROM node:alpine as builder
WORKDIR '/app'
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
#nginx starts by default-localhost: 80 is default for nginx
FROM nginx
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html
#docker run -p 8080:80 <id> to start in browser