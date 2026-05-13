"use client"

import { PanelLeft } from "lucide-react"
import { usePathname } from "next/navigation"
import * as React from "react"
import { SearchCommand } from "@/components/search-command"
import { Sidebar } from "@/components/sidebar"
import type { RegistryItemWithMeta } from "@/lib/registry-catalog"
import { cn } from "@/lib/utils"

type AppShellProps = {
  items: RegistryItemWithMeta[]
  children: React.ReactNode
}

function isRegistryDetailPath(pathname: string | null) {
  if (!pathname) return false
  return /^\/registry\/[^/]+$/.test(pathname)
}

export function AppShell({ items, children }: AppShellProps) {
  const pathname = usePathname()
  const onRegistryDetail = isRegistryDetailPath(pathname)
  const [sidebarOpen, setSidebarOpen] = React.useState(!onRegistryDetail)

  React.useEffect(() => {
    setSidebarOpen(!isRegistryDetailPath(pathname))
  }, [pathname])

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

  const sidebarHidden = onRegistryDetail && !sidebarOpen

  return (
    <div className="flex min-h-svh items-start">
      {onRegistryDetail && sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-black/35 backdrop-blur-[1px] dark:bg-black/50"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar
        categories={categories}
        primitives={primitives}
        onSearchClick={() => setSearchOpen(true)}
        dismissible={onRegistryDetail}
        onDismiss={() => setSidebarOpen(false)}
        className={cn(
          onRegistryDetail && "transition-transform duration-200 ease-out",
          sidebarHidden && "-translate-x-full pointer-events-none",
          onRegistryDetail && sidebarOpen && "z-40 shadow-xl",
        )}
      />
      <main
        className={cn(
          "min-w-0 flex-1 transition-[padding] duration-200 ease-out",
          sidebarHidden ? "pl-0" : "pl-[220px] lg:pl-[240px]",
        )}
      >
        {children}
      </main>
      {sidebarHidden && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-5 left-4 z-40 flex h-10 items-center gap-2 rounded-full border border-border/60 bg-background/95 px-3.5 text-[12px] font-medium text-foreground shadow-md ring-1 ring-black/5 backdrop-blur-sm transition-colors hover:bg-muted dark:ring-white/10"
          aria-label="Open sidebar"
        >
          <PanelLeft className="h-4 w-4 shrink-0" strokeWidth={2} />
          Menu
        </button>
      )}
      <SearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  )
}
