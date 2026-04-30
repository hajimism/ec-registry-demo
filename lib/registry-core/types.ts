import type { ComponentProps, ComponentType } from "react"

// ============================================
// Shopify Object Types — Storefront API
// ============================================

export type StorefrontObject =
  | "Product"
  | "ProductVariant"
  | "Collection"
  | "Cart"
  | "CartLine"
  | "Order"
  | "OrderLineItem"
  | "Fulfillment"
  | "FulfillmentLineItem"
  | "Customer"
  | "MailingAddress"
  | "Article"
  | "Blog"
  | "Page"
  | "Menu"
  | "MenuItem"
  | "SellingPlan"
  | "SellingPlanGroup"
  | "Location"
  | "Metaobject"
  | "Metafield"
  | "Company"
  | "CompanyContact"
  | "CompanyLocation"
  | "PredictiveSearchResult"
  | "SearchQuerySuggestion"
  | "MoneyV2"
  | "Image"
  | "Shop"
  | "Filter"

// ============================================
// Shopify Object Types — Customer Account API
// ============================================

export type CustomerAccountObject =
  | "Customer"
  | "CustomerAddress"
  | "Order"
  | "LineItem"
  | "DraftOrder"
  | "DraftOrderLineItem"
  | "Fulfillment"
  | "FulfillmentEvent"
  | "Return"
  | "ReturnLineItem"
  | "Refund"
  | "SubscriptionContract"
  | "SubscriptionLine"
  | "SubscriptionBillingCycle"
  | "Metaobject"
  | "Metafield"
  | "Shop"
  | "MoneyV2"
  | "Image"
  | "Company"
  | "CompanyContact"
  | "CompanyLocation"
  | "StoreCreditAccount"

export type ShopifyObject = StorefrontObject | CustomerAccountObject

// ============================================
// View / Action / Granularity / Surface
// ============================================

export type ShopifyView =
  | "list-row"
  | "table"
  | "card"
  | "detail-panel"
  | "picker"
  | "inline-chip"
  | "summary-stat"
  | "timeline-event"
  | "form"

export type ShopifyAction =
  | "read"
  | "select"
  | "create"
  | "edit"
  | "delete"
  | "bulk-edit"
  | "transition"

export type Granularity = "primitive" | "model-view" | "template"

export type Surface = "storefront" | "customer-account"

// ============================================
// Registry Meta
// ============================================

export type ShopifyRegistryMeta = {
  objects: ShopifyObject[]
  view: ShopifyView
  actions: ShopifyAction[]
  granularity: Granularity
  surface: Surface
  api: {
    minVersion: string
    fragmentExports: string[]
  }
}

// ============================================
// Demo / Fixture helpers
// ============================================

// biome-ignore lint/suspicious/noExplicitAny: generic constraint requires any
export type Scenario<C extends ComponentType<any>> = {
  props: ComponentProps<C>
  label: string
}

// biome-ignore lint/suspicious/noExplicitAny: generic constraint requires any
export type ScenarioMap<C extends ComponentType<any>> = Record<
  string,
  Scenario<C>
>
