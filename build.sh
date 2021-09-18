#!/bin/sh
 
export PATH=$NODEJS_BIN_LATEST:$PATH
set -e
export PATH=$NODEJS_BIN_V8:$PATH
APP_NAME="iovapp-refuel"
rm -rf output
PKG_NAME='opera-module'


echo "node: $(node -v)"
echo "npm: v$(npm -v)"

npm install --registry=http://registry.npm.baidu-int.com --no-progress

# echo "npm install"

npm run prod



echo "Build app $APP_NAME success."