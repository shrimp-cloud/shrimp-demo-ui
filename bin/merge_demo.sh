#!/bin/bash

# 复制 demo 内容
cp -rf ../shrimp-demo-ui/html  ./
cp -rf ../shrimp-demo-ui/public  ./
cp -rf ../shrimp-demo-ui/vite  ./
cp -rf ../shrimp-demo-ui/package.json  ./
cp -rf ../shrimp-demo-ui/vite.config.js  ./

# src/api cas,common
cp -rf ../shrimp-demo-ui/src/api/cas.js  ./src/api
cp -rf ../shrimp-demo-ui/src/api/common.js  ./src/api

# src
cp -rf ../shrimp-demo-ui/src/assets  ./src/
cp -rf ../shrimp-demo-ui/src/components  ./src/
cp -rf ../shrimp-demo-ui/src/directive  ./src/
cp -rf ../shrimp-demo-ui/src/layout  ./src/
cp -rf ../shrimp-demo-ui/src/plugins  ./src/
cp -rf ../shrimp-demo-ui/src/router  ./src/
cp -rf ../shrimp-demo-ui/src/store  ./src/
cp -rf ../shrimp-demo-ui/src/utils  ./src/
cp -rf ../shrimp-demo-ui/src/App.vue  ./src/
cp -rf ../shrimp-demo-ui/src/main.js  ./src/
cp -rf ../shrimp-demo-ui/src/permission.js  ./src/
cp -rf ../shrimp-demo-ui/src/settings.js  ./src/
