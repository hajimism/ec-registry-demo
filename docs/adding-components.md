# コンポーネント追加手順

## ディレクトリ構成

```
registry/new-york/<component-name>/
├── <component-name>.tsx              # コンポーネント本体
├── <component-name>.fragment.ts      # GraphQL fragment (co-located)
├── <component-name>.demo.tsx         # scenarios export
└── fixtures/
    ├── default.ts                    # デフォルト fixture
    └── <variant>.ts                  # バリエーション fixture
```

## 手順

### 1. Fragment を定義

```ts
// product-card.fragment.ts
export const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment ProductCard on Product {
    id
    handle
    title
    featuredImage { url altText width height }
    priceRange {
      minVariantPrice { amount currencyCode }
    }
    availableForSale
    vendor
  }
` as const
```

### 2. codegen を実行

```bash
bun run codegen --project storefront
```

`generated/storefront.generated.ts` に `ProductCardFragment` 型が追加される。

### 3. コンポーネントを実装

```tsx
import type { ProductCardFragment } from "@/generated/storefront.generated"

export const ProductCard: React.FC<{ product: ProductCardFragment }> = ({ product }) => {
  // ...
}
```

### 4. Fixture を作成

`fixtures/default.ts` に codegen 産の型でキャストしたテストデータを定義。

### 5. Demo を作成

```tsx
export const scenarios = {
  default: { props: { product: defaultProduct }, label: "通常品" },
} satisfies ScenarioMap<typeof ProductCard>
```

### 6. `registry.json` に登録

```json
{
  "name": "product-card",
  "type": "registry:block",
  "shopify": {
    "objects": ["Product"],
    "view": "card",
    "actions": ["read"],
    "granularity": "model-view",
    "surface": "storefront",
    "api": {
      "minVersion": "2025-01",
      "fragmentExports": ["PRODUCT_CARD_FRAGMENT"]
    }
  },
  "files": [
    { "path": "registry/new-york/product-card/product-card.tsx", "type": "registry:component" },
    { "path": "registry/new-york/product-card/product-card.fragment.ts", "type": "registry:file" }
  ]
}
```

### 7. lint + build

```bash
bun run lint:registry
bun run registry:build
```
