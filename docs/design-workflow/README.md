# Registry 前提のデザインワークフロー

shadcn/ui 形式の **Registry** を前提にした、デザイン資産のあり方・役割分担・ガバナンス・生成 AI・OOUI についてのメモ群。
実装・セットアップの手順は [../conventions.md](../conventions.md) などを参照。

ファイル名の連番（`01`〜`10`）が推奨する読む順。

## コアコンセプト

多くのデザインシステムは **デザインを管理する** 仕組みとして導入される — 正の保持、違反の抑制、Figma Library と Storybook という在庫のメンテナンス。

Registry を前提にした DS は **デザイナーをつくる** 仕組みである。コンポーネント倉庫ではなく、**デザイン判断を組織に配布するランタイム**。顧客接点・エンジニア・生成 AI が提案に参加し、プロの UI デザイナーは在庫管理者ではなく **憲法・公認・清書・AI の編集境界** を設計する。

| | 管理する DS（従来型） | つくる DS（Registry） |
|---|---|---|
| **目的** | 一貫性を守る・違反を減らす | 提案できる人を増やす・語彙を配る |
| **正** | Figma / Storybook の在庫 | プロダクト registry + 公認 block |
| **デザイナー** | ピクセルとライブラリの管理者 | ランタイムの設計者とゲートキーパー |
| **メンテの主戦場** | コンポ在庫の更新 | 人・プロセス・公認と copy-in の同期 |

配布されるのは部品だけではない。**語彙**（OOUI）、**下限**（公認 block・scenarios）、**手順**（compose → 清書 → 還元）、**許可範囲**（AI が触っていい境界）のセット。

詳細は [01-background.md](./01-background.md) の「管理する DS とつくる DS」。

## ドキュメント一覧

| # | ファイル | 内容 |
|---|---|---|
| 01 | [01-background.md](./01-background.md) | コアコンセプト（管理 vs つくる）。Registry の単位・境界・配布モデル、granularity |
| 02 | [02-design-assets.md](./02-design-assets.md) | マルチレジストリのスタック、見た目とデータ契約の二層の「正」、粒度ごとの業務の変化 |
| 03 | [03-product-registry.md](./03-product-registry.md) | 1 プロダクト = 1 レジストリの憲法。pick → 編集 → 再登録、業界横断 registry の位置づけ |
| 04 | [04-ooui.md](./04-ooui.md) | OOUI が実装・API・商談の共通言語になる理由。プロパティ単位の判断とコミュニケーション |
| 05 | [05-figma.md](./05-figma.md) | Figma をデザインマスタにしない前提。プレイグラウンド化、State は実装で確認 |
| 06 | [06-governance.md](./06-governance.md) | 公認マーク、未公認 / 公認、デザイナー役割、提案段階との対応 |
| 07 | [07-ai-enablement.md](./07-ai-enablement.md) | 生成 AI 前提のイネーブルメント。compose / bounded カスタム、ボラティリティ低減 |
| 08 | [08-stakeholder-workflow.md](./08-stakeholder-workflow.md) | 営業・CS・コンサルによるプロト提案 → デザイナー清書 → エンジニアリリース |
| 09 | [09-workflow.md](./09-workflow.md) | 社内の発見〜還元フロー、全ロールの役割分担 |
| 10 | [10-open-questions.md](./10-open-questions.md) | copy-in・公認・移行・顧客デモ境界・還元担い手など未決テーマ |

## 一文サマリー

Registry は **デザインを管理する** のではなく **デザイナーをつくる** ための基盤である — **公認部品の compose と bounded なカスタム** で品質の分散を下げ、生成 AI と OOUI により **顧客接点からエンジニアまで同じ語彙** で提案・清書・リリースする、真のデザインシステム（ランタイム）である。

## 関連

- [../conventions.md](../conventions.md) — Fragment 命名、codegen など実装規約
- [../adding-components.md](../adding-components.md) — コンポーネント追加手順
- [../../AGENTS.md](../../AGENTS.md) — リポジトリ全体の Registry アーキテクチャ
