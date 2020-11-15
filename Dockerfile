# build environment
FROM node:14.15-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY yarn.lock ./
COPY package.json ./
RUN yarn install --production=true 
COPY . ./
RUN yarn build 

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8020
CMD ["nginx", "-g", "daemon off;"]
