import type { ProductCardFragment } from "@/generated/storefront.generated"

const q = "auto=format&fit=crop&w=900&q=82"

export const oosProduct: ProductCardFragment = {
  id: "gid://shopify/Product/4",
  handle: "water-repellent-mountain-parka",
  title: "撥水マウンテンパーカー",
  featuredImage: {
    url: `https://images.unsplash.com/photo-1551028719-00167b16eac5?${q}`,
    altText: "マウンテンパーカー",
    width: 900,
    height: 1125,
  },
  priceRange: {
    minVariantPrice: { amount: "18500", currencyCode: "JPY" },
    maxVariantPrice: { amount: "18500", currencyCode: "JPY" },
  },
  compareAtPriceRange: {
    minVariantPrice: { amount: "0", currencyCode: "JPY" },
  },
  availableForSale: false,
  vendor: "EC Registry Demo",
}
