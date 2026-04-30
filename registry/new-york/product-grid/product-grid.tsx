"use client"

import { Search } from "lucide-react"
import type * as React from "react"
import { useMemo, useState } from "react"
import { ProductCard } from "@/components/ec/product-card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ProductCardFragment } from "@/generated/storefront.generated"

type SortKey = "price-asc" | "price-desc" | "title" | "newest"

export const ProductGrid: React.FC<{
  products: ProductCardFragment[]
  vendors?: string[]
}> = ({ products, vendors }) => {
  const [search, setSearch] = useState("")
  const [selectedVendor, setSelectedVendor] = useState<string>("all")
  const [sort, setSort] = useState<SortKey>("newest")

  const allVendors = useMemo(
    () => vendors ?? [...new Set(products.map((p) => p.vendor))],
    [products, vendors],
  )

  const filtered = useMemo(() => {
    let result = products

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.vendor.toLowerCase().includes(q),
      )
    }

    if (selectedVendor !== "all") {
      result = result.filter((p) => p.vendor === selectedVendor)
    }

    const getPrice = (p: ProductCardFragment) =>
      Number(p.priceRange.minVariantPrice.amount)

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => getPrice(a) - getPrice(b))
        break
      case "price-desc":
        result = [...result].sort((a, b) => getPrice(b) - getPrice(a))
        break
      case "title":
        result = [...result].sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    return result
  }, [products, search, selectedVendor, sort])

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border/50 bg-muted/25 p-4 ring-1 ring-black/2 dark:bg-muted/15 dark:ring-white/4 md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="relative min-w-0 flex-1 lg:max-w-xs">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-muted-foreground/70"
              strokeWidth={1.75}
            />
            <Input
              placeholder="検索"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 rounded-full border-0 bg-background/90 pl-10 pr-4 text-[14px] shadow-none ring-1 ring-border/60 focus-visible:ring-2 focus-visible:ring-foreground/12 dark:bg-background/50"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Select value={selectedVendor} onValueChange={setSelectedVendor}>
              <SelectTrigger className="h-11 w-full rounded-full border-0 bg-background/90 text-[13px] ring-1 ring-border/60 sm:w-[168px] dark:bg-background/50">
                <SelectValue placeholder="ブランド" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべてのブランド</SelectItem>
                {allVendors.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="h-11 w-full rounded-full border-0 bg-background/90 text-[13px] ring-1 ring-border/60 sm:w-[168px] dark:bg-background/50">
                <SelectValue placeholder="並び順" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">新着順</SelectItem>
                <SelectItem value="price-asc">価格 · 低い順</SelectItem>
                <SelectItem value="price-desc">価格 · 高い順</SelectItem>
                <SelectItem value="title">名前順</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border/40 pt-4 text-[13px] text-muted-foreground">
          <span className="tabular-nums text-foreground/90">
            {filtered.length}
            <span className="font-normal text-muted-foreground"> 件</span>
          </span>
          {selectedVendor !== "all" && (
            <>
              <span className="text-border" aria-hidden>
                ·
              </span>
              <span className="rounded-full bg-background/80 px-2.5 py-0.5 text-[12px] text-foreground/80 ring-1 ring-border/50 dark:bg-background/40">
                {selectedVendor}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="rounded-2xl border border-dashed border-border/60 py-14 text-center text-[14px] text-muted-foreground">
          条件に一致する商品がありません
        </p>
      )}
    </div>
  )
}

export default ProductGrid
