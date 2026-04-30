# Hydrogen プロジェクトでの利用手順

## 前提

- Shopify Hydrogen プロジェクトが作成済み
- `@shopify/hydrogen-codegen` がインストール済み

## 1. Registry からコンポーネントを追加

```bash
bunx shadcn@latest add https://<registry-url>/r/product-card.json
```

または preflight 付きラッパー:

```bash
bun run add https://<registry-url>/r/product-card.json
```

## 2. codegen 設定にドキュメントパスを追加

`codegen.ts` の `documents` に追加したコンポーネントのパスを含める:

```ts
import type { CodegenConfig } from "@graphql-codegen/cli"
import { pluckConfig, preset, getSchema } from "@shopify/hydrogen-codegen"

export default {
  overwrite: true,
  pluckConfig,
  generates: {
    "storefront-api.generated.d.ts": {
      preset,
      schema: getSchema("storefront"),
      documents: [
        "./app/**/*.{ts,tsx}",
        "./app/components/ec/*.fragment.ts",  // ← 追加
      ],
    },
  },
} as CodegenConfig
```

## 3. codegen を実行

```bash
shopify hydrogen codegen
```

`ProductCardFragment` 等の型が `storefront-api.generated.d.ts` に生成される。

## 4. コンポーネントを使う

```tsx
import { ProductCard } from "~/components/ec/product-card"
import { PRODUCT_CARD_FRAGMENT } from "~/components/ec/product-card.fragment"

const PRODUCTS_QUERY = `#graphql
  query Products($first: Int!) {
    products(first: $first) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`

export default function ProductsPage() {
  const { products } = useLoaderData<typeof loader>()
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.nodes.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```
