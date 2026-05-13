import type { BundledLanguage } from "shiki"

/** Map registry file paths to Shiki bundled languages. */
export function registryFileToShikiLang(path: string): BundledLanguage {
  const p = path.toLowerCase()
  if (p.endsWith(".tsx")) return "tsx"
  if (p.endsWith(".ts")) return "typescript"
  if (p.endsWith(".json")) return "json"
  if (p.endsWith(".css")) return "css"
  if (p.endsWith(".html") || p.endsWith(".htm")) return "html"
  if (p.endsWith(".graphql") || p.endsWith(".gql")) return "graphql"
  if (p.endsWith(".md") || p.endsWith(".mdx")) return "markdown"
  if (p.endsWith(".js") || p.endsWith(".mjs") || p.endsWith(".cjs"))
    return "javascript"
  return "typescript"
}
