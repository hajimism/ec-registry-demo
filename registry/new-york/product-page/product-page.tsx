"use client"

import type * as React from "react"
import { CartSummary } from "@/components/ec/cart-summary"
import { ProductDetail } from "@/components/ec/product-detail"
import { ProductGrid } from "@/components/ec/product-grid"
import { Separator } from "@/components/ui/separator"
import type {
  CartSummaryFragment,
  ProductCardFragment,
  ProductDetailFragment,
} from "@/generated/storefront.generated"

export const ProductPage: React.FC<{
  product: ProductDetailFragment
  relatedProducts: ProductCardFragment[]
  cart: CartSummaryFragment
  onQuantityChange?: (lineId: string, quantity: number) => void
  onRemove?: (lineId: string) => void
}> = ({ product, relatedProducts, cart, onQuantityChange, onRemove }) => (
  <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
    <div className="min-w-0 space-y-12">
      <ProductDetail product={product} />

      {relatedProducts.length > 0 && (
        <>
          <Separator className="bg-border/60" />
          <section>
            <h2 className="mb-6 text-lg font-semibold tracking-tight">
              関連商品
            </h2>
            <ProductGrid products={relatedProducts} />
          </section>
        </>
      )}
    </div>

    <aside className="lg:sticky lg:top-6 lg:self-start">
      <CartSummary
        cart={cart}
        onQuantityChange={onQuantityChange}
        onRemove={onRemove}
      />
    </aside>
  </div>
)

export default ProductPage
