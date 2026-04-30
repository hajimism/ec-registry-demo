"use client"

import { Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type SidebarProps = {
  categories: { label: string; slug: string; count: number }[]
  onSearchClick?: () => void
}

const NAV_LINKS = [{ href: "/", label: "All Components" }] as const

export function Sidebar({ categories, onSearchClick }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[220px] flex-col border-r border-border/50 bg-background lg:w-[240px]">
      <div className="flex h-14 shrink-0 items-center px-5">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-tight text-foreground"
        >
          EC Registry
        </Link>
      </div>

      <div className="px-3 pb-3">
        <button
          type="button"
          onClick={onSearchClick}
          className="flex h-9 w-full items-center gap-2.5 rounded-lg bg-muted/60 px-3 text-[13px] text-muted-foreground ring-1 ring-border/40 transition-colors hover:bg-muted"
        >
          <Search className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          <span className="flex-1 text-left">検索</span>
          <kbd className="hidden rounded bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground ring-1 ring-border/60 sm:inline-block">
            ⌘K
          </kbd>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6 [scrollbar-width:thin]">
        <ul className="space-y-0.5">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "flex h-8 items-center rounded-md px-2.5 text-[13px] font-medium transition-colors",
                  pathname === link.href
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {categories.length > 0 && (
          <>
            <p className="mb-2 mt-6 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Shopify Objects
            </p>
            <ul className="space-y-0.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/?object=${cat.slug}`}
                    className={cn(
                      "flex h-8 items-center justify-between rounded-md px-2.5 text-[13px] transition-colors",
                      "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                    )}
                  >
                    <span>{cat.label}</span>
                    <span className="text-[11px] tabular-nums text-muted-foreground/70">
                      {cat.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>
    </aside>
  )
}
