export type RegistryItemFile = {
  path: string
  type?: string
  target?: string
}

export type RegistryPropReference = {
  name: string
  type: string
  default?: string
  description?: string
}

export type RegistryItemBase = {
  name: string
  title?: string
  description?: string
  type?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files?: RegistryItemFile[]
  propsReference?: RegistryPropReference[]
  shopify?: {
    objects?: string[]
    view?: string
    actions?: string[]
    granularity?: string
    surface?: string
    api?: { minVersion?: string; fragmentExports?: string[] }
  }
}

export type RegistryItemWithMeta = RegistryItemBase & {
  title: string
  objects: string[]
  tags: string[]
}

export const DOMAIN_OBJECTS = [
  "Product",
  "Cart",
  "CartLine",
  "Order",
  "Customer",
  "Collection",
] as const
export type DomainObject = (typeof DOMAIN_OBJECTS)[number]

export function mergeRegistryMeta(
  items: RegistryItemBase[],
): RegistryItemWithMeta[] {
  return items.map((item) => {
    const s = item.shopify
    const objects = s?.objects ?? []
    const tags = [
      item.type ?? "",
      s?.view ?? "",
      s?.granularity ?? "",
      s?.surface ?? "",
      ...(s?.actions ?? []),
    ].filter(Boolean)

    return {
      ...item,
      title: item.title ?? item.name,
      objects,
      tags,
    }
  })
}

export function getMergedRegistryItem(
  items: RegistryItemWithMeta[],
  slug: string,
): RegistryItemWithMeta | undefined {
  return items.find((i) => i.name === slug)
}
