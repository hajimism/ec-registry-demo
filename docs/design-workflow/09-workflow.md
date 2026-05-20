# ワークフロー

[← 目次](./README.md)

## 全体像

Registry 前提のデザインには、**顧客接点での提案** と **社内での採用・リリース** の二層がある。

```
[顧客接点]  営業 / CS / コンサル ──プロト提案──┐
                                              ▼
[社内]      デザイナー清書 → 公認 → エンジニア registry 還元・リリース
```

顧客接点フローの詳細は [08-stakeholder-workflow.md](./08-stakeholder-workflow.md)。生成 AI の使い方は [07-ai-enablement.md](./07-ai-enablement.md)。

---

## 社内フロー：発見から還元

エンジニア・PdM・デザイナー向けの標準ループ：

```
[発見]   registry サイト / 検索で block を探す
[評価]   scenarios + fixtures で状態を確認
[採用]   shadcn add → アプリに copy
[調整]   primitive はプロダクト registry、model-view は fragment 契約を維持したままスタイル差し替え
[還元]   良い調整をプロダクト registry に block として再登録 → 公認レビュー
```

提案時・調整時のデータの語彙は OOUI に従う（→ [04-ooui.md](./04-ooui.md)）。

---

## 役割分担（一覧）

| 役割 | 主な担当 |
|---|---|
| **営業 / CS / コンサル** | 顧客向けプロトタイプ（公認 block + AI）、既存プロパティ / プロパティ追加の仮説 |
| **デザイナー** | 清書、トークン / primitive、公認基準、レビューキュー、Figma プレイグラウンド |
| **エンジニア** | block 実装、fragment、API 整合、registry への登録 PR、リリース |
| **PdM** | 公認 block を仕様の選択肢として利用 |
| **生成 AI** | compose・bounded カスタム（カタログ外の生成は避ける） |

---

## 関連トピック

- [08-stakeholder-workflow.md](./08-stakeholder-workflow.md) — 顧客接点 → 清書 → リリース
- [03-product-registry.md](./03-product-registry.md) — pick → 編集 → 再登録の憲法
- [06-governance.md](./06-governance.md) — 公認ゲート
- [05-figma.md](./05-figma.md) — 発見前の探索（プレイグラウンド）
