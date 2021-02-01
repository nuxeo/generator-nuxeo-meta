#!/bin/bash -
set -e

VERSION=$1
if [ -z $VERSION ]; then
  echo echo 'Usage: ./release.sh VERSION'
  exit 1
fi

git checkout master

# Ensure Everything is good to go.
npx gulp prepublish

# Update the version in package.json
npm version $VERSION --git-tag-version=false
git add package.json
git commit -m "Update version to $VERSION"

# Branch to do the actual build
git checkout -b $VERSION

# Make sure dependencies are up to date
NODE_MODULES=node_modules
if [ -d "$NODE_MODULES" ]; then
  rm -r $NODE_MODULES
fi
npm install

# Freeze dependencies versions
npm shrinkwrap --dev
git add -f npm-shrinkwrap.json

# Build, test and publish
npx gulp prepublish

git commit -m "Release $VERSION"
git tag v$VERSION

# Push everything
git push origin master
git push origin $VERSION
git push origin v$VERSION

git checkout master
