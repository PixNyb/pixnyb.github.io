---
layout: default
title: Dockerised VS Code
tags: development tools
categories: nl resources
lang: nl
translations:
  - url: /en/resources/2024/05/26/dockerised-vscode
    lang: en
seo:
  canonical: /nl/resources/2024/05/26/dockerised-vscode
---

# Vereenvoudig je ontwikkelomgeving met Dockerised VS Code

Als ontwikkelaar kan het een uitdaging zijn om een consistente en reproduceerbare ontwikkelomgeving op verschillende machines op te zetten. Dit geldt vooral wanneer je aan meerdere projecten werkt met verschillende afhankelijkheden en configuraties. Om dit probleem aan te pakken, heb ik een setup gecreëerd waarmee je Visual Studio Code (VS Code) in een Docker-container kunt draaien. Dit biedt een consistente en geïsoleerde ontwikkelomgeving die eenvoudig kan worden gedeeld en gerepliceerd.
<!--more-->

## Introductie van `dockerised-vscode`

De `dockerised-vscode` repository vormt de kern van deze setup. Het biedt een Docker-image dat is geconfigureerd om VS Code in een container te draaien, waardoor je in een gecontroleerde omgeving kunt werken die eenvoudig kan worden gerepliceerd. Hier zijn enkele belangrijke voordelen:

- **Voorgeconfigureerde Ontwikkelomgeving:** Deze image bevat alle benodigde afhankelijkheden en extensies voor een naadloze codeerervaring.
- **Consistentie:** Met deze setup zorg je ervoor dat je ontwikkelomgeving consistent blijft op verschillende machines, waardoor het veelvoorkomende "het werkt op mijn machine"-probleem wordt geëlimineerd.
- **Isolatie:** Het draaien van VS Code in een Docker-container biedt een geïsoleerde omgeving, waardoor de kans op conflicten tussen verschillende projecten of afhankelijkheden wordt verkleind.

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
    volumes:
      - /etc/localtime:/etc/localtime:ro
```

Om aan de slag te gaan, kun je de [dockerised-vscode repository](https://github.com/PixNyb/dockerised-vscode) bekijken en de instructies in de README volgen.