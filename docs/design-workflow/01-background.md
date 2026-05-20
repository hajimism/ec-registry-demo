# 背景：従来のデザインシステムとの違い

[← 目次](./README.md)

## 管理する DS とつくる DS

### コアコンセプト

**従来型のデザインシステム**は、多くの現場で **デザインを管理する** ために使われる — ブランドと UI の一貫性、コンポーネント在庫の正、Figma / Storybook の更新、ガバナンスによる逸脱防止。

**Registry を前提にしたデザインシステム**は、**デザイナーをつくる** ために使う — デザイン判断（何をどう見せるか、どのオブジェクトのどのプロパティか）を、職種を問わず組織に配布するインフラ。いわゆる「真の DS」は **部品カタログ** ではなく、**提案・清書・リリースが回るランタイム** である。

| | 管理する DS | つくる DS（Registry） |
|---|---|---|
| **問い** | 正を守れているか | 誰がデザイン提案できるか |
| **成果物** | ライブラリ・ガイド | 語彙・下限・手順・許可範囲 |
| **デザイナーの役割** | 在庫とピクセルの管理者 | 憲法・公認・清書・AI 境界の設計者 |
| **Figma** | しばしばマスタ | プレイグラウンド（→ [05-figma.md](./05-figma.md)） |
| **コストの重心** | 在庫メンテ・手戻り抑制 | 拡張後の同期（公認、還元、copy-in） |

### ランタイムが配る四つ

1. **語彙** — OOUI（どのオブジェクトのどのプロパティか）（→ [04-ooui.md](./04-ooui.md)）
2. **下限** — 公認 block・fixtures・scenarios（→ [06-governance.md](./06-governance.md)）
3. **手順** — compose → 清書 → 還元（→ [08-stakeholder-workflow.md](./08-stakeholder-workflow.md)、[09-workflow.md](./09-workflow.md)）
4. **許可範囲** — 生成 AI が触っていい境界（→ [07-ai-enablement.md](./07-ai-enablement.md)）

「デザイナーをつくる」とは、空白から描かせることではない。**すでにデザインしている人を増やす** — 営業 / CS / コンサルが商談中に compose 案を出し、エンジニア / PdM が fragment の語彙で議論し、プロの UI デザイナーが本番品質に落とす、という分担（→ [08-stakeholder-workflow.md](./08-stakeholder-workflow.md)）。

### 批評の読み方（議論メモ）

Registry への懸念の多くは、**在庫管理・Figma 工数・モデリングの難しさ・商談リスク** など、デジタルプロダクト一般の論点である。それらは DS 導入の前提条件でもあり、Registry 固有の欠陥とは限らない。

**Registry 特有**として意識すべきは主に次の構造である（→ [10-open-questions.md](./10-open-questions.md)）：

- **copy-in** — 公認の正（registry）と実行コード（`add` 後の app repo）が別物になりやすい
- **契約付き流通** — block に fragment などデータ契約が同梱される
- **多層 registry** — 業界 registry・汎用 primitive・プロダクト registry のスタック
- **manifest 上の公認** — 未公認と公認が同型の item として並ぶカタログ

メンテナンスが「軽くなる」というより、**在庫から人とプロセスへ重心が移る**。出版コストは Storybook に近い一方、消費側の同期と公認が増える。

---

## 比較

| | 従来のデザインシステム | Registry |
|---|---|---|
| **目的** | デザインを **管理** する（一貫性・在庫） | **デザイナーをつくる**（判断の配布） |
| **単位** | Button, Card などプリミティブ中心 | `primitive` → `model-view` → `template` の階層 |
| **境界** | プロジェクト / ブランド / 会社に閉じる | 公開範囲は自由（社内・業界・全世界） |
| **配布** | Figma Library + Storybook が正 | `registry.json` + `shadcn add` が正 |
| **所有** | 「我が社の DS」が前提 | pick & compose が前提 |
| **誰がデザインするか** | UI デザイナー中心 | 顧客接点チーム + AI も提案、デザイナーは清書・公認（→ [08-stakeholder-workflow.md](./08-stakeholder-workflow.md)） |

## Registry で配布できるもの

Registry では OOUI 的な構造（例: Shopify の `Product` に紐づく `product-card`）やテンプレート断片まで、**ブロック単位**で登録・配布できる。全世界に多数のレジストリが存在し、そこから必要なブロックを pick する世界が想定される。

OOUI がなぜ通信プロトコルになるかは [04-ooui.md](./04-ooui.md) を参照。

## 粒度（このリポジトリの例）

| 粒度 | 例 | 説明 |
|---|---|---|
| **primitive** | `button`, `card` | 汎用 UI |
| **model-view** | `product-card`, `cart-summary` | ドメインオブジェクトに紐づくビュー |
| **template** | （画面断片） | 複数ブロックを組んだまとまり |

各ブロックは GraphQL fragment・fixtures・`scenarios` と一体で流通し、「見た目」だけでなく**データ契約**もパッケージになる。

## 次に読む

- [02-design-assets.md](./02-design-assets.md) — マルチレジストリと資産のスタック
- [04-ooui.md](./04-ooui.md) — オブジェクト単位の語彙
- [03-product-registry.md](./03-product-registry.md) — プロダクトごとの憲法
