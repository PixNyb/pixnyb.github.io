---
layout: default
title: Authentication Proxy
tags: authentication docker security
categories: en resources
lang: en
translations:
  - url: /nl/resources/2024/06/14/authentication-proxy
    lang: nl
seo:
  canonical: /en/resources/2024/06/14/authentication-proxy
---

# Secure Your Applications With an Authentication Proxy

In today's digital landscape, robust authentication mechanisms are essential for securing applications. This authentication proxy container is a versatile solution for scenarios where basic authentication isn't sufficient. It supports multiple authentication methods, including local, OAuth2, OIDC, Google, and Apple. The proxy is designed to work with Traefik as forward authentication middleware, enhancing your existing reverse proxy setup.
<!--more-->

## Introducing `authentication-proxy`

The `authentication-proxy` repository provides a Docker image that acts as an authentication proxy for your applications. It supports various authentication methods and can be easily integrated with Traefik as forward authentication middleware. Here are some of the key features:

- **Integration with Traefik:** Acts as forward authentication middleware, enhancing your existing reverse proxy setup.
- **Multiple Authentication Methods:** Supports various providers, including local, OAuth2, OIDC, Google, and Apple.
- **Environment Variable Configuration:** Easy setup and configuration through environment variables.

### Example

```yaml
services:
  traefik:
    image: traefik:v2.2
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.traefik.rule=Host(`traefik.x.y`)"
      - "traefik.http.services.traefik.loadbalancer.server.port=8080"
      - "traefik.http.routers.traefik.entrypoints=web"
      - "traefik.http.routers.traefik.middlewares=auth"
      - "traefik.http.middlewares.auth.forwardauth.address=http://auth:3000"

  auth:
    build: .
    environment:
      - AUTH_HOST=auth.x.y
      - COOKIE_HOSTS=auth.x.y
      - COOKIE_HOSTS_USE_ROOT=true
      - ACCESS_TOKEN_SECRET=x
      - REFRESH_TOKEN_SECRET=x
      - LOCAL_LOCAL_USERS=user:$$apr1$$PJ3UdeuW$$sdScbEB7d/HK0mFIx/oN1. # user:password
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.auth.rule=Host(`auth.x.y`)"
      - "traefik.http.services.auth.loadbalancer.server.port=3000"
      - "traefik.http.routers.auth.entrypoints=web"

  whoami:
    image: containous/whoami
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.whoami.rule=Host(`whoami.x.y`)"
      - "traefik.http.services.whoami.loadbalancer.server.port=80"
      - "traefik.http.routers.whoami.entrypoints=web"
      - "traefik.http.routers.whoami.middlewares=auth"
```

To get started, you can check out the [authentication-proxy](https://github.com/PixNyb/authentication-proxy) and follow the instructions in the README.

