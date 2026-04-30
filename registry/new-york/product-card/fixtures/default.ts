import type { ProductCardFragment } from "@/generated/storefront.generated"

const q = "auto=format&fit=crop&w=900&q=82"

export const defaultProduct: ProductCardFragment = {
  id: "gid://shopify/Product/1",
  handle: "organic-cotton-crew-tee",
  title: "オーガニックコットン クルーネックTシャツ",
  featuredImage: {
    url: `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?${q}`,
    altText: "白いクルーネックTシャツ",
    width: 900,
    height: 1125,
  },
  priceRange: {
    minVariantPrice: { amount: "3900", currencyCode: "JPY" },
    maxVariantPrice: { amount: "3900", currencyCode: "JPY" },
  },
  compareAtPriceRange: {
    minVariantPrice: { amount: "0", currencyCode: "JPY" },
  },
  availableForSale: true,
  vendor: "EC Registry Demo",
}
