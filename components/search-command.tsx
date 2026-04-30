"use client"

import { useRouter } from "next/navigation"
import * as React from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { getRegistryItemIcon } from "@/lib/registry-visuals"

type SearchEntry = {
  name: string
  title: string
  description: string
  objects: string[]
  view: string
  keywords: string
}

type SearchCommandProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function searchFilter(value: string, search: string): number {
  const q = search.toLowerCase().trim()
  if (!q) return 1
  const v = value.toLowerCase()
  return q.split(/\s+/).every((token) => v.includes(token)) ? 1 : 0
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const router = useRouter()
  const [entries, setEntries] = React.useState<SearchEntry[]>([])
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    if (open && !loaded) {
      fetch("/r/search-index.json")
        .then((r) => r.json())
        .then((data) => {
          setEntries(data)
          setLoaded(true)
        })
        .catch(() => {})
    }
  }, [open, loaded])

  const handleSelect = (name: string) => {
    onOpenChange(false)
    router.push(`/registry/${name}`)
  }

  const grouped = React.useMemo(() => {
    const groups = new Map<string, SearchEntry[]>()
    for (const entry of entries) {
      for (const obj of entry.objects) {
        const list = groups.get(obj) ?? []
        if (!list.some((e) => e.name === entry.name)) {
          list.push(entry)
        }
        groups.set(obj, list)
      }
    }
    return groups
  }, [entries])

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="コンポーネント検索"
      description="名前やオブジェクトで検索"
      filter={searchFilter}
    >
      <CommandInput placeholder="検索..." />
      <CommandList>
        <CommandEmpty>見つかりませんでした</CommandEmpty>
        {[...grouped.entries()].map(([object, items]) => (
          <CommandGroup key={object} heading={object}>
            {items.map((entry) => {
              const Icon = getRegistryItemIcon(entry.name)
              return (
                <CommandItem
                  key={entry.name}
                  value={entry.keywords}
                  onSelect={() => handleSelect(entry.name)}
                  className="gap-3"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Icon className="h-3.5 w-3.5 stroke-[1.5]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium">
                      {entry.title}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {entry.view} · {entry.objects.join(", ")}
                    </p>
                  </div>
                </CommandItem>
              )
            })}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
