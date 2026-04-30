export const PRODUCT_DETAIL_FRAGMENT = `#graphql
  fragment ProductDetail on Product {
    id
    handle
    title
    descriptionHtml
    vendor
    availableForSale
    featuredImage {
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    tags
  }
` as const
