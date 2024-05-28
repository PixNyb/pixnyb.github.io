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

Als ontwikkelaar kan het een uitdaging zijn om een consistente en reproduceerbare ontwikkelomgeving op verschillende machines op te zetten. Om dit aan te pakken, heb ik twee repositories gemaakt die dit proces vereenvoudigen met behulp van Docker: [dockerised-vscode](https://github.com/PixNyb/dockerised-vscode) en [dockerised-vscode-scripts](https://github.com/PixNyb/dockerised-vscode-scripts). Deze repositories zijn bedoeld om een probleemloze manier te bieden om Visual Studio Code (VS Code) in een Docker-container uit te voeren.
<!--more-->

## Introductie van dockerised-vscode

De `dockerised-vscode` repository is de kern van deze setup. Het biedt een Docker-image dat is geconfigureerd om VS Code in een container uit te voeren, waardoor je in een gecontroleerde omgeving kunt werken die gemakkelijk te repliceren is. Hier zijn enkele van de belangrijkste voordelen:

- **Voorgeconfigureerde ontwikkelomgeving:** Dit image bevat alle benodigde dependencies en extensies voor een naadloze codeerervaring.
- **Consistentie:** Door deze setup te gebruiken, zorg je ervoor dat je ontwikkelomgeving consistent blijft op verschillende machines, waardoor het veelvoorkomende "het werkt op mijn machine" probleem wordt geëlimineerd.
- **Isolatie:** Het uitvoeren van VS Code in een Docker-container biedt een geïsoleerde omgeving, waardoor het risico op conflicten tussen verschillende projecten of dependencies wordt verminderd.

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

## Functionaliteit uitbreiden met dockerised-vscode-scripts

De `dockerised-vscode-scripts` repository is een aanvulling op de hoofd `dockerised-vscode` repository. Het bevat een verzameling scripts en sjablonen die zijn afgestemd op specifieke ontwikkelomgevingen. Deze repository verbetert de functionaliteit van het basis Docker-image door:

- **Sjablonen:** Vooraf gebouwde configuraties voor verschillende ontwikkelopstellingen, zoals Python, Node.js en meer.
- **Automatisering:** Scripts die de setup en configuratie van deze omgevingen automatiseren, waardoor je tijd en moeite bespaart.
- **Aanpassing:** Deze sjablonen stellen je in staat om je ontwikkelomgeving verder aan te passen op basis van je specifieke behoeften.

Je kunt de beschikbare scripts en sjablonen verkennen in de [dockerised-vscode-scripts repository](https://github.com/PixNyb/dockerised-vscode-scripts).