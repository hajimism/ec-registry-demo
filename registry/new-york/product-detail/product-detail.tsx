"use client"

import { Heart, ShoppingCart, Truck } from "lucide-react"
import type * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { ProductDetailFragment } from "@/generated/storefront.generated"

function formatMoney(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
  }).format(Number(amount))
}

export const ProductDetail: React.FC<{
  product: ProductDetailFragment
}> = ({ product }) => {
  const price = product.priceRange.minVariantPrice
  const compareAt = product.compareAtPriceRange.minVariantPrice
  const hasDiscount =
    Number(compareAt.amount) > 0 &&
    Number(compareAt.amount) > Number(price.amount)
  const discount = hasDiscount
    ? Math.round((1 - Number(price.amount) / Number(compareAt.amount)) * 100)
    : null

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-14">
      <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-muted/50 ring-1 ring-black/4 dark:ring-white/8">
        {product.featuredImage && (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            className="h-full w-full object-cover"
          />
        )}
        {discount != null && (
          <span className="absolute left-4 top-4 rounded-full bg-foreground/88 px-3 py-1.5 text-[12px] font-semibold tracking-wide text-background backdrop-blur-sm dark:bg-background/90 dark:text-foreground">
            −{discount}%
          </span>
        )}
      </div>

      <div className="flex flex-col gap-6 md:justify-center md:py-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {product.vendor}
          </p>
          <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight md:text-[1.75rem]">
            {product.title}
          </h1>
        </div>

        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-3xl font-semibold tabular-nums tracking-tight md:text-[2rem]">
            {formatMoney(price.amount, price.currencyCode)}
          </span>
          {hasDiscount && (
            <span className="text-lg text-muted-foreground line-through tabular-nums">
              {formatMoney(compareAt.amount, compareAt.currencyCode)}
            </span>
          )}
        </div>

        <Separator className="bg-border/60" />

        {product.descriptionHtml && (
          <div
            className="prose prose-sm text-muted-foreground"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML from Shopify Storefront API
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        )}

        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="rounded-full border-0 bg-muted/80 px-3 py-1 text-[12px] font-normal text-foreground/85"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-start gap-3 rounded-2xl bg-muted/40 px-4 py-3.5 text-[14px] leading-snug text-muted-foreground ring-1 ring-border/40">
          <Truck
            className="mt-0.5 h-4 w-4 shrink-0 text-foreground/50"
            strokeWidth={1.75}
          />
          {product.availableForSale ? (
            <span className="text-foreground/80">
              在庫あり。
              <span className="text-muted-foreground">
                通常 1〜2 営業日で発送。
              </span>
            </span>
          ) : (
            <span>現在オンラインストアでは取り扱っておりません。</span>
          )}
        </div>

        <Separator className="bg-border/60" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            className="h-12 flex-1 rounded-full text-[15px] font-medium shadow-none sm:min-w-[200px]"
            size="lg"
            disabled={!product.availableForSale}
          >
            <ShoppingCart
              className="mr-2 h-5 w-5 opacity-80"
              strokeWidth={1.75}
            />
            カートに追加
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 w-full rounded-full border-border/80 sm:w-12 sm:px-0"
          >
            <Heart className="h-5 w-5" strokeWidth={1.75} />
            <span className="sr-only">お気に入り</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
