#!/bin/bash
dir=$1
echo "$dir is running in cup"
node src/server.js $dir
