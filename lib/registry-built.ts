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

/**
 * Resolves `/r/<name>.json` against the deployed site root (including Next `basePath`).
 * Never use bare `location.origin` alone — GitHub Pages-style hosts serve under a subpath.
 */
export function builtRegistryItemJsonUrl(baseUrl: string, name: string) {
  if (typeof window !== "undefined") {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
    const root = `${window.location.origin}${basePath}`.replace(/\/$/, "")
    return `${root}/r/${name}.json`
  }
  const root = baseUrl.replace(/\/$/, "")
  return `${root}/r/${name}.json`
}
