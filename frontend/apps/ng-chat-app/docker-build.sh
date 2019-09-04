#!/usr/bin/env bash

npm run wc

docker build -t ttconferences.azurecr.io/tt-web-components-chat-ng:latest .
