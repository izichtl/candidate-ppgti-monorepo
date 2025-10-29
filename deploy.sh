#!/bin/bash
set -e

echo "Atualizando repositório..."
git pull origin main

echo "Buildando containers..."
sudo docker compose build --no-cache

echo "Subindo containers..."
sudo docker compose up -d

echo "Limpando imagens antigas..."
sudo docker image prune -f

echo "Deploy concluído com sucesso!"
