export type BuiltRegistryFile = {
  path: string
  type?: string
  target?: string
  content?: string
}

export type BuiltRegistryItem = {
  name: string
  title?: string
  description?: string
  type?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: BuiltRegistryFile[]
  shopify?: {
    objects?: string[]
    view?: string
    actions?: string[]
    granularity?: string
    surface?: string
    api?: { minVersion?: string; fragmentExports?: string[] }
  }
}

export function builtRegistryItemJsonUrl(baseUrl: string, name: string) {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : baseUrl.replace(/\/$/, "")
  return `${origin}/r/${name}.json`
}
