#!/bin/bash -
set -e

git branch -f stable origin/master
git push origin stable
