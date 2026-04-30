export const CART_LINE_FRAGMENT = `#graphql
  fragment CartLineItem on CartLine {
    id
    quantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
      amountPerQuantity {
        amount
        currencyCode
      }
    }
    merchandise {
      ... on ProductVariant {
        id
        title
        image {
          url
          altText
          width
          height
        }
        product {
          title
          handle
        }
        price {
          amount
          currencyCode
        }
      }
    }
  }
` as const

export const CART_SUMMARY_FRAGMENT = `#graphql
  fragment CartSummary on Cart {
    id
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      nodes {
        ...CartLineItem
      }
    }
  }
` as const
