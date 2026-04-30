import type { ScenarioMap } from "@/lib/registry-core"
import { mainProduct, relatedProducts, sideCart } from "./fixtures/default"
import type { ProductPage } from "./product-page"

export const scenarios = {
  default: {
    props: { product: mainProduct, relatedProducts, cart: sideCart },
    label: "商品ページ（カートあり）",
  },
  emptyCart: {
    props: {
      product: mainProduct,
      relatedProducts,
      cart: {
        id: "gid://shopify/Cart/empty",
        totalQuantity: 0,
        cost: {
          subtotalAmount: { amount: "0", currencyCode: "JPY" },
          totalAmount: { amount: "0", currencyCode: "JPY" },
        },
        lines: { nodes: [] },
      },
    },
    label: "商品ページ（カート空）",
  },
} satisfies ScenarioMap<typeof ProductPage>
