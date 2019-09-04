#!/usr/bin/env bash

# Backend Build

cd backend && bash docker-build.sh && cd ..

# Web Components Build

cd frontend && npm i && cd ..
cd frontend/web-components/react-contact-list && npm i && cd ../../..
cd frontend && npm run build-wc && cd ..

# Host Apps Build

cd frontend/apps/ng-chat-app/ && bash docker-build.sh && cd ..