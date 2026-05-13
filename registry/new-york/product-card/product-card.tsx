"use client"

import { ShoppingCart } from "lucide-react"
import type * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { ProductCardFragment } from "@/generated/storefront.generated"

function formatMoney(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
  }).format(Number(amount))
}

export const ProductCard: React.FC<{ product: ProductCardFragment }> = ({
  product,
}) => {
  const price = product.priceRange.minVariantPrice
  const compareAt = product.compareAtPriceRange.minVariantPrice
  const hasDiscount =
    Number(compareAt.amount) > 0 &&
    Number(compareAt.amount) > Number(price.amount)
  const discount = hasDiscount
    ? Math.round((1 - Number(price.amount) / Number(compareAt.amount)) * 100)
    : null

  return (
    <Card className="group gap-0 overflow-hidden rounded-2xl border border-border/60 bg-card/80 py-0 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/3 transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] dark:ring-white/6 dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      <div className="relative aspect-4/5 overflow-hidden bg-linear-to-b from-muted/50 to-muted">
        {product.featuredImage && (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            width={product.featuredImage.width ?? undefined}
            height={product.featuredImage.height ?? undefined}
            className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/3 to-transparent" />
        {discount != null && (
          <span className="absolute right-3 top-3 rounded-full bg-foreground/88 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-background backdrop-blur-sm dark:bg-background/88 dark:text-foreground">
            −{discount}%
          </span>
        )}
        {!product.availableForSale && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/65 backdrop-blur-[2px]">
            <span className="rounded-full bg-foreground/90 px-4 py-1.5 text-[12px] font-medium tracking-wide text-background">
              品切れ
            </span>
          </div>
        )}
      </div>

      <CardContent className="space-y-3 p-4 pt-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {product.vendor}
          </p>
          <h3 className="mt-1.5 line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight text-foreground">
            {product.title}
          </h3>
        </div>

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-lg font-semibold tabular-nums tracking-tight">
            {formatMoney(price.amount, price.currencyCode)}
          </span>
          {hasDiscount && (
            <span className="text-[13px] text-muted-foreground line-through tabular-nums">
              {formatMoney(compareAt.amount, compareAt.currencyCode)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="h-10 w-full rounded-full text-[13px] font-medium shadow-none transition-[opacity,box-shadow] disabled:opacity-40"
          size="sm"
          disabled={!product.availableForSale}
        >
          <ShoppingCart
            className="mr-2 h-4 w-4 opacity-70"
            strokeWidth={1.75}
          />
          カートに追加
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard
