import type {
  CartSummaryFragment,
  ProductCardFragment,
  ProductDetailFragment,
} from "@/generated/storefront.generated"

const q = "auto=format&fit=crop&w=1200&q=85"
const qCard = "auto=format&fit=crop&w=900&q=82"
const qThumb = "auto=format&fit=crop&w=200&q=80"

export const mainProduct: ProductDetailFragment = {
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

export const relatedProducts: ProductCardFragment[] = [
  {
    id: "gid://shopify/Product/2",
    handle: "stretch-slim-chinos",
    title: "ストレッチスリムチノパン",
    featuredImage: {
      url: `https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?${qCard}`,
      altText: "チノパン",
      width: 900,
      height: 1125,
    },
    priceRange: {
      minVariantPrice: { amount: "7800", currencyCode: "JPY" },
      maxVariantPrice: { amount: "7800", currencyCode: "JPY" },
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: "0", currencyCode: "JPY" },
    },
    availableForSale: true,
    vendor: "EC Registry Demo",
  },
  {
    id: "gid://shopify/Product/3",
    handle: "leather-minimalist-wallet",
    title: "レザーミニマリストウォレット",
    featuredImage: {
      url: `https://images.unsplash.com/photo-1627123424574-724758594e93?${qCard}`,
      altText: "ウォレット",
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
    vendor: "Craft Leather Co.",
  },
]

export const sideCart: CartSummaryFragment = {
  id: "gid://shopify/Cart/1",
  totalQuantity: 2,
  cost: {
    subtotalAmount: { amount: "11700", currencyCode: "JPY" },
    totalAmount: { amount: "11700", currencyCode: "JPY" },
  },
  lines: {
    nodes: [
      {
        id: "gid://shopify/CartLine/1",
        quantity: 1,
        cost: {
          totalAmount: { amount: "3900", currencyCode: "JPY" },
          amountPerQuantity: { amount: "3900", currencyCode: "JPY" },
        },
        merchandise: {
          id: "gid://shopify/ProductVariant/101",
          title: "M / ホワイト",
          image: {
            url: `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?${qThumb}`,
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
          totalAmount: { amount: "7800", currencyCode: "JPY" },
          amountPerQuantity: { amount: "7800", currencyCode: "JPY" },
        },
        merchandise: {
          id: "gid://shopify/ProductVariant/201",
          title: "32 / ベージュ",
          image: {
            url: `https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?${qThumb}`,
            altText: "チノパン",
            width: 200,
            height: 200,
          },
          product: {
            title: "ストレッチスリムチノパン",
            handle: "stretch-slim-chinos",
          },
          price: { amount: "7800", currencyCode: "JPY" },
        },
      },
    ],
  },
}
