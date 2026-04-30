# Next.js + Storefront API Client での利用手順

## 前提

- Next.js (App Router) プロジェクト
- `@shopify/storefront-api-client` でストアに接続済み

## 1. codegen ツールをインストール

```bash
npm install -D @shopify/api-codegen-preset @graphql-codegen/cli @graphql-codegen/typescript graphql
```

## 2. `.graphqlrc.ts` を作成

```ts
import { ApiType, pluckConfig, preset } from "@shopify/api-codegen-preset"

export default {
  projects: {
    storefront: {
      schema: "https://shopify.dev/storefront-graphql-direct-proxy/2025-01",
      documents: [
        "./app/**/*.{ts,tsx}",
        "./components/ec/*.fragment.ts",
      ],
      extensions: {
        codegen: {
          pluckConfig,
          generates: {
            "./generated/storefront.types.ts": {
              plugins: ["typescript"],
              config: { enumsAsConst: true },
            },
            "./generated/storefront.generated.ts": {
              preset,
              presetConfig: { apiType: ApiType.Storefront },
            },
          },
        },
      },
    },
  },
}
```

## 3. `tsconfig.json` に paths を追加

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 4. Registry からコンポーネントを追加

```bash
bunx shadcn@latest add https://<registry-url>/r/product-card.json
```

## 5. codegen を実行

```bash
npx graphql-codegen --project storefront
```

## 6. コンポーネントを使う

```tsx
import { createStorefrontApiClient } from "@shopify/storefront-api-client"
import { ProductCard } from "@/components/ec/product-card"
import { PRODUCT_CARD_FRAGMENT } from "@/components/ec/product-card.fragment"

const client = createStorefrontApiClient({
  storeDomain: "https://your-store.myshopify.com",
  apiVersion: "2025-01",
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN!,
})

export default async function ProductsPage() {
  const { data } = await client.request(`#graphql
    query Products($first: Int!) {
      products(first: $first) {
        nodes { ...ProductCard }
      }
    }
    ${PRODUCT_CARD_FRAGMENT}
  `, { variables: { first: 12 } })

  return (
    <div className="grid grid-cols-3 gap-4">
      {data?.products.nodes.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```
