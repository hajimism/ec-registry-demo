import type { RegistryItemWithMeta } from "@/lib/registry-catalog"

export type RegistryFilters = {
  view: string | null
  action: string | null
}

export function collectFacets(items: RegistryItemWithMeta[]) {
  const views = new Set<string>()
  const actions = new Set<string>()

  for (const item of items) {
    const s = item.shopify
    if (!s) continue
    if (s.view) views.add(s.view)
    for (const a of s.actions ?? []) actions.add(a)
  }

  return {
    views: [...views].sort(),
    actions: [...actions].sort(),
  }
}

export function applyFilters(
  items: RegistryItemWithMeta[],
  filters: RegistryFilters,
) {
  return items.filter((item) => {
    const s = item.shopify
    if (!s) return false
    if (filters.view && s.view !== filters.view) return false
    if (filters.action && !(s.actions ?? []).includes(filters.action))
      return false
    return true
  })
}

/** Groups items by Shopify domain object (Product, Cart, …). */
export function groupByDomainObject(items: RegistryItemWithMeta[]) {
  const groups = new Map<string, RegistryItemWithMeta[]>()
  for (const item of items) {
    for (const obj of item.objects) {
      const list = groups.get(obj) ?? []
      if (!list.some((i) => i.name === item.name)) {
        list.push(item)
      }
      groups.set(obj, list)
    }
  }
  return groups
}

export function getRegistryNeighbors(
  items: RegistryItemWithMeta[],
  slug: string,
) {
  const blocks = items.filter((i) => i.type === "registry:block")
  const idx = blocks.findIndex((i) => i.name === slug)
  if (idx < 0) return { prev: null, next: null }
  const prev = idx > 0 ? blocks[idx - 1] : null
  const next = idx < blocks.length - 1 ? blocks[idx + 1] : null
  return { prev, next }
}

export function getRelatedBySharedObjects(
  item: RegistryItemWithMeta,
  allItems: RegistryItemWithMeta[],
): RegistryItemWithMeta[] {
  const related = new Map<string, RegistryItemWithMeta>()
  for (const obj of item.objects) {
    for (const other of allItems) {
      if (other.name === item.name) continue
      if (other.objects.includes(obj)) related.set(other.name, other)
    }
  }
  return [...related.values()]
}
