#!/bin/bash

docker compose -p rankpeople_prod --env-file .env.prod.local -f docker-compose.yml up -d postgres

echo Database is starting up...
sleep 10

gzip -dkfc ./backup.sql.gz | docker exec -i rankpeople_prod-postgres-1 psql -U postgres -d rankpeople

yarn stop:prod
