# デザイン資産のあり方

[← 目次](./README.md)

## マルチレジストリとスタック

デザイナー / エンジニア / 顧客接点チームの頭の中では、単一の巨大 DS ではなく **スタック** になる：

```
[公開 registry A: 業界横断 EC blocks]     例: ec-registry
[公開 registry B: 汎用 primitive]         例: shadcn 公式
[プロダクト registry: 自プロダクトの憲法]   1 プロダクト = 1 レジストリ
        ↓ compose / pick → 編集 → 再登録
[アプリ repo]                             shadcn add で消費
```

## 正のソースが二層になる

| レイヤー | 正となる場所 | 担うもの |
|---|---|---|
| 見た目・ブランド | プロダクト registry（トークン・primitive） | 色・タイポ・半径・spacing、バリアント定義 |
| 振る舞い・データ契約 | Registry ブロック（fragment, fixtures, scenarios） | オブジェクトごとの状態、API 前提 |

OOUI の契約がブロック単位で流通する理由は [04-ooui.md](./04-ooui.md) を参照。

## 粒度が上がるほど、仕事が「組み立て」に寄る

- **primitive** — トークン・バリアント設計（従来の DS に近い）
- **model-view** — ドメインオブジェクトに対するビュー設計（商品カード、カート行など）
- **template** — 画面断片の設計（チェックアウト左カラム、PDP セクションなど）

生成 AI 前提では、0 からの生成ではなく **compose と bounded カスタム** が中心になる（→ [07-ai-enablement.md](./07-ai-enablement.md)）。

Figma 側の時間も「Button variants」より「Product Card の empty / sale / sold-out などの scenarios」に移る。状態の網羅は **実装側の fixtures + scenarios + プレビュー** の方が有利（→ [05-figma.md](./05-figma.md)）。

## 次に読む

- [03-product-registry.md](./03-product-registry.md) — スタックの憲法層
- [04-ooui.md](./04-ooui.md) — データ契約の語彙
- [07-ai-enablement.md](./07-ai-enablement.md) — compose 中心のイネーブルメント
