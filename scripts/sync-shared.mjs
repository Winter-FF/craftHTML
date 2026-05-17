#!/usr/bin/env node

/**
 * sync-shared.mjs — Sync and validate shared design system assets
 *
 * Reads shared/shared-registry.json for source-to-target mappings,
 * then copies shared/assets/ files to each skill's assets/ directory
 * or validates that all targets are in sync with sources.
 *
 * Usage:
 *   node scripts/sync-shared.mjs sync      — Copy shared files to all targets
 *   node scripts/sync-shared.mjs validate  — Check all targets match sources (SHA-256)
 *   node scripts/sync-shared.mjs           — Print usage
 */

import { readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { createHash } from "crypto";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

/**
 * Load and validate the shared asset registry.
 * @returns {Array<{source: string, targets: Array<{skill: string, path: string}>}>}
 */
function loadRegistry() {
  const registryPath = join(ROOT, "shared", "shared-registry.json");
  if (!existsSync(registryPath)) {
    throw new Error(`Registry not found: ${registryPath}`);
  }

  let data;
  try {
    data = JSON.parse(readFileSync(registryPath, "utf8"));
  } catch (err) {
    throw new Error(`Invalid registry JSON: ${err.message}`);
  }

  if (!Array.isArray(data)) {
    throw new Error("Registry must be a JSON array");
  }

  // Validate schema per T-01-01 mitigation
  for (const entry of data) {
    if (typeof entry.source !== "string") {
      throw new Error(`Invalid registry entry: missing or non-string "source"`);
    }
    if (!Array.isArray(entry.targets)) {
      throw new Error(`Invalid registry entry for "${entry.source}": missing or non-array "targets"`);
    }
    for (const target of entry.targets) {
      if (typeof target.skill !== "string") {
        throw new Error(`Invalid target in "${entry.source}": missing or non-string "skill"`);
      }
      if (typeof target.path !== "string") {
        throw new Error(`Invalid target in "${entry.source}": missing or non-string "path"`);
      }
    }
  }

  return data;
}

/**
 * Resolve a forward-slash registry path to a platform-native filesystem path.
 * @param {string} registryPath - Forward-slash path from the registry
 * @returns {string} Platform-native absolute path
 */
function resolvePath(registryPath) {
  const parts = registryPath.split("/");
  return join(ROOT, ...parts);
}

/**
 * Validate that a resolved path stays within the project ROOT directory.
 * Per T-01-02 mitigation: prevent path traversal attacks via malformed registry.
 * @param {string} resolvedPath - Absolute path to validate
 * @throws {Error} If path escapes ROOT
 */
function validateWithinRoot(resolvedPath) {
  const normalizedRoot = join(ROOT).toLowerCase();
  const normalizedPath = join(resolvedPath).toLowerCase();
  if (normalizedPath !== normalizedRoot && !normalizedPath.startsWith(normalizedRoot + (process.platform === "win32" ? "\\" : "/"))) {
    throw new Error(`Path traversal detected: "${resolvedPath}" escapes project root`);
  }
}

/**
 * Compute SHA-256 hex digest of a file.
 * @param {string} filePath - Absolute path to the file
 * @returns {string} Hex digest
 */
function hashFile(filePath) {
  const content = readFileSync(filePath);
  return createHash("sha256").update(content).digest("hex");
}

/**
 * Sync shared assets to all target directories based on the registry.
 * @returns {number} Count of files synced
 */
function syncShared() {
  const registry = loadRegistry();
  let count = 0;

  for (const entry of registry) {
    const sourcePath = resolvePath(entry.source);
    validateWithinRoot(sourcePath);

    if (!existsSync(sourcePath)) {
      throw new Error(`Source file missing: ${entry.source}`);
    }

    for (const target of entry.targets) {
      const targetPath = join(ROOT, ...target.skill.split("/"), ...target.path.split("/"));
      validateWithinRoot(targetPath);

      const targetDir = dirname(targetPath);
      mkdirSync(targetDir, { recursive: true });
      copyFileSync(sourcePath, targetPath);
      count++;
    }
  }

  return count;
}

/**
 * Validate that all shared asset targets are in sync with their sources.
 * @returns {string[]} Array of problem descriptions (empty = all in sync)
 */
function validateShared() {
  const registry = loadRegistry();
  const problems = [];

  for (const entry of registry) {
    const sourcePath = resolvePath(entry.source);
    validateWithinRoot(sourcePath);

    if (!existsSync(sourcePath)) {
      problems.push(`Missing source: ${entry.source}`);
      continue;
    }

    const sourceHash = hashFile(sourcePath);

    for (const target of entry.targets) {
      const targetPath = join(ROOT, ...target.skill.split("/"), ...target.path.split("/"));
      validateWithinRoot(targetPath);

      if (!existsSync(targetPath)) {
        problems.push(`Missing target: ${target.skill}/${target.path}`);
        continue;
      }

      const targetHash = hashFile(targetPath);
      if (sourceHash !== targetHash) {
        problems.push(`Drift: ${target.skill}/${target.path} differs from ${entry.source}`);
      }
    }
  }

  return problems;
}

// ─── CLI Entry Point ───

const command = process.argv[2];

if (command === "sync") {
  try {
    const count = syncShared();
    const problems = validateShared();
    if (problems.length > 0) {
      for (const p of problems) {
        process.stderr.write(`ERROR: ${p}\n`);
      }
      process.exit(1);
    }
    console.log(`OK: synced ${count} file(s)`);
    process.exit(0);
  } catch (err) {
    process.stderr.write(`ERROR: ${err.message}\n`);
    process.exit(1);
  }
} else if (command === "validate") {
  try {
    const problems = validateShared();
    if (problems.length > 0) {
      for (const p of problems) {
        process.stderr.write(`${p}\n`);
      }
      process.exit(1);
    }
    console.log("OK: all shared assets in sync");
    process.exit(0);
  } catch (err) {
    process.stderr.write(`ERROR: ${err.message}\n`);
    process.exit(1);
  }
} else {
  process.stderr.write("Usage: node scripts/sync-shared.mjs [sync|validate]\n");
  process.exit(2);
}
