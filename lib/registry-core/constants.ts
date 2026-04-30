export const STOREFRONT_ONLY_OBJECTS = [
  "ProductVariant",
  "Collection",
  "Cart",
  "CartLine",
  "OrderLineItem",
  "FulfillmentLineItem",
  "MailingAddress",
  "Article",
  "Blog",
  "Page",
  "Menu",
  "MenuItem",
  "SellingPlan",
  "SellingPlanGroup",
  "Location",
  "PredictiveSearchResult",
  "SearchQuerySuggestion",
  "Filter",
] as const

export const CUSTOMER_ACCOUNT_ONLY_OBJECTS = [
  "CustomerAddress",
  "DraftOrder",
  "DraftOrderLineItem",
  "LineItem",
  "Return",
  "ReturnLineItem",
  "FulfillmentEvent",
  "Refund",
  "SubscriptionContract",
  "SubscriptionLine",
  "SubscriptionBillingCycle",
  "StoreCreditAccount",
] as const

export const SHARED_OBJECTS = [
  "Product",
  "Order",
  "Fulfillment",
  "Customer",
  "Metaobject",
  "Metafield",
  "Company",
  "CompanyContact",
  "CompanyLocation",
  "MoneyV2",
  "Image",
  "Shop",
] as const

export const ALL_OBJECTS = [
  ...STOREFRONT_ONLY_OBJECTS,
  ...CUSTOMER_ACCOUNT_ONLY_OBJECTS,
  ...SHARED_OBJECTS,
] as const

export const VIEWS = [
  "list-row",
  "table",
  "card",
  "detail-panel",
  "picker",
  "inline-chip",
  "summary-stat",
  "timeline-event",
  "form",
] as const

export const ACTIONS = [
  "read",
  "select",
  "create",
  "edit",
  "delete",
  "bulk-edit",
  "transition",
] as const

export const GRANULARITIES = ["primitive", "model-view", "template"] as const

export const SURFACES = ["storefront", "customer-account"] as const
