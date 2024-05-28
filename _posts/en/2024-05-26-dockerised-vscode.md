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

# Simplify Your Development Setup with Dockerised VS Code

As a developer, setting up a consistent and reproducible development environment across different machines can be a challenge. To address this, I've created two repositories designed to streamline this process using Docker: [dockerised-vscode](https://github.com/PixNyb/dockerised-vscode) and [dockerised-vscode-scripts](https://github.com/PixNyb/dockerised-vscode-scripts). These repositories aim to provide a hassle-free way to run Visual Studio Code (VS Code) in a Docker container.
<!--more-->

## Introducing dockerised-vscode

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

## Enhancing Functionality with dockerised-vscode-scripts

The `dockerised-vscode-scripts` repository is an add-on to the main `dockerised-vscode` repository. It contains a collection of scripts and templates tailored for specific development environments. This repository enhances the functionality of the base Docker image by providing:

- **Templates:** Pre-built configurations for various development setups, such as Python, Node.js, and more.
- **Automation:** Scripts that automate the setup and configuration of these environments, saving you time and effort.
- **Customization:** These templates allow you to further customize your development environment based on your specific needs.

You can explore the available scripts and templates in the [dockerised-vscode-scripts repository](https://github.com/PixNyb/dockerised-vscode-scripts).