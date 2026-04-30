/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontTypes from "./storefront.types"

export type CartLineItemFragment = Pick<
  StorefrontTypes.CartLine,
  "id" | "quantity"
> & {
  cost: {
    totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
    amountPerQuantity: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
  }
  merchandise: Pick<StorefrontTypes.ProductVariant, "id" | "title"> & {
    image?: StorefrontTypes.Maybe<
      Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">
    >
    product: Pick<StorefrontTypes.Product, "title" | "handle">
    price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
  }
}

export type CartSummaryFragment = Pick<
  StorefrontTypes.Cart,
  "id" | "totalQuantity"
> & {
  cost: {
    subtotalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
    totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
  }
  lines: {
    nodes: Array<
      Pick<StorefrontTypes.CartLine, "id" | "quantity"> & {
        cost: {
          totalAmount: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
          amountPerQuantity: Pick<
            StorefrontTypes.MoneyV2,
            "amount" | "currencyCode"
          >
        }
        merchandise: Pick<StorefrontTypes.ProductVariant, "id" | "title"> & {
          image?: StorefrontTypes.Maybe<
            Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">
          >
          product: Pick<StorefrontTypes.Product, "title" | "handle">
          price: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
        }
      }
    >
  }
}

export type ProductCardFragment = Pick<
  StorefrontTypes.Product,
  "id" | "handle" | "title" | "availableForSale" | "vendor"
> & {
  featuredImage?: StorefrontTypes.Maybe<
    Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">
  >
  priceRange: {
    minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
    maxVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
  }
  compareAtPriceRange: {
    minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
  }
}

export type ProductDetailFragment = Pick<
  StorefrontTypes.Product,
  | "id"
  | "handle"
  | "title"
  | "descriptionHtml"
  | "vendor"
  | "availableForSale"
  | "tags"
> & {
  featuredImage?: StorefrontTypes.Maybe<
    Pick<StorefrontTypes.Image, "url" | "altText" | "width" | "height">
  >
  priceRange: {
    minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
  }
  compareAtPriceRange: {
    minVariantPrice: Pick<StorefrontTypes.MoneyV2, "amount" | "currencyCode">
  }
}

// biome-ignore lint/correctness/noUnusedVariables: required by codegen contract
// biome-ignore lint/complexity/noBannedTypes: codegen output
type GeneratedQueryTypes = {}

// biome-ignore lint/correctness/noUnusedVariables: required by codegen contract
// biome-ignore lint/complexity/noBannedTypes: codegen output
type GeneratedMutationTypes = {}
// Module augmentation for @shopify/storefront-api-client omitted (consumer-side)
