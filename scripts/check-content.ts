/**
 * Validates every content/en/<name>.json file against its schema in
 * src/content/schema.ts. Runs before each build (bun run build), so a broken
 * JSON edit fails the deploy with a readable message instead of breaking a
 * page in production.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { contentSchemas } from "../src/content/schema.ts";

const CONTENT = path.resolve(import.meta.dirname, "../content/en");

let failed = false;
for (const [name, schema] of Object.entries(contentSchemas)) {
  const file = path.join(CONTENT, `${name}.json`);
  let data: unknown;
  try {
    data = JSON.parse(await readFile(file, "utf8"));
  } catch (err) {
    console.error(`✗ content/en/${name}.json: ${(err as Error).message}`);
    failed = true;
    continue;
  }
  const result = schema.safeParse(data);
  if (result.success) {
    console.log(`✓ content/en/${name}.json`);
  } else {
    failed = true;
    console.error(`✗ content/en/${name}.json\n${z.prettifyError(result.error)}`);
  }
}

if (failed) process.exit(1);
