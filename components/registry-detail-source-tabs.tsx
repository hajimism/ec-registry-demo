"use client"

import { Check, Copy, Loader2 } from "lucide-react"
import * as React from "react"
import { ShikiCodeBlock } from "@/components/shiki-code-block"
import { buttonVariants } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { BuiltRegistryFile, BuiltRegistryItem } from "@/lib/registry-built"
import { registryFileToShikiLang } from "@/lib/registry-file-lang"
import { cn } from "@/lib/utils"

type Props = {
  built: BuiltRegistryItem | null
  loading: boolean
  /** When embedded in a dialog (avoids duplicate landmark ids). */
  embedded?: boolean
}

export function RegistryDetailSourceTabs({
  built,
  loading,
  embedded = false,
}: Props) {
  const files = built?.files ?? []
  const [activeFilePath, setActiveFilePath] = React.useState<string | null>(
    null,
  )
  const [copiedPath, setCopiedPath] = React.useState<string | null>(null)

  React.useEffect(() => {
    const first = built?.files[0]?.path ?? null
    setActiveFilePath(first)
  }, [built])

  const activeFile = files.find((f) => f.path === activeFilePath) ?? files[0]

  const copyActiveSource = async () => {
    if (!activeFile?.content) return
    await navigator.clipboard.writeText(activeFile.content)
    setCopiedPath(activeFile.path)
    window.setTimeout(() => setCopiedPath(null), 2000)
  }

  if (!built) {
    if (loading) {
      return embedded ? (
        <div className="flex justify-center py-12 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
        </div>
      ) : null
    }
    return embedded ? (
      <p className="py-6 text-center text-[13px] text-muted-foreground">
        Could not load source.
      </p>
    ) : null
  }

  const inner = (
    <div className="overflow-hidden rounded-xl border border-border/55 bg-card shadow-sm ring-1 ring-black/[0.03] dark:ring-white/[0.06]">
      <div className="flex flex-wrap gap-1 border-b border-border/45 bg-muted/40 p-2 dark:bg-muted/20">
        {files.map((f) => (
          <button
            key={f.path}
            type="button"
            onClick={() => setActiveFilePath(f.path)}
            className={cn(
              "max-w-full truncate rounded-md px-2.5 py-1.5 text-left font-mono text-[11px] transition-colors",
              f.path === activeFile?.path
                ? "bg-background text-foreground shadow-sm ring-1 ring-border/50"
                : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
            )}
          >
            {fileTabLabel(f)}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2 border-b border-border/40 p-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] text-muted-foreground">
          Copying:{" "}
          <span className="font-mono text-foreground/90">
            {activeFile?.path ?? "—"}
          </span>
        </p>
        <Tooltip>
          <TooltipTrigger
            type="button"
            className={cn(
              buttonVariants({ variant: "secondary", size: "icon-sm" }),
              "shrink-0 rounded-lg",
            )}
            disabled={!activeFile?.content}
            onClick={() => void copyActiveSource()}
          >
            {copiedPath === activeFile?.path ? (
              <Check className="h-4 w-4 shrink-0" aria-hidden />
            ) : (
              <Copy className="h-4 w-4 shrink-0" aria-hidden />
            )}
          </TooltipTrigger>
          <TooltipContent side="bottom">
            {copiedPath === activeFile?.path
              ? "Source copied"
              : "Copy this file"}
          </TooltipContent>
        </Tooltip>
      </div>
      <div
        className={cn(
          "min-h-0 overflow-auto p-3 [scrollbar-width:thin]",
          embedded ? "max-h-[min(50vh,420px)]" : "max-h-[min(70vh,560px)]",
        )}
      >
        <ShikiCodeBlock
          code={activeFile?.content ?? ""}
          lang={registryFileToShikiLang(activeFile?.path ?? "")}
          theme={embedded ? "github-dark" : "github-light"}
          variant={embedded ? "embed" : "panel"}
        />
      </div>
    </div>
  )

  if (embedded) {
    return <div className="min-w-0">{inner}</div>
  }

  return (
    <section id="source" aria-labelledby="source-heading">
      <h2
        id="source-heading"
        className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground"
      >
        Source code
      </h2>
      {inner}
    </section>
  )
}

function fileTabLabel(f: BuiltRegistryFile) {
  return f.path.split("/").pop() ?? f.path
}
