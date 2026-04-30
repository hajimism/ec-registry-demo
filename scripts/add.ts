#!/usr/bin/env bun
/**
 * Wrapper around `shadcn add` that performs Shopify-specific preflight checks:
 * 1. Fetches the registry item JSON to read shopify.api.minVersion
 * 2. Detects the consumer's codegen config to read their apiVersion
 * 3. Warns if the consumer's apiVersion is lower than required
 * 4. Runs `shadcn add`
 * 5. Notifies if new fragment files were added (codegen rerun needed)
 */

import { execSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error("Usage: bun run add <component-url-or-name> [shadcn flags...]")
  process.exit(1)
}

const componentArg = args[0]

// --- Resolve registry URL ---
function resolveRegistryUrl(arg: string): string | null {
  if (arg.startsWith("http://") || arg.startsWith("https://")) return arg

  const componentsJsonPath = resolve(process.cwd(), "components.json")
  if (!existsSync(componentsJsonPath)) return null

  try {
    const config = JSON.parse(readFileSync(componentsJsonPath, "utf-8"))
    const registryUrl =
      config.shopify?.registryUrl ?? config.registries?.["ec-registry"]?.url
    if (registryUrl) {
      const base = registryUrl.replace(/\/$/, "")
      return `${base}/${arg}.json`
    }
  } catch {}

  return null
}

// --- Detect consumer apiVersion from codegen config ---
const CONFIG_CANDIDATES = [
  "codegen.ts",
  "codegen.yml",
  "codegen.yaml",
  ".graphqlrc.ts",
  ".graphqlrc.yml",
  ".graphqlrc.yaml",
]

function detectConsumerApiVersion(): string | null {
  const envPath = process.env.SHOPIFY_CODEGEN_CONFIG
  const candidates = envPath
    ? [envPath, ...CONFIG_CANDIDATES]
    : CONFIG_CANDIDATES

  for (const candidate of candidates) {
    const fullPath = resolve(process.cwd(), candidate)
    if (!existsSync(fullPath)) continue

    try {
      const content = readFileSync(fullPath, "utf-8")
      const match = content.match(/apiVersion['":\s]*['"](\d{4}-\d{2})['"]/)
      if (match) return match[1]
    } catch {}
  }

  return null
}

function compareVersions(a: string, b: string): number {
  return a.localeCompare(b)
}

// --- Main ---
async function main() {
  const registryUrl = resolveRegistryUrl(componentArg)

  if (registryUrl) {
    try {
      const res = await fetch(registryUrl)
      if (res.ok) {
        const data = await res.json()
        const minVersion = data.shopify?.api?.minVersion
        const fragmentExports = data.shopify?.api?.fragmentExports ?? []

        if (minVersion) {
          const consumerVersion = detectConsumerApiVersion()

          if (consumerVersion) {
            if (compareVersions(consumerVersion, minVersion) < 0) {
              console.warn(`\n⚠ [shopify-registry] API version mismatch`)
              console.warn(`  Component requires: ${minVersion}`)
              console.warn(`  Your codegen config: ${consumerVersion}`)
              console.warn(
                `  Update your apiVersion to >= ${minVersion} before using this component.\n`,
              )
            } else {
              console.log(
                `✔ API version check passed (yours: ${consumerVersion}, required: >=${minVersion})`,
              )
            }
          } else {
            console.log(
              `ℹ Could not detect your apiVersion. This component requires >= ${minVersion}.`,
            )
          }
        }

        if (fragmentExports.length > 0) {
          console.log(
            `ℹ This component includes GraphQL fragments: ${fragmentExports.join(", ")}`,
          )
        }
      }
    } catch {
      // preflight is best-effort
    }
  }

  // --- Run shadcn add ---
  console.log(`\nRunning: shadcn add ${args.join(" ")}\n`)

  try {
    execSync(`npx shadcn add ${args.join(" ")}`, {
      stdio: "inherit",
      cwd: process.cwd(),
    })
  } catch (_e) {
    process.exit(1)
  }

  // --- Post-add: check for fragment files ---
  if (registryUrl) {
    try {
      const res = await fetch(registryUrl)
      if (res.ok) {
        const data = await res.json()
        const fragmentFiles = (data.files ?? []).filter(
          (f: { path?: string }) => f.path?.endsWith(".fragment.ts"),
        )

        if (fragmentFiles.length > 0) {
          console.log(`\n[shopify-registry] 新しい fragment が追加されました:`)
          for (const f of fragmentFiles) {
            console.log(`  - ${f.target ?? f.path}`)
          }
          const exports = data.shopify?.api?.fragmentExports ?? []
          if (exports.length > 0) {
            console.log(`  exports: ${exports.join(", ")}`)
          }
          console.log(`\n型を再生成してください:\n  npm run codegen\n`)
        }
      }
    } catch {}
  }
}

main()
