# PrimeForge API Documentation Portal

This project provides a complete, self-contained documentation portal for a NestJS monorepo composed of multiple microservices. It fetches each service’s OpenAPI specification (usually exposed via NestJS Swagger) and builds a beautiful static site using [Docusaurus](https://docusaurus.io/) and [ReDoc](https://github.com/Redocly/redoc).

## Features

- **Multi‑service support** – Define as many services as you need in `services.json`.
- **Automated fetching** – Pull up-to-date OpenAPI JSON from each service via a single command.
- **Beautiful documentation** – Rendered via ReDoc with sidebar navigation, endpoint search and syntax highlighting.
- **Full doc site** – Built with Docusaurus, so you can add tutorials, guides or a blog alongside your API reference.
- **Easy deployment** – Generates purely static files that can be hosted anywhere (GitHub Pages, S3, Netlify, etc.).

## Getting Started

### 1. Configure Your Services

Edit `services.json` in the project root. Each entry should specify:

- `name` – a URL‑safe identifier used for file names and routes
- `title` – human friendly label used in navigation
- `url` – the absolute URL of your NestJS service’s OpenAPI JSON (e.g. `http://localhost:3000/api-json` or `https://your-service.example.com/openapi-json`)

Example:

```json
[
  {
    "name": "users",
    "title": "User Service API",
    "url": "https://api.example.com/users/openapi-json"
  },
  {
    "name": "orders",
    "title": "Order Service API",
    "url": "https://api.example.com/orders/openapi-json"
  }
]
```

### 2. Fetch Specifications

Run the following to download all OpenAPI documents and save them into the `openapi/` directory:

```bash
npm install  # only needed once to install dependencies
npm run update-specs
```

This uses `scripts/fetch-openapi.js`, which reads `services.json`, fetches each `url` and writes the result to `openapi/<name>.json`. If a fetch fails, an error is printed but the script continues for the other services.

### 3. Build the Site

Generate a static version of the portal:

```bash
npm run build
```

The build output is placed in the `build/` directory. You can preview it locally with:

```bash
npm run serve
```

### 4. Deploy to GitHub Pages

To deploy your portal to GitHub Pages, you need to set a few options in `docusaurus.config.js`:

- `url` – set this to `https://<your‑github‑username>.github.io`
- `baseUrl` – set this to `/<repo‑name>/` (include trailing slash)
- `organizationName` – your GitHub username or organisation
- `projectName` – the repository name where the site will live

Once configured, run:

```bash
npm run deploy
```

Docusaurus will build the site and push the contents of `build/` to a `gh-pages` branch. You’ll need write access to the repository and a configured GitHub token with `repo` scope in your environment (see [Docusaurus documentation](https://docusaurus.io/docs/deployment#deploying-to-github-pages)).

## Adding Guides or Tutorials

Add Markdown files under the `docs/` folder. They will automatically appear under the **Guides** section thanks to `sidebars.js`. Use front‑matter to control ordering or hide pages.

## Updating After Changes

Whenever you update a microservice or release a new version of your APIs:

1. Update the service’s URL in `services.json` if necessary.
2. Run `npm run update-specs` to refresh the OpenAPI files.
3. Commit any changes in the `openapi/` folder.
4. Run `npm run build` and redeploy.

## Directory Structure

- `services.json` – list of microservice documentation sources
- `openapi/` – downloaded OpenAPI spec files (generated)
- `scripts/` – helper scripts (currently only `fetch-openapi.js`)
- `docs/` – Markdown docs for guides, tutorials, etc.
- `src/` – React pages and custom styling
- `docusaurus.config.js` – site configuration and Redoc integration

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.