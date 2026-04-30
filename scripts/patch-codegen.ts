import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

const ROOT = resolve(import.meta.dirname, "..")
const FILE = resolve(ROOT, "generated/storefront.generated.ts")

let content = readFileSync(FILE, "utf-8")

content = content.replace(
  /^declare module '@shopify\/storefront-api-client'[\s\S]*?^}/m,
  "// Module augmentation for @shopify/storefront-api-client omitted (consumer-side)",
)

content = content.replace(
  /from '\.\/storefront\.types\.js'/g,
  "from './storefront.types'",
)

writeFileSync(FILE, content)
console.log("✔ Patched generated/storefront.generated.ts")
