#!/usr/bin/env bash

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin ttconferences.azurecr.io

cd backend && bash docker-push.sh && cd ..
cd frontend/ng-chat-app/docker-push.sh && cd ..