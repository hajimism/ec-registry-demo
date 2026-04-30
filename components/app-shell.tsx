"use client"

import * as React from "react"
import { SearchCommand } from "@/components/search-command"
import { Sidebar } from "@/components/sidebar"
import type { RegistryItemWithMeta } from "@/lib/registry-catalog"

type AppShellProps = {
  items: RegistryItemWithMeta[]
  children: React.ReactNode
}

export function AppShell({ items, children }: AppShellProps) {
  const [searchOpen, setSearchOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const objectCounts = new Map<string, number>()
  const primitives: { name: string; title: string }[] = []

  for (const item of items) {
    if (item.shopify?.granularity === "primitive") {
      primitives.push({ name: item.name, title: item.title })
      continue
    }
    for (const obj of item.objects) {
      objectCounts.set(obj, (objectCounts.get(obj) ?? 0) + 1)
    }
  }

  const categories = [...objectCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({ label, slug: label, count }))

  return (
    <div className="flex min-h-svh">
      <Sidebar
        categories={categories}
        primitives={primitives}
        onSearchClick={() => setSearchOpen(true)}
      />
      <main className="min-w-0 flex-1 pl-[220px] lg:pl-[240px]">
        {children}
      </main>
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}
