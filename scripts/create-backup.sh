#!/bin/bash

docker compose -p rankpeople_prod --env-file .env.prod.local -f docker-compose.yml up -d postgres

echo Database is starting up...
sleep 10

docker exec -t rankpeople_prod-postgres-1 pg_dump -U postgres --no-owner rankpeople | gzip > ./backup.sql.gz

yarn stop:prod
