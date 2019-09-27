#!/usr/bin/env bash

# Backend

cd backend && npm i && cd ..

# Web Components

cd frontend && npm i && cd ..
cd frontend/web-components/react-contact-list && npm i && cd ../../..
cd frontend/web-components/native-web-components && npm i && cd ../../..
cd frontend/web-components/vue-login && npm i && cd ../../..
cd frontend/web-components/angular-chat-window && npm i && cd ../../..
cd frontend/web-components/stencil-components && npm i && cd ../../..
cd frontend/web-components/lit-element-chat-link && npm i && cd ../../..

# Host Apps

cd frontend/apps/ng-chat-app/ && npm i && cd ../../..