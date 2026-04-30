import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

const ROOT = resolve(import.meta.dirname, "..")
const REGISTRY_PATH = resolve(ROOT, "registry.json")
const OUTPUT_DIR = resolve(ROOT, "public/r")

type RegistryItem = {
  name: string
  shopify?: Record<string, unknown>
  title?: string
  description?: string
  [key: string]: unknown
}

type Registry = {
  items: RegistryItem[]
  [key: string]: unknown
}

const registry: Registry = JSON.parse(readFileSync(REGISTRY_PATH, "utf-8"))

let injected = 0

for (const item of registry.items) {
  if (!item.shopify) continue

  const outputPath = resolve(OUTPUT_DIR, `${item.name}.json`)
  if (!existsSync(outputPath)) {
    console.warn(`  ⚠ ${item.name}.json not found, skipping`)
    continue
  }

  const built = JSON.parse(readFileSync(outputPath, "utf-8"))
  built.shopify = item.shopify
  writeFileSync(outputPath, `${JSON.stringify(built, null, 2)}\n`)
  injected++
  console.log(`  ✔ ${item.name}.json — shopify meta injected`)
}

console.log(`\n${injected} item(s) updated.`)

// ============================================
// Generate index.json for search / MCP queries
// ============================================

type IndexItem = {
  name: string
  title?: string
  description?: string
  shopify: Record<string, unknown>
}

const indexItems: IndexItem[] = []
const facets: Record<string, Set<string>> = {
  objects: new Set(),
  views: new Set(),
  actions: new Set(),
  granularities: new Set(),
  surfaces: new Set(),
}

for (const item of registry.items) {
  if (!item.shopify) continue

  const s = item.shopify as Record<string, unknown>
  indexItems.push({
    name: item.name,
    title: item.title,
    description: item.description,
    shopify: {
      objects: s.objects,
      view: s.view,
      actions: s.actions,
      granularity: s.granularity,
      surface: s.surface,
    },
  })

  for (const obj of s.objects ?? []) facets.objects.add(obj)
  if (s.view) facets.views.add(s.view)
  for (const act of s.actions ?? []) facets.actions.add(act)
  if (s.granularity) facets.granularities.add(s.granularity)
  if (s.surface) facets.surfaces.add(s.surface)
}

const index = {
  items: indexItems,
  facets: Object.fromEntries(
    Object.entries(facets).map(([k, v]) => [k, [...v].sort()]),
  ),
}

const indexPath = resolve(OUTPUT_DIR, "index.json")
writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`)
console.log(`✔ index.json generated (${indexItems.length} item(s))`)

// ============================================
// Generate search-index.json for client-side search
// ============================================

type SearchEntry = {
  name: string
  title: string
  description: string
  objects: string[]
  view: string
  granularity: string
  surface: string
  actions: string[]
  keywords: string
}

const searchEntries: SearchEntry[] = registry.items
  .filter((item: RegistryItem) => item.shopify)
  .map((item: RegistryItem) => {
    const s = item.shopify as Record<string, unknown>
    const objects: string[] = s.objects ?? []
    const actions: string[] = s.actions ?? []
    const keywords = [
      item.name,
      item.title ?? "",
      item.description ?? "",
      ...objects,
      s.view ?? "",
      s.granularity ?? "",
      s.surface ?? "",
      ...actions,
    ]
      .join(" ")
      .toLowerCase()

    return {
      name: item.name,
      title: (item.title as string) ?? item.name,
      description: (item.description as string) ?? "",
      objects,
      view: s.view ?? "",
      granularity: s.granularity ?? "",
      surface: s.surface ?? "",
      actions,
      keywords,
    }
  })

const searchIndexPath = resolve(OUTPUT_DIR, "search-index.json")
writeFileSync(searchIndexPath, `${JSON.stringify(searchEntries, null, 2)}\n`)
console.log(`✔ search-index.json generated (${searchEntries.length} entries)`)
