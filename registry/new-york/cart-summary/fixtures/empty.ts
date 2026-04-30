import type { CartSummaryFragment } from "@/generated/storefront.generated"

export const emptyCart: CartSummaryFragment = {
  id: "gid://shopify/Cart/empty",
  totalQuantity: 0,
  cost: {
    subtotalAmount: { amount: "0", currencyCode: "JPY" },
    totalAmount: { amount: "0", currencyCode: "JPY" },
  },
  lines: {
    nodes: [],
  },
}
