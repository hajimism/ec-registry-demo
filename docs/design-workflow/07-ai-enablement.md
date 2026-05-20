# 生成 AI とデザインイネーブルメント

[← 目次](./README.md)

## 前提：UI デザインは専門職だけの仕事ではない

生成 AI を前提にすると、UI デザインは **UI デザイナーだけの職域** ではなくなる。Registry によって、品質の下限が担保された部品空間のなかで、より多くのロールが UI 提案に関われる（→ [08-stakeholder-workflow.md](./08-stakeholder-workflow.md)）。

## イネーブルメントの本質

Registry は **デザインを管理する** のではなく **デザイナーをつくる** ランタイムである（→ [01-background.md](./01-background.md)）。イネーブルメントは在庫削減ではなく、**デザイン判断を配布する** ことに他ならない。

Registry によるデザインイネーブルメントの本質は、**0 からデザインを生成することではない**。

| やらないこと | やること |
|---|---|
| 空白キャンバスからの UI 生成 | **公認済み部品の compose**（組み合わせ） |
| 自由なピクセル・構造の生成 | **既存 block の bounded なカスタム**（トークン・variant・props の範囲内） |

目的は **デザイン品質のボラティリティ（分散）を下げる** こと。最高の一点物を毎回狙うより、**80 点が安定して出る** 方がプロダクトには効く。平均を上げ、ばらつきを抑える。

整備されたプロダクト registry があれば、誰でも次のように AI を使える：

- 参考にする block を registry から指定する
- 「こういう UI を作りたい。`product-grid` と `product-card`（公認）を参考に」
- 「この preview のカートサマリー、合計行の typography だけ大きく」

参照の単位は Figma URL ではなく **registry item 名・scenarios・プレビュー URL・ソース** になる（このリポジトリのカタログサイトが AI 時代のデザインリファレンスになり得る）。

## デザインフローの変化

**従来**

```
空白キャンバス → ピクセル設計 → 実装に落とす → ズレ・「実装不可能」
```

**Registry + 生成 AI**

```
公認 block のカタログ → compose / 部分カスタム → プロダクト registry に還元 → 公認
```

生成 AI は **0→1 のデザインエンジン** ではなく、**公認済み部品空間内の探索を自然言語で行うインターフェース** として使う。

## ロールの再定義（AI 時代）

| ロール | 担当 |
|---|---|
| **誰でも**（営業 / CS / コンサル含む） | 公認 block を指定して compose・局所カスタムを AI に依頼 |
| **エンジニア / PdM** | 未公認の試作を registry に登録し、AI で叩き台を作る |
| **デザイナー** | 憲法（トークン・primitive）、公認、**AI が触っていい境界** の定義 |
| **生成 AI** | カタログ外の hallucinate を避け、参照付きの変形・配置 |

「誰でも UI デザイン」≠「誰でも憲法を書き換え」。AI の出力がプロダクト registry に載るか、公認を通るかは別ゲート（→ [06-governance.md](./06-governance.md)）。

## OOUI との関係

compose / カスタムの議論を **オブジェクトとプロパティ** の語彙に落とすには OOUI が必要（→ [04-ooui.md](./04-ooui.md)）。AI にスキーマのない「モダンな EC UI」と指示すると存在しない props を hallucinate しやすいが、fragment 付き block を参照すればデータ契約の幻覚も抑えられる。

## granularity ごとの AI 編集境界（目安）

| 粒度 | AI に任せやすいこと | 人・公認が要ること |
|---|---|---|
| **primitive** | variant・トークン差し替え、配置 | 憲法（プロダクト registry）からの逸脱 |
| **model-view** | 公認 block の組み合わせ、スタイルの局所調整 | fragment 契約を壊す変更、プロパティ追加の要否判断 |
| **template** | 断片の並べ替え、コピー | 画面全体の IA・新規 block の追加 |

model-view 以上で **fragment を書き換えるカスタム** は、エンジニア清書・公認フローに回す（→ [08-stakeholder-workflow.md](./08-stakeholder-workflow.md)）。

## 張り合い

### copy-in と公認のドリフト

AI が参考にした block をアプリ repo に直書き fork すると、公認と乖離する。変更は **プロダクト registry 経由 → 公認 → 再 add** が望ましい（→ [10-open-questions.md](./10-open-questions.md)）。

### 清書ボトルネック

提案が増えるとデザイナーのレビューキューが詰まる。清書を「全ピクセル」ではなく **公認チェックリスト + AI が compose した差分レビュー** に寄せる。

## 次に読む

- [08-stakeholder-workflow.md](./08-stakeholder-workflow.md) — 顧客接点チームを含む基本フロー
- [04-ooui.md](./04-ooui.md) — 実装・API との共通言語
- [06-governance.md](./06-governance.md) — 公認ゲート
