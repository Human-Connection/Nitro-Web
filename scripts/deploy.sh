#!/usr/bin/env bash
kubectl --namespace=human-connection patch deployment nitro-backend  --patch "{"metadata": {"COMMIT": "$TRAVIS_COMMIT"}}"
kubectl --namespace=human-connection patch deployment nitro-web  --patch "{"metadata": {"COMMIT": "$TRAVIS_COMMIT"}}"
