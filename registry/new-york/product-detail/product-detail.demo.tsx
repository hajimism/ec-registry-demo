import type { ScenarioMap } from "@/lib/registry-core"
import { defaultProductDetail } from "./fixtures/default"
import { saleProductDetail } from "./fixtures/on-sale"
import type { ProductDetail } from "./product-detail"

export const scenarios = {
  default: { props: { product: defaultProductDetail }, label: "通常品" },
  onSale: { props: { product: saleProductDetail }, label: "セール中" },
} satisfies ScenarioMap<typeof ProductDetail>
