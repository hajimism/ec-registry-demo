"use client"

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import type * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { CartSummaryFragment } from "@/generated/storefront.generated"

function formatMoney(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
  }).format(Number(amount))
}

export const CartSummary: React.FC<{
  cart: CartSummaryFragment
  onQuantityChange?: (lineId: string, quantity: number) => void
  onRemove?: (lineId: string) => void
}> = ({ cart, onQuantityChange, onRemove }) => {
  const lines = cart.lines.nodes

  return (
    <Card className="overflow-hidden rounded-2xl border-border/60 bg-card/80 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/3 dark:ring-white/6">
      <CardHeader className="space-y-1 border-b border-border/45 bg-muted/20 px-5 py-4 dark:bg-muted/10">
        <CardTitle className="flex items-baseline gap-2 text-[17px] font-semibold tracking-tight">
          <ShoppingBag
            className="h-5 w-5 text-muted-foreground"
            strokeWidth={1.6}
          />
          バッグ
          <span className="text-[13px] font-normal tabular-nums text-muted-foreground">
            {cart.totalQuantity} 点
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-0 px-0 pt-2">
        {lines.map((line, index) => {
          const merch = line.merchandise
          return (
            <div key={line.id}>
              {index > 0 && <Separator className="my-1 bg-border/50" />}
              <div className="flex gap-4 px-5 py-4">
                {merch.image && (
                  <div className="h-18 w-18 shrink-0 overflow-hidden rounded-xl bg-muted/60 ring-1 ring-black/4 dark:ring-white/6">
                    <img
                      src={merch.image.url}
                      alt={merch.image.altText ?? merch.product.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                  <div>
                    <p className="text-[14px] font-medium leading-snug tracking-tight">
                      {merch.product.title}
                    </p>
                    {merch.title !== "Default Title" && (
                      <p className="mt-0.5 text-[12px] text-muted-foreground">
                        {merch.title}
                      </p>
                    )}
                    <p className="mt-1 text-[12px] tabular-nums text-muted-foreground">
                      {formatMoney(
                        merch.price.amount,
                        merch.price.currencyCode,
                      )}{" "}
                      × {line.quantity}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center rounded-full bg-muted/50 p-0.5 ring-1 ring-border/40 dark:bg-muted/25">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() =>
                          onQuantityChange?.(
                            line.id,
                            Math.max(1, line.quantity - 1),
                          )
                        }
                      >
                        <Minus className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </Button>
                      <span className="w-8 text-center text-[13px] font-medium tabular-nums">
                        {line.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() =>
                          onQuantityChange?.(line.id, line.quantity + 1)
                        }
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold tabular-nums">
                        {formatMoney(
                          line.cost.totalAmount.amount,
                          line.cost.totalAmount.currencyCode,
                        )}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => onRemove?.(line.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {lines.length === 0 && (
          <p className="px-5 py-12 text-center text-[14px] text-muted-foreground">
            バッグに商品がありません
          </p>
        )}
      </CardContent>

      {lines.length > 0 && (
        <>
          <Separator className="bg-border/50" />
          <CardFooter className="flex flex-col gap-4 bg-muted/10 px-5 py-5 dark:bg-muted/5">
            <div className="flex w-full items-baseline justify-between">
              <span className="text-[14px] text-muted-foreground">小計</span>
              <span className="text-xl font-semibold tabular-nums tracking-tight">
                {formatMoney(
                  cart.cost.subtotalAmount.amount,
                  cart.cost.subtotalAmount.currencyCode,
                )}
              </span>
            </div>
            <Button className="h-11 w-full rounded-full text-[15px] font-medium shadow-none">
              レジに進む
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export default CartSummary
