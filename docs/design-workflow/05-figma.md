# Figma の位置づけ

[← 目次](./README.md)

## 前提

**デザインマスタとしての Figma は不要**という前提に立つ。

| 従来 | Registry 前提 |
|---|---|
| Figma が全コンポーネントのマスター | プロダクト registry がマスター |
| State 別 UI は Figma バリアントで確認 | **実装の scenarios で確認**した方が網羅的 |
| ライブラリ更新で全画面が追従 | copy-in モデル（add 後はプロジェクト所有） |

## 残る役割：プレイグラウンド

Figma に残る価値は **デザインアイデアを試す場** に限定される：

- レイアウト案・トーン・雰囲気の探索
- ステークホルダーへの「だいたいこういう感じ」の共有

採用された案はプロダクト registry に落とし、維持・配布・状態の正は registry 側が担う。

## 次に読む

- [03-product-registry.md](./03-product-registry.md) — 採用案の行き先
- [07-ai-enablement.md](./07-ai-enablement.md) — 探索後の compose / AI 利用
- [08-stakeholder-workflow.md](./08-stakeholder-workflow.md) — 顧客接点での提案フロー
