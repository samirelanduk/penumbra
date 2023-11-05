#!/bin/bash

# Default values
DEFAULT_DOMAIN="penumbra.app"
DEFAULT_PROXY_NAME="proxy"

# Initialize variables with default values
DOMAIN="$DEFAULT_DOMAIN"
PROXY_NAME="$DEFAULT_PROXY_NAME"

# Parse named arguments
while getopts d:p: flag
do
    case "${flag}" in
        d) DOMAIN=${OPTARG};;
        p) PROXY_NAME=${OPTARG};;
    esac
done

# Get version from package.json
VERSION=$(node -p "require('./package.json').version")

# Build docker image
docker build -t samirelanduk/penumbra:$VERSION .

# Also tag latest
docker tag samirelanduk/penumbra:$VERSION samirelanduk/penumbra:latest

# Push to docker hub
docker push samirelanduk/penumbra:$VERSION
docker push samirelanduk/penumbra:latest

# Pull on server
ssh $DOMAIN "docker pull samirelanduk/penumbra:latest"

# Restart container
ssh $DOMAIN "docker rm -f penumbra"
ssh $DOMAIN "docker run -d --name penumbra \
  -e VIRTUAL_HOST=$DOMAIN,www.$DOMAIN \
  -e LETSENCRYPT_HOST=$DOMAIN,www.$DOMAIN \
  samirelanduk/penumbra:latest"

# Restart reverse proxy
ssh $DOMAIN "docker restart $PROXY_NAME"

