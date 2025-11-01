# Etapa 1: build do frontend
FROM node:22-alpine AS build-frontend
RUN corepack disable && npm install -g yarn@1.22.22
WORKDIR /app
COPY ./apps/frontend/package.json ./apps/frontend/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY ./apps/frontend .
RUN yarn build

# Etapa 2: Nginx final
FROM nginx:alpine

# Copia o build do frontend pro local certo
COPY --from=build-frontend /app/dist /usr/share/nginx/html/inscricoesppgti

# Copia sua configuração customizada
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
