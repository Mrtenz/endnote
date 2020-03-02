#!/bin/bash

echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin

docker push "endnote/backend:${TRAVIS_TAG}"
docker push "endnote/frontend:${TRAVIS_TAG}"
