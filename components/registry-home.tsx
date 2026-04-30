"use client"

import { X } from "lucide-react"
import NextLink from "next/link"
import { useMemo, useState } from "react"
import { RegistryItemPreview } from "@/components/registry-item-preview"
import type { RegistryItemWithMeta } from "@/lib/registry-catalog"
import { getRegistryItemIcon } from "@/lib/registry-visuals"
import { cn } from "@/lib/utils"

type RegistryHomeProps = {
  items: RegistryItemWithMeta[]
}

type Filters = {
  view: string | null
  action: string | null
}

const EMPTY_FILTERS: Filters = { view: null, action: null }

function collectFacets(items: RegistryItemWithMeta[]) {
  const views = new Set<string>()
  const actions = new Set<string>()

  for (const item of items) {
    const s = item.shopify
    if (!s) continue
    if (s.view) views.add(s.view)
    for (const a of s.actions ?? []) actions.add(a)
  }

  return {
    views: [...views].sort(),
    actions: [...actions].sort(),
  }
}

function applyFilters(items: RegistryItemWithMeta[], filters: Filters) {
  return items.filter((item) => {
    const s = item.shopify
    if (!s) return false
    if (filters.view && s.view !== filters.view) return false
    if (filters.action && !(s.actions ?? []).includes(filters.action))
      return false
    return true
  })
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
  const nonPrimitive = useMemo(
    () => items.filter((i) => i.shopify?.granularity !== "primitive"),
    [items],
  )
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS)
  const facets = useMemo(() => collectFacets(nonPrimitive), [nonPrimitive])
  const filtered = useMemo(
    () => applyFilters(nonPrimitive, filters),
    [nonPrimitive, filters],
  )
  const templates = useMemo(
    () => filtered.filter((i) => i.shopify?.granularity === "template"),
    [filtered],
  )
  const modelViews = useMemo(
    () => filtered.filter((i) => i.shopify?.granularity !== "template"),
    [filtered],
  )
  const groups = useMemo(() => groupByObject(modelViews), [modelViews])
  const hasActiveFilter = Object.values(filters).some(Boolean)

  const toggle = (key: keyof Filters, value: string) =>
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }))

  return (
    <div className="px-6 pb-20 pt-8 md:px-10 lg:px-12">
      <header className="mb-8">
        <h1 className="text-[22px] font-semibold tracking-tight">Components</h1>
      </header>

      <div className="mb-8 space-y-3 rounded-2xl border border-border/50 bg-muted/20 p-4 ring-1 ring-black/2 dark:bg-muted/10 dark:ring-white/4">
        <FilterRow label="View">
          {facets.views.map((v) => (
            <FilterChip
              key={v}
              active={filters.view === v}
              onClick={() => toggle("view", v)}
            >
              {v}
            </FilterChip>
          ))}
        </FilterRow>

        <FilterRow label="Action">
          {facets.actions.map((a) => (
            <FilterChip
              key={a}
              active={filters.action === a}
              onClick={() => toggle("action", a)}
            >
              {a}
            </FilterChip>
          ))}
        </FilterRow>

        {hasActiveFilter && (
          <button
            type="button"
            onClick={() => setFilters(EMPTY_FILTERS)}
            className="inline-flex items-center gap-1 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-3 w-3" />
            フィルターをクリア
          </button>
        )}
      </div>

      <div className="space-y-12">
        {[...groups.entries()].map(([object, groupItems]) => (
          <section key={object} id={object} className="scroll-mt-8">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-[17px] font-semibold tracking-tight">
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

        {templates.length > 0 && (
          <section id="Templates" className="scroll-mt-8">
            <div className="mb-4 flex items-baseline justify-between">
              <h2 className="text-[17px] font-semibold tracking-tight">
                Templates
              </h2>
              <span className="text-[13px] text-muted-foreground">
                {templates.length} 件
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {templates.map((item) => (
                <ComponentCard key={item.name} item={item} />
              ))}
            </div>
          </section>
        )}
      </div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-[15px] text-muted-foreground">
          {hasActiveFilter
            ? "条件に一致するコンポーネントがありません。"
            : "コンポーネントがありません。"}
        </p>
      )}
    </div>
  )
}

function FilterRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-20 shrink-0 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-2.5 py-1 text-[12px] font-medium transition-colors",
        active
          ? "bg-foreground text-background"
          : "bg-background/80 text-muted-foreground ring-1 ring-border/50 hover:bg-muted hover:text-foreground dark:bg-background/40",
      )}
    >
      {children}
    </button>
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
