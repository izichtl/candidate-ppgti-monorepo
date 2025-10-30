#!/bin/bash
ssh ppgti@10.0.7.24 'cd candidate-ppgti-monorepo/ && sudo ./deploy.sh'

docker compose -f docker-compose.dev.yml up --build