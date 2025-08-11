---
sidebar_position: 1
title: Introduction
---

# Welcome to Your API Portal

This portal aggregates the API definitions of each microservice in your NestJS monorepo into one convenient place. Each service exposes its own OpenAPI (Swagger) document; this site fetches those documents and renders them using the [ReDoc](https://github.com/Redocly/redoc) UI inside [Docusaurus](https://docusaurus.io/).

## How It Works

1. **List your services** – Edit `services.json` at the root of this project and provide the name, title and URL for each NestJS service’s OpenAPI endpoint.
2. **Fetch specs** – Run `npm run update-specs`. This executes `scripts/fetch-openapi.js`, which pulls down the OpenAPI documents and stores them under the `openapi/` directory.
3. **Build the site** – Run `npm run build` to generate a static version of this portal under the `build/` directory.
4. **Deploy** – The build output can be served by any static hosting provider. For GitHub Pages, run `npm run deploy` (after configuring `organizationName`, `projectName`, `url` and `baseUrl` in `docusaurus.config.js`).

## Updating the Docs

Whenever you release a new version of any service, simply run:

```
npm run update-specs
npm run build
```

Commit and push the changes, then redeploy. The portal will always reflect the current state of your APIs.

## Adding Additional Pages

Use the `docs/` directory to add guides, tutorials or usage examples. The sidebar configuration in `sidebars.js` determines how these documents appear in the navigation.

Enjoy building great APIs!