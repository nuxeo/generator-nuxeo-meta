#!/bin/bash -
set -e

git checkout master
git branch -f stable
git push origin stable
