FROM node:22-alpine AS build
RUN corepack disable && npm install -g yarn@1.22.22
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
RUN npm install typescript -g
COPY . .
RUN yarn build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ../../nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
