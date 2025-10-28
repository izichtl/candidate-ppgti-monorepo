FROM node:22-alpine
RUN corepack enable && corepack prepare yarn@stable --activate
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production=false
RUN yarn global add typescript
COPY . .
RUN yarn build
EXPOSE 3001
CMD ["yarn", "start"]