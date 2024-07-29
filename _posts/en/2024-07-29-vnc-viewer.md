---
layout: default
title: VNC Viewer
tags: development tools vnc remote desktop
categories: en resources
lang: en
translations:
  - url: /nl/resources/2024/07/29/vnc-viewer
    lang: nl
seo:
  canonical: /en/resources/2024/07/29/vnc-viewer
---

# Access Your Containers From a Centralised VNC Viewer

When working with multiple containers, managing individual VNC connections can become cumbersome. To simplify this process, I've created a centralised VNC viewer that allows you to access all your containers from a single interface. This setup provides a convenient way to monitor and interact with your containers without the need for multiple VNC connections.
<!--more-->

## Introducing `vnc-viewer`

The `vnc-viewer` repository provides a Docker image that acts as a centralised VNC viewer for your containers. It allows you to connect to multiple containers from a single interface, providing a unified view of your running services. Here are some of the key features:

- **Centralised VNC Viewer:** Access all your containers from a single interface, eliminating the need for multiple VNC connections.
- **Container Management:** Monitor and interact with your containers in real-time, making it easier to manage your services.
- **Auto Discovery:** Automatically detects running containers and displays them in the viewer, simplifying the connection process.

### Example

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

To get started, you can check out the [vnc-viewer repository](https://github.com/PixNyb/vnc-viewer) and follow the instructions in the README.