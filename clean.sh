#!/usr/bin/env bash

# Backend

cd backend && rm -rf node_modules && cd ..

# Web Components

cd frontend && rm -rf node_modules && cd ..
cd frontend/web-components/react-contact-list && rm -rf node_modules && cd ../../..
cd frontend/web-components/native-web-components && rm -rf node_modules && cd ../../..
cd frontend/web-components/vue-login && rm -rf node_modules && cd ../../..
cd frontend/web-components/angular-chat-window && rm -rf node_modules && cd ../../..
cd frontend/web-components/stencil-components && rm -rf node_modules && cd ../../..
cd frontend/web-components/lit-element-chat-link && rm -rf node_modules && cd ../../..

# Host Apps

cd frontend/apps/ng-chat-app/ && rm -rf node_modules && cd ../../..
