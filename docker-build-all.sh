#!/usr/bin/env bash

bash npm-i.sh

# Backend Build

cd backend && bash docker-build.sh && cd ..

# Web Components Build

cd frontend && npm run build-wc && cd ..

# Host Apps Build

cd frontend/apps/ng-chat-app/ && bash docker-build.sh && cd ../../..