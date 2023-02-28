# README

![](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

> Write your story in papercrane. Anywhere. Anytime. Anyway.

## Overview

This is a self-hosted writing app, and it looks like

![](docs/preview.png)

Also, this app has been deployed to free cloud applicaton hosting platform, live preview can be experienced.

[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://papercrane.onrender.com/)

[![](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://crane-website-weld.vercel.app/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/f0aa61ea-23a7-466b-8eb3-abd5c9cc2e7a/deploy-status)](https://app.netlify.com/sites/papercrane/deploys)

## Related

[Frontend repo](https://github.com/crane-org/crane-website) and [Backend repo](https://github.com/crane-org/crane-api) have been managed by [crane-org](https://github.com/crane-org) separately.

## Getting started

The simplest way is to build and run the docker container:

```sh
docker run -d -p 8001:8001 surzia/papercrane:latest
```

For local development, use `make` command to build this app:

```sh
make all
```
