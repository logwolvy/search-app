# build environment
FROM node:10.18.1-alpine3.9 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /app/
RUN npm install
COPY . /app
RUN npm run build

# Final build
FROM nginx:1.17-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx_default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
