import type { CartItem, Product } from "@/lib/types/ec"

/** プレビュー用（カタログ質感に合わせた写真 URL） */
const q = "auto=format&fit=crop&w=900&q=82"

export const demoProducts: Product[] = [
  {
    id: "1",
    name: "オーガニックコットン クルーネックTシャツ",
    price: 3900,
    originalPrice: 5200,
    image: `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?${q}`,
    rating: 4.5,
    reviewCount: 128,
    category: "トップス",
    inStock: true,
    description:
      "厳選されたオーガニックコットン100%使用。肌触りが良く、通気性に優れたクルーネックTシャツ。",
    tags: ["オーガニック", "定番", "春夏"],
  },
  {
    id: "2",
    name: "ストレッチスリムデニム",
    price: 7800,
    image: `https://images.unsplash.com/photo-1542272604-787c3835535d?${q}`,
    rating: 4.2,
    reviewCount: 89,
    category: "ボトムス",
    inStock: true,
    description: "2%のストレッチ素材を混紡した快適な履き心地のスリムデニム。",
    tags: ["ストレッチ", "定番"],
  },
  {
    id: "3",
    name: "レザーミニマリストウォレット",
    price: 12000,
    originalPrice: 15000,
    image: `https://images.unsplash.com/photo-1627123424574-724758594e93?${q}`,
    rating: 4.8,
    reviewCount: 256,
    category: "アクセサリー",
    inStock: true,
    description:
      "上質なイタリアンレザーを使用したミニマルデザインの二つ折り財布。",
    tags: ["レザー", "ギフト"],
  },
  {
    id: "4",
    name: "撥水マウンテンパーカー",
    price: 18500,
    image: `https://images.unsplash.com/photo-1551028719-00167b16eac5?${q}`,
    rating: 4.6,
    reviewCount: 67,
    category: "アウター",
    inStock: false,
  },
  {
    id: "5",
    name: "メリノウールニットキャップ",
    price: 4200,
    image: `https://images.unsplash.com/photo-1576871337622-fb70a02ef673?${q}`,
    rating: 4.3,
    reviewCount: 42,
    category: "アクセサリー",
    inStock: true,
    tags: ["ウール", "秋冬"],
  },
  {
    id: "6",
    name: "リネンオーバーサイズシャツ",
    price: 6500,
    originalPrice: 8000,
    image: `https://images.unsplash.com/photo-1598033129183-c4f50daf36a8?${q}`,
    rating: 4.1,
    reviewCount: 93,
    category: "トップス",
    inStock: true,
    tags: ["リネン", "春夏"],
  },
]

export const demoCartItems: CartItem[] = [
  {
    id: "c1",
    product: demoProducts[0],
    quantity: 2,
    subtotal: demoProducts[0].price * 2,
  },
  {
    id: "c2",
    product: demoProducts[2],
    quantity: 1,
    subtotal: demoProducts[2].price,
  },
]

export const demoProductsPreviewGrid = demoProducts.slice(0, 3)
