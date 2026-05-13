"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { CartSummary } from "@/registry/new-york/cart-summary/cart-summary"
import { scenarios as cartSummaryScenarios } from "@/registry/new-york/cart-summary/cart-summary.demo"
import { ProductCard } from "@/registry/new-york/product-card/product-card"
import { scenarios as productCardScenarios } from "@/registry/new-york/product-card/product-card.demo"
import { ProductDetail } from "@/registry/new-york/product-detail/product-detail"
import { scenarios as productDetailScenarios } from "@/registry/new-york/product-detail/product-detail.demo"
import { ProductGrid } from "@/registry/new-york/product-grid/product-grid"
import { scenarios as productGridScenarios } from "@/registry/new-york/product-grid/product-grid.demo"
import { ProductPage } from "@/registry/new-york/product-page/product-page"
import { scenarios as productPageScenarios } from "@/registry/new-york/product-page/product-page.demo"
import { Button } from "@/registry/new-york/ui/button"

const SCENARIO_BLOCKS = new Set([
  "product-card",
  "product-detail",
  "product-grid",
  "cart-summary",
  "product-page",
])

export function hasScenarioExamples(name: string) {
  return SCENARIO_BLOCKS.has(name)
}

export function RegistryItemScenarioPreview({ name }: { name: string }) {
  switch (name) {
    case "product-card":
      return (
        <ScenarioShell
          scenarios={productCardScenarios}
          render={(p) => <ProductCard {...p} />}
        />
      )
    case "product-detail":
      return (
        <ScenarioShell
          scenarios={productDetailScenarios}
          render={(p) => <ProductDetail {...p} />}
        />
      )
    case "product-grid":
      return (
        <ScenarioShell
          scenarios={productGridScenarios}
          render={(p) => <ProductGrid {...p} />}
        />
      )
    case "cart-summary":
      return (
        <ScenarioShell
          scenarios={cartSummaryScenarios}
          render={(p) => <CartSummary {...p} />}
        />
      )
    case "product-page":
      return (
        <ScenarioShell
          scenarios={productPageScenarios}
          render={(p) => <ProductPage {...p} />}
        />
      )
    default:
      return null
  }
}

type ScenarioEntry<P> = { label: string; props: P }

function ScenarioShell<P>({
  scenarios,
  render,
}: {
  scenarios: Record<string, ScenarioEntry<P>>
  render: (props: P) => React.ReactNode
}) {
  const keys = Object.keys(scenarios) as (keyof typeof scenarios)[]
  const [active, setActive] = React.useState<string>(keys[0] as string)
  const current = scenarios[active as keyof typeof scenarios]

  return (
    <div className="space-y-3">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Scenarios"
      >
        {keys.map((key) => (
          <Button
            key={String(key)}
            type="button"
            size="sm"
            variant={active === String(key) ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setActive(String(key))}
            role="tab"
            aria-selected={active === String(key)}
          >
            {scenarios[key].label}
          </Button>
        ))}
      </div>
      <div
        className={cn(
          "min-h-0 overflow-auto rounded-lg border border-border/50 bg-muted/35 p-3 ring-1 ring-black/[0.03] md:p-4 [scrollbar-width:thin] dark:bg-muted/20 dark:ring-white/[0.06]",
        )}
      >
        {current ? render(current.props) : null}
      </div>
    </div>
  )
}
