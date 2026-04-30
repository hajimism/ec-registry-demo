import type { ProductDetailFragment } from "@/generated/storefront.generated"

const q = "auto=format&fit=crop&w=1200&q=85"

export const saleProductDetail: ProductDetailFragment = {
  id: "gid://shopify/Product/3",
  handle: "leather-minimalist-wallet",
  title: "レザーミニマリストウォレット",
  descriptionHtml:
    "<p>イタリアンレザーを使用したスリムウォレット。カード6枚+紙幣対応。使い込むほど味が出るベジタブルタンニン鞣し。</p>",
  vendor: "EC Registry Demo",
  availableForSale: true,
  featuredImage: {
    url: `https://images.unsplash.com/photo-1627123424574-724758594e93?${q}`,
    altText: "レザーウォレット",
    width: 1200,
    height: 1200,
  },
  priceRange: {
    minVariantPrice: { amount: "12000", currencyCode: "JPY" },
  },
  compareAtPriceRange: {
    minVariantPrice: { amount: "15000", currencyCode: "JPY" },
  },
  tags: ["レザー", "財布", "セール"],
}
