import { existsSync, readFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import {
  CUSTOMER_ACCOUNT_ONLY_OBJECTS,
  STOREFRONT_ONLY_OBJECTS,
} from "../lib/registry-core/constants"

const ROOT = resolve(import.meta.dirname, "..")
const REGISTRY_PATH = resolve(ROOT, "registry.json")

type ShopifyMeta = {
  objects: string[]
  view: string
  actions: string[]
  granularity: string
  surface: string
  api: { minVersion: string; fragmentExports: string[] }
}

type RegistryItem = {
  name: string
  type?: string
  shopify?: ShopifyMeta
  registryDependencies?: string[]
  files?: { path: string; type: string; target?: string }[]
  [key: string]: unknown
}

type Registry = { items: RegistryItem[] }

const registry: Registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"))
const itemsByName = new Map(registry.items.map((i) => [i.name, i]))

let errors = 0
let warnings = 0

function error(item: string, msg: string) {
  console.error(`  ✗ [${item}] ${msg}`)
  errors++
}

function warn(item: string, msg: string) {
  console.warn(`  ⚠ [${item}] ${msg}`)
  warnings++
}

// ============================================
// 1. Required shopify meta for registry:block items
// ============================================
for (const item of registry.items) {
  if (item.type !== "registry:block") continue

  if (!item.shopify) {
    error(item.name, "Missing `shopify` metadata")
    continue
  }

  const s = item.shopify
  if (!s.objects?.length) error(item.name, "shopify.objects is empty")
  if (!s.view) error(item.name, "shopify.view is missing")
  if (!s.actions?.length) error(item.name, "shopify.actions is empty")
  if (!s.granularity) error(item.name, "shopify.granularity is missing")
  if (!s.surface) error(item.name, "shopify.surface is missing")
  if (!s.api?.minVersion) error(item.name, "shopify.api.minVersion is missing")
  if (!s.api?.fragmentExports)
    error(item.name, "shopify.api.fragmentExports is missing")
}

// ============================================
// 2. Surface × objects consistency
// ============================================
const storefrontOnly = new Set(STOREFRONT_ONLY_OBJECTS as readonly string[])
const customerAccountOnly = new Set(
  CUSTOMER_ACCOUNT_ONLY_OBJECTS as readonly string[],
)

for (const item of registry.items) {
  if (!item.shopify) continue
  const { surface, objects } = item.shopify

  for (const obj of objects) {
    if (surface === "storefront" && customerAccountOnly.has(obj)) {
      error(
        item.name,
        `Object "${obj}" is Customer Account only but surface is "storefront"`,
      )
    }
    if (surface === "customer-account" && storefrontOnly.has(obj)) {
      error(
        item.name,
        `Object "${obj}" is Storefront only but surface is "customer-account"`,
      )
    }
  }
}

// ============================================
// 3. Granularity dependency direction
// ============================================
const GRANULARITY_RANK: Record<string, number> = {
  primitive: 0,
  "model-view": 1,
  template: 2,
}

for (const item of registry.items) {
  if (!item.shopify || !item.registryDependencies) continue

  const myRank = GRANULARITY_RANK[item.shopify.granularity]
  if (myRank === undefined) continue

  for (const depName of item.registryDependencies) {
    const dep = itemsByName.get(depName)
    if (!dep?.shopify) continue

    const depRank = GRANULARITY_RANK[dep.shopify.granularity]
    if (depRank === undefined) continue

    if (item.shopify.granularity === "primitive" && depRank >= 0) {
      error(
        item.name,
        `Primitive "${item.name}" depends on "${depName}" (${dep.shopify.granularity}). Primitives must not depend on other registry items.`,
      )
    } else if (
      item.shopify.granularity === "model-view" &&
      depRank >= GRANULARITY_RANK["model-view"]
    ) {
      const depItem = itemsByName.get(depName)
      if (depItem?.shopify) {
        error(
          item.name,
          `model-view "${item.name}" depends on "${depName}" (${dep.shopify.granularity}). model-view can only depend on primitives.`,
        )
      }
    }
  }
}

// ============================================
// 4. Fragment file existence + exports
// ============================================
for (const item of registry.items) {
  if (!item.shopify?.api?.fragmentExports?.length) continue

  const fragmentFiles =
    item.files?.filter((f) => f.path.endsWith(".fragment.ts")) ?? []

  if (fragmentFiles.length === 0) {
    error(
      item.name,
      `fragmentExports declared but no .fragment.ts file in files[]`,
    )
    continue
  }

  for (const fragFile of fragmentFiles) {
    const absPath = resolve(ROOT, fragFile.path)
    if (!existsSync(absPath)) {
      error(item.name, `Fragment file not found: ${fragFile.path}`)
      continue
    }

    const content = readFileSync(absPath, "utf-8")

    for (const exportName of item.shopify.api.fragmentExports) {
      if (!content.includes(`export const ${exportName}`)) {
        error(
          item.name,
          `Fragment export "${exportName}" not found in ${fragFile.path}`,
        )
      }
    }

    if (!content.includes("as const")) {
      warn(
        item.name,
        `Fragment in ${fragFile.path} is missing "as const" assertion (codegen may not pick it up)`,
      )
    }

    if (!content.includes("#graphql")) {
      warn(
        item.name,
        `Fragment in ${fragFile.path} is missing "#graphql" tag (codegen pluck won't find it)`,
      )
    }
  }
}

// ============================================
// 5. Demo scenarios export
// ============================================
for (const item of registry.items) {
  if (!item.shopify || item.type !== "registry:block") continue

  const itemDir = item.files?.[0]?.path
  if (!itemDir) continue

  const dir = dirname(resolve(ROOT, itemDir))
  const demoPath = join(dir, `${item.name}.demo.tsx`)

  if (!existsSync(demoPath)) {
    warn(item.name, `Demo file not found: ${demoPath}`)
    continue
  }

  const content = readFileSync(demoPath, "utf-8")
  if (!content.includes("export const scenarios")) {
    error(
      item.name,
      `Demo file exists but missing "export const scenarios" named export`,
    )
  }
}

// ============================================
// Summary
// ============================================
console.log(`\nRegistry lint: ${errors} error(s), ${warnings} warning(s)`)
process.exit(errors > 0 ? 1 : 0)
