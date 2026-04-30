import type { ScenarioMap } from "@/lib/registry-core"
import { defaultProduct } from "./fixtures/default"
import { saleProduct } from "./fixtures/on-sale"
import { oosProduct } from "./fixtures/out-of-stock"
import type { ProductCard } from "./product-card"

export const scenarios = {
  default: { props: { product: defaultProduct }, label: "通常品" },
  outOfStock: { props: { product: oosProduct }, label: "在庫切れ" },
  onSale: { props: { product: saleProduct }, label: "セール中" },
} satisfies ScenarioMap<typeof ProductCard>
