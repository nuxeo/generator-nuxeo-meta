#!/usr/bin/env bash -

VERSION="${1:-master}"
REPOSITORY="PolymerElements/polymer-starter-kit"

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

TEMPLATE_DIR="${SCRIPT_DIR%%/}"/templates
MAIN_DIR="${TEMPLATE_DIR%%/}"/src/main/
mkdir -p $MAIN_DIR

BASE_DIR="${SCRIPT_DIR%/*/*}"
TARGET_DIR=${BASE_DIR%%/}/target
PSK_DIR=${TARGET_DIR%%/}/polymer-starter-kit

# Clone and/or update repository
if [ ! -d $PSK_DIR ]; then
  git clone git@github.com:$REPOSITORY.git $PSK_DIR || exit 1
fi
cd $PSK_DIR && git fetch --all && git checkout $VERSION && git pull || exit 2

# Copy resources
cp -rvf .editorconfig LICENSE.md bower.json package.json wct.conf.js $TEMPLATE_DIR
cp -rvf app $MAIN_DIR

perl -p -i -e "s/\/\/\s+app.baseUrl\s+=.*$/app.baseUrl = '\/nuxeo\/<%= route %>';/" $MAIN_DIR/app/scripts/app.js

cd $TEMPLATE_DIR
npm install --save-dev proxy-middleware gulp-debug
rm -rf node_modules
