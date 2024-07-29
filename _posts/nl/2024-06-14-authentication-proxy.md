---
layout: default
title: Authentication Proxy
tags: authentication docker security
categories: nl resources
lang: nl
translations:
  - url: /en/resources/2024/06/14/authentication-proxy
    lang: en
seo:
  canonical: /nl/resources/2024/06/14/authentication-proxy
---

# Beveilig je applicaties met een authenticatieproxy

In het huidige digitale landschap zijn robuuste authenticatiemechanismen essentieel voor het beveiligen van applicaties. Deze authenticatieproxy-container is een veelzijdige oplossing voor scenario's waarin basisauthenticatie niet voldoende is. Het ondersteunt meerdere authenticatiemethoden, waaronder lokaal, OAuth2, OIDC, Google en Apple. De proxy is ontworpen om samen te werken met Traefik als forward authenticatie-middleware, wat je bestaande reverse proxy-setup verbetert.
<!--more-->

## Introductie van `authentication-proxy`

De `authentication-proxy` repository biedt een Docker-image dat fungeert als een authenticatieproxy voor je applicaties. Het ondersteunt verschillende authenticatiemethoden en kan eenvoudig worden geïntegreerd met Traefik als forward authenticatie-middleware. Hier zijn enkele belangrijke kenmerken:

- **Integratie met Traefik:** Functioneert als forward authenticatie-middleware, wat je bestaande reverse proxy-setup verbetert.
- **Meerdere Authenticatiemethoden:** Ondersteunt verschillende providers, waaronder lokaal, OAuth2, OIDC, Google en Apple.
- **Configuratie met Omgevingsvariabelen:** Eenvoudige setup en configuratie via omgevingsvariabelen.

### Voorbeeld

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

Om aan de slag te gaan, kun je de [authentication-proxy](https://github.com/PixNyb/authentication-proxy) bekijken en de instructies in de README volgen.