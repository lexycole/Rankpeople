#!/bin/bash

# Assign healthcheck URL based of environment
# TODO checking via .dockerenv is not recommended change that
if [ -f /.dockerenv ]; then
    graphql_url=http://app:4000/api/graphql
else
    graphql_url=http://localhost:4000/api/graphql
fi

# TODO: Check if the schema is generated correctly
get-graphql-schema ${graphql_url} -j > ./schema.json

graphql-codegen
