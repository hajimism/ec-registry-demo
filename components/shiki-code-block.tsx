"use client"

import * as React from "react"
import type { BundledLanguage, BundledTheme } from "shiki"
import { getSingletonHighlighter } from "shiki"
import { cn } from "@/lib/utils"

type Props = {
  code: string
  lang: BundledLanguage
  /** Optional theme override (e.g. dark in dialogs). */
  theme?: BundledTheme
  /** `embed`: dark code panel for dialog. */
  variant?: "panel" | "embed"
  className?: string
}

let highlighterPromise: ReturnType<typeof getSingletonHighlighter> | null = null

function getHighlighter() {
  highlighterPromise ??= getSingletonHighlighter({
    themes: ["github-light", "github-dark"],
    langs: [
      "bash",
      "tsx",
      "typescript",
      "javascript",
      "json",
      "css",
      "html",
      "graphql",
      "markdown",
    ],
  })
  return highlighterPromise
}

export function ShikiCodeBlock({
  code,
  lang,
  theme = "github-light",
  variant = "panel",
  className,
}: Props) {
  const [html, setHtml] = React.useState<string | null>(null)
  const [failed, setFailed] = React.useState(false)

  React.useEffect(() => {
    if (!code) {
      setHtml(null)
      setFailed(false)
      return
    }
    let cancelled = false
    void (async () => {
      try {
        const hl = await getHighlighter()
        const out = await hl.codeToHtml(code, { lang, theme })
        if (!cancelled) {
          setHtml(out)
          setFailed(false)
        }
      } catch {
        if (!cancelled) {
          setFailed(true)
          setHtml(null)
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [code, lang, theme])

  if (!code) {
    return (
      <p className="rounded-lg border border-border/40 bg-muted/40 px-3 py-2 text-[12px] text-muted-foreground">
        (no content)
      </p>
    )
  }

  if (failed) {
    return (
      <pre
        className={cn(
          "overflow-x-auto rounded-lg border border-border/40 bg-muted/50 p-3 font-mono text-[12px] leading-relaxed text-foreground/90 [scrollbar-width:thin]",
          className,
        )}
      >
        <code>{code}</code>
      </pre>
    )
  }

  if (html == null) {
    return (
      <pre
        className={cn(
          "animate-pulse overflow-x-auto rounded-lg border border-border/40 bg-muted/40 p-3 font-mono text-[12px] leading-relaxed text-muted-foreground [scrollbar-width:thin]",
          className,
        )}
      >
        {code}
      </pre>
    )
  }

  return (
    <div
      className={cn(
        "registry-shiki overflow-x-auto rounded-lg border [scrollbar-width:thin]",
        variant === "embed"
          ? "border-zinc-700/90 bg-zinc-950"
          : "border-border/50 bg-muted/50 dark:bg-muted/25",
        className,
      )}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted Shiki HTML from local `code` only
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
