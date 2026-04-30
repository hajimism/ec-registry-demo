import type { ProductCardFragment } from "@/generated/storefront.generated"

const q = "auto=format&fit=crop&w=900&q=82"

export const gridProducts: ProductCardFragment[] = [
  {
    id: "gid://shopify/Product/1",
    handle: "organic-cotton-crew-tee",
    title: "オーガニックコットン クルーネックTシャツ",
    featuredImage: {
      url: `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?${q}`,
      altText: "Tシャツ",
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
  },
  {
    id: "gid://shopify/Product/2",
    handle: "stretch-slim-chinos",
    title: "ストレッチスリムチノパン",
    featuredImage: {
      url: `https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?${q}`,
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
      url: `https://images.unsplash.com/photo-1627123424574-724758594e93?${q}`,
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
  {
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
  },
]
