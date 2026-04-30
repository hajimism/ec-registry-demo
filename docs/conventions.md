# 規約一覧

## 1. codegen プリセット

| ケース | 推奨パッケージ |
|--------|---------------|
| Hydrogen プロジェクト | `@shopify/hydrogen-codegen` |
| それ以外（Next.js など） | `@shopify/api-codegen-preset` |

## 2. エイリアスパス

利用側の `tsconfig.json` で以下の paths を設定すること:

```json
{
  "compilerOptions": {
    "paths": {
      "@/generated/storefront": ["./generated/storefront.generated"],
      "@/generated/customer-account": ["./generated/customer-account.generated"]
    }
  }
}
```

## 3. Fragment ファイル命名

- ファイル名: `<component-name>.fragment.ts`
- export 名: `SCREAMING_SNAKE_CASE` (e.g. `PRODUCT_CARD_FRAGMENT`)
- `#graphql` タグと `as const` は必須

```ts
export const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment ProductCard on Product {
    id
    title
    ...
  }
` as const
```

## 4. Fixture の型

fixture データは codegen 産の fragment 型でキャストする。
API バージョンを上げて fragment が変わったとき、fixture がコンパイルエラーになることで腐敗を検知する。

```ts
import type { ProductCardFragment } from "@/generated/storefront.generated"

export const defaultProduct: ProductCardFragment = {
  id: "gid://shopify/Product/1",
  // ...
}
```

## 5. Demo の export

各コンポーネントの `*.demo.tsx` は `scenarios` を named export する。

```tsx
import type { ScenarioMap } from "@/lib/registry-core"

export const scenarios = {
  default: { props: { product: defaultProduct }, label: "通常品" },
  // ...
} satisfies ScenarioMap<typeof ProductCard>
```

## 6. Granularity 依存方向ルール

| 粒度 | 依存可能な対象 |
|------|---------------|
| `primitive` | 他の registry item に依存しない |
| `model-view` | `primitive` のみ |
| `template` | `model-view` と `primitive` |

`bun run lint:registry` で逆方向依存が検出される。
