# OOUI：実装・API・商談の共通言語

[← 目次](./README.md)

## なぜ OOUI が重要か

Registry ワークフローにおいて、OOUI（Object-Oriented UI）は飾りではなく **デザイン・実装・顧客接点のあいだの通信プロトコル** になる。

UI デザインはしばしば **「技術的にこんなのは実装できない」** として突っぱねられてきた。背景には次のような断絶がある：

| 拒否の言い方 | 実際の理由 |
|---|---|
| フロントで表現できない | コンポーネント・状態・トークンの範囲外 |
| データが取れない | API / DB にフィールド・リレーションがない |

提案が「絵」だけだと、営業・CS・コンサルが作った案も、デザイナーが作った案も、同じ壁にぶつかる。**共有されるオブジェクト型がない** と、議論が感覚論になりやすい。

## Registry が変えること

### フロントエンドの実現可能性

Registry の block は **実装として登録** される。したがってカタログに載っている model-view / template について、フロントで表現不可能かどうかは、登録時点でおおむね解消されている。

### サーバー・API の実現可能性

必要な情報がサーバーから取れるかは、**どのオブジェクトのどのプロパティで描くか** に帰着する。それは API や DB の構造と直結する。

このリポジトリでは例えば：

- `product-card` — `Product` に紐づく fragment
- `cart-summary` — `Cart` 周りのデータ契約

`registry.json` の `shopify.objects` などのメタは、block が **どのドメインオブジェクトの view か** を明示するためのフックになる。

## 議論の語彙が変わる

OOUI があると、UI の修正要求を次のように分類してコミュニケーションできる：

| 分類 | 意味 | 例 |
|---|---|---|
| **既存プロパティで足りる** | 公認 block の fragment・scenarios の範囲内 | 「セール価格は `compareAtPrice` で出せる」 |
| **プロパティ追加が要る** | オブジェクト的には自然だが API / DB 変更が必要 | 「送料を合計行に出したい → `Cart` にフィールド追加」 |
| **オブジェクトが違う** | 別 model-view / 別 view の検討 | 「これは `Product` ではなく `Collection` の話」 |

営業・CS・コンサルも、デザイナー・エンジニアも、**絵の修正** ではなく **ドメインモデルの差分** として提案・清書できる（→ [08-stakeholder-workflow.md](./08-stakeholder-workflow.md)）。

## 清書・リリース時のエンジニア作業

デザイナー清書後、エンジニアに渡るタスクは「なんとなく実装」ではなく、次に近づく：

- fragment の差分
- API / Storefront スキーマの変更要否
- fixtures・scenarios の追加
- プロダクト registry への再登録と公認

## 生成 AI との関係

スキーマのない指示（「モダンなカート UI」）は、存在しない props の hallucinate を招きやすい。

fragment 付き block を参照させれば：

> `Cart` の既存 fragment で合計行に送料を出したい。足りなければどのプロパティ追加が要るか。

と **参照可能な契約** のなかで AI を動かせる（→ [07-ai-enablement.md](./07-ai-enablement.md)）。見た目のボラティリティ低減に加え、**データ契約の幻覚** も抑える。

## granularity と編集境界

| 粒度 | オブジェクト意識 | 典型的な変更 |
|---|---|---|
| **primitive** | なし（汎用） | トークン・variant |
| **model-view** | **必須**（例: `Product`） | compose、スタイル、fragment 準拠の表示 |
| **template** | 複数オブジェクトの compose | 断片の配置・組み合わせ |

model-view で fragment 契約を壊す変更は、顧客接点チームのプロト段階では **仮説** として出し、清書・リリースはエンジニアとデザイナーが担う。

## OOUI がない場合

Registry があっても OOUI が弱いと、**きれいな部品カタログ** で止まる。OOUI があるから、「技術的に無理」の前に **「どのオブジェクトのどのプロパティか」** で合意できる。

## 次に読む

- [01-background.md](./01-background.md) — granularity の概要
- [02-design-assets.md](./02-design-assets.md) — データ契約が流通する層
- [08-stakeholder-workflow.md](./08-stakeholder-workflow.md) — 顧客接点での使い方
