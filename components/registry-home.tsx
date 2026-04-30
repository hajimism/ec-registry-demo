"use client"

import NextLink from "next/link"
import { RegistryItemPreview } from "@/components/registry-item-preview"
import type { RegistryItemWithMeta } from "@/lib/registry-catalog"
import { getRegistryItemIcon } from "@/lib/registry-visuals"

type RegistryHomeProps = {
  items: RegistryItemWithMeta[]
}

function groupByObject(items: RegistryItemWithMeta[]) {
  const groups = new Map<string, RegistryItemWithMeta[]>()
  for (const item of items) {
    for (const obj of item.objects) {
      const list = groups.get(obj) ?? []
      if (!list.some((i) => i.name === item.name)) {
        list.push(item)
      }
      groups.set(obj, list)
    }
  }
  return groups
}

export function RegistryHome({ items }: RegistryHomeProps) {
  const groups = groupByObject(items)

  return (
    <div className="px-6 pb-20 pt-8 md:px-10 lg:px-12">
      <header className="mb-10">
        <h1 className="text-[22px] font-semibold tracking-tight">Components</h1>
      </header>

      <div className="space-y-12">
        {[...groups.entries()].map(([object, groupItems]) => (
          <section key={object}>
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-[15px] font-semibold tracking-tight">
                {object}
              </h2>
              <span className="text-[13px] text-muted-foreground">
                {groupItems.length} 件
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {groupItems.map((item) => (
                <ComponentCard key={item.name} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {items.length === 0 && (
        <p className="py-20 text-center text-[15px] text-muted-foreground">
          コンポーネントがありません。
        </p>
      )}
    </div>
  )
}

function ComponentCard({ item }: { item: RegistryItemWithMeta }) {
  const Icon = getRegistryItemIcon(item.name)

  return (
    <NextLink
      href={`/registry/${item.name}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md"
    >
      <div className="relative h-[200px] overflow-hidden border-b border-border/40 bg-muted/20">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-3">
          <div
            className="origin-center **:pointer-events-none"
            style={{
              transform: "scale(0.55)",
              width: "180%",
              maxHeight: "180%",
            }}
          >
            <RegistryItemPreview name={item.name} />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 px-4 py-3">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted/80 text-muted-foreground ring-1 ring-border/40"
          aria-hidden
        >
          <Icon className="h-3.5 w-3.5 stroke-[1.5]" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-[14px] font-medium leading-tight tracking-tight">
            {item.title}
          </p>
          <p className="mt-0.5 truncate text-[12px] text-muted-foreground">
            {item.shopify?.view ?? "block"}
          </p>
        </div>
      </div>
    </NextLink>
  )
}
