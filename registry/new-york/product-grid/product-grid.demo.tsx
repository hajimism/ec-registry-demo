import type { ScenarioMap } from "@/lib/registry-core"
import { gridProducts } from "./fixtures/products"
import type { ProductGrid } from "./product-grid"

export const scenarios = {
  default: { props: { products: gridProducts }, label: "4商品" },
  empty: { props: { products: [] }, label: "商品なし" },
} satisfies ScenarioMap<typeof ProductGrid>
