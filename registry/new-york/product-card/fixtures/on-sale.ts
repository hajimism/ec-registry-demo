import type { ProductCardFragment } from "@/generated/storefront.generated"

const q = "auto=format&fit=crop&w=900&q=82"

export const saleProduct: ProductCardFragment = {
  id: "gid://shopify/Product/3",
  handle: "leather-minimalist-wallet",
  title: "レザーミニマリストウォレット",
  featuredImage: {
    url: `https://images.unsplash.com/photo-1627123424574-724758594e93?${q}`,
    altText: "レザーウォレット",
    width: 900,
    height: 1125,
  },
  priceRange: {
    minVariantPrice: { amount: "12000", currencyCode: "JPY" },
    maxVariantPrice: { amount: "12000", currencyCode: "JPY" },
  },
  compareAtPriceRange: {
    minVariantPrice: { amount: "15000", currencyCode: "JPY" },
  },
  availableForSale: true,
  vendor: "EC Registry Demo",
}
