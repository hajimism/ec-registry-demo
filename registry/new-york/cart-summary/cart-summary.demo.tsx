import type { ScenarioMap } from "@/lib/registry-core"
import type { CartSummary } from "./cart-summary"
import { defaultCart } from "./fixtures/default"
import { emptyCart } from "./fixtures/empty"

export const scenarios = {
  default: { props: { cart: defaultCart }, label: "商品あり" },
  empty: { props: { cart: emptyCart }, label: "空のカート" },
} satisfies ScenarioMap<typeof CartSummary>
