import type { ProductDetailFragment } from "@/generated/storefront.generated"

const q = "auto=format&fit=crop&w=1200&q=85"

export const defaultProductDetail: ProductDetailFragment = {
  id: "gid://shopify/Product/1",
  handle: "organic-cotton-crew-tee",
  title: "オーガニックコットン クルーネックTシャツ",
  descriptionHtml:
    "<p>インド産オーガニックコットン100%のクルーネックTシャツ。柔らかな肌触りと丈夫さを両立。洗濯しても型崩れしにくい二重縫製仕上げ。</p>",
  vendor: "EC Registry Demo",
  availableForSale: true,
  featuredImage: {
    url: `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?${q}`,
    altText: "白いクルーネックTシャツ",
    width: 1200,
    height: 1200,
  },
  priceRange: {
    minVariantPrice: { amount: "3900", currencyCode: "JPY" },
  },
  compareAtPriceRange: {
    minVariantPrice: { amount: "0", currencyCode: "JPY" },
  },
  tags: ["オーガニック", "Tシャツ", "メンズ"],
}
