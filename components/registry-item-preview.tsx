"use client"

import { CartSummary } from "@/registry/new-york/cart-summary/cart-summary"
import { defaultCart } from "@/registry/new-york/cart-summary/fixtures/default"
import { defaultProduct } from "@/registry/new-york/product-card/fixtures/default"
import { ProductCard } from "@/registry/new-york/product-card/product-card"
import { defaultProductDetail } from "@/registry/new-york/product-detail/fixtures/default"
import { ProductDetail } from "@/registry/new-york/product-detail/product-detail"
import { gridProducts } from "@/registry/new-york/product-grid/fixtures/products"
import { ProductGrid } from "@/registry/new-york/product-grid/product-grid"

export function RegistryItemPreview({ name }: { name: string }) {
  switch (name) {
    case "product-card":
      return (
        <div className="mx-auto w-full max-w-[220px]">
          <ProductCard product={defaultProduct} />
        </div>
      )
    case "product-detail":
      return (
        <div className="min-w-0">
          <ProductDetail product={defaultProductDetail} />
        </div>
      )
    case "product-grid":
      return (
        <div className="min-w-0 text-[13px]">
          <ProductGrid products={gridProducts} />
        </div>
      )
    case "cart-summary":
      return (
        <div className="mx-auto w-full max-w-sm text-[13px]">
          <CartSummary cart={defaultCart} />
        </div>
      )
    default:
      return (
        <p className="py-8 text-center text-xs text-muted-foreground">
          プレビュー未設定（item 名: {name}）
        </p>
      )
  }
}
