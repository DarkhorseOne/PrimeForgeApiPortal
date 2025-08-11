# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a PrimeForge API Documentation Portal built with Docusaurus and ReDoc. It fetches OpenAPI specifications from multiple NestJS microservices and generates a unified static documentation site.

## Key Commands

```bash
# Install dependencies
npm install

# Fetch latest OpenAPI specs from all services
npm run update-specs

# Development server (hot reload)
npm start

# Build static site
npm run build

# Preview built site locally
npm run serve

# Deploy to GitHub Pages
npm run deploy
```

## Architecture

### Service Configuration
- **services.json**: Defines all microservices and their OpenAPI endpoints
- Each service has: `name` (URL-safe identifier), `title` (display name), `url` (OpenAPI JSON endpoint)
- Current services: Auth, Billing, HR, CRM, Store Track, Work in the UK, File Service

### Dynamic Integration
- **docusaurus.config.js**: Dynamically reads services.json to:
  - Generate ReDoc spec configurations at lines 15-19
  - Create navigation items at lines 80-84
  - Build footer links at lines 97-100
- Each service gets its own route at `/api/{service-name}`

### OpenAPI Fetching
- **scripts/fetch-openapi.js**: Fetches OpenAPI JSON from each service
- Downloads specs to `openapi/` directory
- Continues on failure (non-blocking for other services)

### Content Structure
- `/docs/`: Markdown documentation for guides and tutorials
- `/src/`: Custom React pages and styling
- `/openapi/`: Generated OpenAPI spec files (created by update-specs)
- `/static/`: Static assets like images

## Development Workflow

When updating API documentation:
1. Ensure services are running on their configured ports
2. Run `npm run update-specs` to fetch latest OpenAPI specs
3. Run `npm start` to preview changes locally
4. Commit changes in `openapi/` directory if specs have changed

## Service Endpoints

Services are configured to run on localhost with these ports:
- Auth API: http://localhost:4111/api-docs-json
- Billing API: http://localhost:222/api-docs-json  
- HR API: http://localhost:4030/api-docs-json
- CRM API: http://localhost:4020/api-docs-json
- Store Track API: http://localhost:4040/api-docs-json
- Work in the UK API: http://localhost:4050/api-docs-json
- File Service API: http://localhost:4060/api-docs-json