import type { CartSummaryFragment } from "@/generated/storefront.generated"

const q = "auto=format&fit=crop&w=200&q=80"

export const defaultCart: CartSummaryFragment = {
  id: "gid://shopify/Cart/1",
  totalQuantity: 3,
  cost: {
    subtotalAmount: { amount: "25800", currencyCode: "JPY" },
    totalAmount: { amount: "25800", currencyCode: "JPY" },
  },
  lines: {
    nodes: [
      {
        id: "gid://shopify/CartLine/1",
        quantity: 2,
        cost: {
          totalAmount: { amount: "7800", currencyCode: "JPY" },
          amountPerQuantity: { amount: "3900", currencyCode: "JPY" },
        },
        merchandise: {
          id: "gid://shopify/ProductVariant/101",
          title: "M / ホワイト",
          image: {
            url: `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?${q}`,
            altText: "Tシャツ",
            width: 200,
            height: 200,
          },
          product: {
            title: "オーガニックコットン クルーネックTシャツ",
            handle: "organic-cotton-crew-tee",
          },
          price: { amount: "3900", currencyCode: "JPY" },
        },
      },
      {
        id: "gid://shopify/CartLine/2",
        quantity: 1,
        cost: {
          totalAmount: { amount: "18000", currencyCode: "JPY" },
          amountPerQuantity: { amount: "18000", currencyCode: "JPY" },
        },
        merchandise: {
          id: "gid://shopify/ProductVariant/201",
          title: "Default Title",
          image: {
            url: `https://images.unsplash.com/photo-1551028719-00167b16eac5?${q}`,
            altText: "マウンテンパーカー",
            width: 200,
            height: 200,
          },
          product: {
            title: "撥水マウンテンパーカー",
            handle: "water-repellent-mountain-parka",
          },
          price: { amount: "18000", currencyCode: "JPY" },
        },
      },
    ],
  },
}
