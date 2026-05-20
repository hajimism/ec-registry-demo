# 見た目の憲法：プロダクト registry

[← 目次](./README.md)

## 1 プロダクト = 1 レジストリ

複数の外部 registry から pick しても、**最終的な見た目の憲法はプロダクト専用の 1 レジストリ**が握る。

```
[外部 registry]  pick
       ↓ トーン調整・トークン差し替え
[プロダクト registry]  ← 憲法
       ↓ shadcn add
[アプリ repo]
```

## プロダクト registry が握るもの

- デザイントークン（色・タイポ・半径・spacing）
- primitive のバリアント定義
- 公認済み model-view / template（→ [06-governance.md](./06-governance.md)）

## 中心ループ

**pick → プロダクトのトーンに合わせて編集 → プロダクト registry に再登録 → プロダクトで利用**

従来 DS の「Figma 更新 → 全社反映」とは逆で、**憲法の更新 = プロダクト registry の publish** になり、採用側は再度 pick/add するか、既に copy 済みのコードはマージ判断になる。

## 業界横断 registry（例: ec-registry）の位置づけ

- **上流**：pick の素材庫（Shopify EC 向け model-view / template など）
- primitive は shadcn 公式など汎用 registry に任せ、ドメイン特化ブロックを提供する二層もあり得る
- プロダクト registry がトーンを当てて再登録し、**そのプロダクトの公式カタログ**に取り込む

## 次に読む

- [06-governance.md](./06-governance.md) — 公認 block の品質ゲート
- [07-ai-enablement.md](./07-ai-enablement.md) — 憲法内での AI compose
- [10-open-questions.md](./10-open-questions.md) — copy-in と憲法の張り合い
