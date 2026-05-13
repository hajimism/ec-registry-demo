"use client"

import * as React from "react"
import type { BuiltRegistryItem } from "@/lib/registry-built"
import { builtRegistryItemJsonUrl } from "@/lib/registry-built"

export function useRegistryBuiltItem(baseUrl: string, name: string) {
  const [built, setBuilt] = React.useState<BuiltRegistryItem | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [errorUrl, setErrorUrl] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    const url = builtRegistryItemJsonUrl(baseUrl, name)
    setLoading(true)
    setErrorUrl(null)
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json() as Promise<BuiltRegistryItem>
      })
      .then((data) => {
        if (cancelled) return
        setBuilt(data)
        setLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setErrorUrl(url)
        setBuilt(null)
        setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [baseUrl, name])

  return { built, loading, errorUrl }
}
