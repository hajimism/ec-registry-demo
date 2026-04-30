// ============================================
// EC Domain Objects
// OOUIの「Object」に相当する型定義群
// ============================================

export type Product = {
  id: string
  name: string
  price: number
  originalPrice?: number // 割引前価格（あれば）
  image: string
  rating: number // 0〜5
  reviewCount: number
  category: string
  inStock: boolean
  description?: string
  tags?: string[]
}

export type CartItem = {
  id: string
  product: Product // コンポジション：ProductをネストしたObject
  quantity: number
  subtotal: number
}

export type Order = {
  id: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: string
  customer: {
    name: string
    email: string
  }
}
