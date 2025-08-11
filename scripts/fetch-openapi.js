#!/usr/bin/env node
/*
 * This script pulls OpenAPI JSON documents from the services defined in
 * services.json and writes them to the local openapi/ directory. Run it
 * whenever your downstream services update their documentation to refresh
 * your portal. Designed to be used from an npm script (see package.json).
 */

const fs = require('fs-extra');
const path = require('path');

async function main() {
  const root = path.resolve(__dirname, '..');
  const servicesPath = path.join(root, 'services.json');
  const outDir = path.join(root, 'openapi');

  await fs.ensureDir(outDir);

  if (!fs.existsSync(servicesPath)) {
    console.error(`services.json not found at ${servicesPath}`);
    process.exit(1);
  }

  const services = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));
  if (!Array.isArray(services) || services.length === 0) {
    console.error('services.json must contain an array of service definitions');
    process.exit(1);
  }

  for (const service of services) {
    const { name, url } = service;
    if (!name || !url) {
      console.warn(`Skipping service with missing name or url: ${JSON.stringify(service)}`);
      continue;
    }
    const destFile = path.join(outDir, `${name}.json`);
    try {
      console.log(`Fetching OpenAPI spec for ${name} from ${url}...`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Received ${response.status} ${response.statusText}`);
      }
      const json = await response.json();
      await fs.writeJson(destFile, json, { spaces: 2 });
      console.log(`Saved ${destFile}`);
    } catch (err) {
      console.error(`Failed to fetch spec for ${name}: ${err.message}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});