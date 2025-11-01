FROM node:22-alpine
RUN corepack disable && npm install -g yarn@1.22.22
WORKDIR /app
COPY package.json yarn.lock ./

ENV NODE_ENV=development

RUN yarn install --frozen-lockfile

RUN npm install typescript -g
COPY . .
RUN npm run build
RUN adduser -D appuser
USER appuser
EXPOSE 3001
CMD ["yarn", "start"]

