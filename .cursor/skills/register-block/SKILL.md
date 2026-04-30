---
name: register-block
description: >-
  Register a new EC component block in the shadcn registry. Use when adding a
  new component, block, primitive, model-view, or template to registry.json, or
  when the user asks to create/add a new EC component.
---

# Register Block

EC registry にコンポーネントを登録する手順。

## 1. Granularity の判定

| granularity | 判定基準 | Props パターン |
|---|---|---|
| primitive | ドメインモデルに紐付かない汎用 UI | `{variant, size, ...}` |
| model-view | 特定の Shopify Model のビュー (OOUI) | `{model: M}` or `{models: M[]}` |
| template | 複数の異なる Model を跨ぐページレベル構成 | 複数モデルの Props |

## 2. Primitive の登録

### ファイル構成

```
registry/new-york/ui/<name>.tsx
```

demo / fragment / fixtures は不要。

### registry.json エントリ

```json
{
  "name": "<name>",
  "type": "registry:block",
  "title": "<Title>",
  "description": "<日本語の説明>",
  "registryDependencies": [],
  "dependencies": [],
  "shopify": {
    "granularity": "primitive",
    "surface": "storefront"
  },
  "files": [
    {
      "path": "registry/new-york/ui/<name>.tsx",
      "type": "registry:component",
      "target": "~/components/ui/<name>.tsx"
    }
  ]
}
```

## 3. Model-View の登録

### ファイル構成

```
registry/new-york/<name>/
├── <name>.tsx              # FC<{model: XxxFragment}>
├── <name>.fragment.ts      # GraphQL fragment
├── <name>.demo.tsx         # export const scenarios satisfies ScenarioMap<typeof Component>
└── fixtures/
    └── default.ts          # プレビュー用モックデータ
```

### 手順

1. ディレクトリとファイルを作成
2. fragment ファイル: `export const XXX_FRAGMENT = \`#graphql ...\` as const`
3. `bun run codegen` で型を生成
4. コンポーネント実装（生成された Fragment 型を Props に使用）
5. fixtures にモックデータ作成
6. demo に scenarios を定義
7. `components/ec/<name>.tsx` に re-export ファイル作成:
   ```typescript
   export { default, ComponentName } from "@/registry/new-york/<name>/<name>"
   ```
8. registry.json にエントリ追加（下記テンプレート）
9. `components/registry-item-preview.tsx` に preview case 追加
10. `lib/registry-visuals.ts` にアイコンマッピング追加

### registry.json エントリ

```json
{
  "name": "<name>",
  "type": "registry:block",
  "title": "<Title>",
  "description": "<日本語の説明>。FC<{model: XxxFragment}>",
  "registryDependencies": ["<shadcn-deps>"],
  "dependencies": ["lucide-react"],
  "shopify": {
    "objects": ["<ShopifyObject>"],
    "view": "<view-type>",
    "actions": ["read"],
    "granularity": "model-view",
    "surface": "storefront",
    "api": {
      "minVersion": "2025-01",
      "fragmentExports": ["<FRAGMENT_NAME>"]
    }
  },
  "files": [
    {
      "path": "registry/new-york/<name>/<name>.tsx",
      "type": "registry:component",
      "target": "~/components/ec/<name>.tsx"
    },
    {
      "path": "registry/new-york/<name>/<name>.fragment.ts",
      "type": "registry:file",
      "target": "~/components/ec/<name>.fragment.ts"
    }
  ]
}
```

### shopify.view の選択肢

`list-row`, `table`, `card`, `detail-panel`, `picker`, `inline-chip`, `summary-stat`, `timeline-event`, `form`

### shopify.objects の選択肢

Storefront: Product, ProductVariant, Cart, CartLine, Collection, etc.
Customer Account: CustomerAddress, DraftOrder, Return, etc.
Shared: Product, Order, Customer, Image, Shop, etc.

完全なリストは `lib/registry-core/constants.ts` を参照。

## 4. Template の登録

model-view と同じ手順だが:

- `registryDependencies` に依存する model-view / template を列挙
- fragment は持たなくてもよい（依存先の fragment を再利用）
- `shopify.granularity` は `"template"`

## 5. 検証

登録後は必ず以下を実行:

```bash
bun run lint:registry  # registry.json バリデーション
bun run lint           # Biome チェック
bun run build          # static export（全ページ生成確認）
```

## コーディング規約

- import は `@/` パスエイリアス
- UI コピーは日本語
- fragment ファイルは `as const` + `#graphql` タグ必須
- demo は `export const scenarios satisfies ScenarioMap<typeof Component>` 形式
- Biome でフォーマット（`bun run lint:fix` で自動修正可）
