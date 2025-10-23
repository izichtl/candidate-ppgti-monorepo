# Etapa de build — usa yarn e força arquitetura x86_64 para evitar bugs do Rollup em ARM
FROM --platform=linux/amd64 node:22 AS build
WORKDIR /app

# Copia manifestos e instala dependências
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copia o restante do projeto (inclui .env)
COPY . .

# Build de produção (Vite lê automaticamente o .env local)
RUN yarn build

# Etapa de produção — Nginx servindo os arquivos estáticos
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Remove o arquivo default.conf e cria um próprio (opcional)
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
