---
layout: default
title: Dockerised VS Code
tags: development tools
categories: en resources
lang: en
translations:
  - url: /nl/resources/2024/05/26/dockerised-vscode
    lang: nl
seo:
  canonical: /en/resources/2024/05/26/dockerised-vscode
---

# Simplify Your Development Setup With Dockerized VS Code

As a developer, setting up a consistent and reproducible development environment across different machines can be a challenge. This is especially true when working on multiple projects with different dependencies and configurations. To address this issue, I've created a setup that allows you to run Visual Studio Code (VS Code) in a Docker container, providing a consistent and isolated development environment that can be easily shared and replicated.
<!--more-->

## Introducing `dockerised-vscode`

The `dockerised-vscode` repository is the core of this setup. It provides a Docker image configured to run VS Code in a container, allowing you to work in a controlled environment that can be easily replicated. Here are some of the key benefits:

- **Pre-configured Development Environment:** This image includes all the necessary dependencies and extensions for a seamless coding experience.
- **Consistency:** By using this setup, you ensure that your development environment remains consistent across different machines, eliminating the common "it works on my machine" problem.
- **Isolation:** Running VS Code in a Docker container provides an isolated environment, reducing the risk of conflicts between different projects or dependencies.

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
    volumes:
      - /etc/localtime:/etc/localtime:ro
```

To get started, you can check out the [dockerised-vscode repository](https://github.com/PixNyb/dockerised-vscode) and follow the instructions in the README.