---
layout: default
title: VNC Viewer
tags: development tools vnc remote desktop
categories: nl resources
lang: nl
translations:
  - url: /en/resources/2024/07/29/vnc-viewer
    lang: en
seo:
  canonical: /nl/resources/2024/07/29/vnc-viewer
---

# Toegang tot uw containers vanuit een gecentraliseerde VNC Viewer

Bij het werken met meerdere containers kan het beheren van individuele VNC-verbindingen omslachtig worden. Om dit proces te vereenvoudigen, heb ik een gecentraliseerde VNC viewer gemaakt waarmee je toegang hebt tot al je containers vanuit één interface. Deze setup biedt een handige manier om je containers te monitoren en ermee te werken zonder meerdere VNC-verbindingen nodig te hebben.
<!--more-->

## Introductie van `vnc-viewer`

De `vnc-viewer` repository biedt een Docker image dat fungeert als een gecentraliseerde VNC viewer voor je containers. Het stelt je in staat om verbinding te maken met meerdere containers vanuit één interface, waardoor je een uniforme weergave van je draaiende services krijgt. Hier zijn enkele belangrijke kenmerken:

- **Gecentraliseerde VNC Viewer:** Toegang tot al je containers vanuit één interface, waardoor je geen meerdere VNC-verbindingen nodig hebt.
- **Containerbeheer:** Monitor en werk in real-time met je containers, waardoor het eenvoudiger wordt om je services te beheren.
- **Auto Discovery:** Detecteert automatisch draaiende containers en toont ze in de viewer, wat het verbindingsproces vereenvoudigt.

### Voorbeeld

```yaml
services:
  code:
    image: pixnyb/code
    hostname: code
    ports:
      - 8000:8000
    environment:
      - VSCODE_KEYRING_PASS=password
      - GIT_GLOBAL_USER_NAME=PixNyb
      - GIT_GLOBAL_USER_EMAIL=contact@roelc.me
      - VNC_ENABLED=true
    volumes:
      - /etc/localtime:/etc/localtime:ro
    labels:
      - "vnc-viewer.enabled=true"
      - "vnc-viewer.label=VS Code"

  vnc:
    image: pixnyb/vnc-viewer
    hostname: vnc
    ports:
      - 3000:3000
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
```

Om aan de slag te gaan, kun je de [vnc-viewer repository](https://github.com/PixNyb/vnc-viewer) bekijken en de instructies in de README volgen.