#!/bin/bash

attempt_counter=0
max_attempts=10
interval=10
start_time=15

echo "Waiting for backend to start..."
sleep $start_time
echo "Starting healthcheck"

# Assign healthcheck URL based of environment
# TODO checking via .dockerenv is not recommended change that
if [ -f /.dockerenv ]; then
    healthcheck_url=http://app:4000/api
else
    healthcheck_url=http://localhost:4000/api
fi

echo "Healthcheck URL: ${healthcheck_url}"

until $(curl --output /dev/null --silent --head --fail ${healthcheck_url}); do
    if [ ${attempt_counter} -eq ${max_attempts} ]; then
        echo "Max attempts reached"
        exit 1
    fi
    
    attempt_counter=$(($attempt_counter+1))
    echo "Healthcheck failed on attempt ${attempt_counter}/${max_attempts}"
    
    sleep $interval
done

echo "Healthcheck passed"
exit 0