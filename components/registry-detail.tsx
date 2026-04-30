"use client"

import { ArrowLeft, Check, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { RegistryItemPreview } from "@/components/registry-item-preview"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { RegistryItemWithMeta } from "@/lib/registry-catalog"

type RegistryDetailProps = {
  item: RegistryItemWithMeta
  baseUrl: string
}

function typeLabel(type: string | undefined) {
  if (!type) return null
  return type.replace("registry:", "")
}

export function RegistryDetail({ item, baseUrl }: RegistryDetailProps) {
  const origin = baseUrl.replace(/\/$/, "")
  const [copied, setCopied] = React.useState(false)
  const installLine = `bunx shadcn@latest add ${origin}/r/${item.name}.json`

  const copyInstall = async () => {
    await navigator.clipboard.writeText(installLine)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const kind = typeLabel(item.type)

  return (
    <div className="px-6 pb-20 pt-8 md:px-10 lg:px-12">
      <nav className="mb-8" aria-label="パンくず">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          Components
        </Link>
      </nav>

      <header className="mb-10 max-w-3xl">
        {kind && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {kind === "block" ? "Block" : kind}
          </p>
        )}
        <h1 className="mt-2 text-[1.75rem] font-semibold leading-[1.1] tracking-tight md:text-[2rem]">
          {item.title}
        </h1>
        {item.description && (
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {item.objects.map((o) => (
            <span
              key={o}
              className="rounded-full bg-foreground/7 px-3 py-1 text-[12px] font-medium"
            >
              {o}
            </span>
          ))}
          {item.tags.map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="rounded-full px-3 py-1 font-normal"
            >
              {t}
            </Badge>
          ))}
        </div>
      </header>

      <section className="mb-12" aria-labelledby="preview-heading">
        <h2
          id="preview-heading"
          className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground"
        >
          プレビュー
        </h2>
        <div className="min-h-[320px] overflow-auto rounded-xl border border-border/50 bg-muted/20 p-5 md:p-8 [scrollbar-width:thin]">
          <RegistryItemPreview name={item.name} />
        </div>
      </section>

      <section className="mb-10" aria-labelledby="install-heading">
        <h2
          id="install-heading"
          className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground"
        >
          インストール
        </h2>
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <p className="mb-3 text-[13px] leading-relaxed text-muted-foreground">
            プロジェクトルートで実行してください。Fragment
            ファイルが同梱されます。
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
            <pre className="min-w-0 flex-1 overflow-x-auto rounded-lg bg-muted/60 px-4 py-3 font-mono text-[13px] leading-relaxed text-foreground/90 ring-1 ring-border/40">
              {installLine}
            </pre>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="h-9 shrink-0 gap-2 rounded-lg px-4 sm:h-auto sm:self-center"
              onClick={copyInstall}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  コピー済み
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  コピー
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      <section aria-label="その他の操作">
        <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground">
          その他
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button variant="outline" className="gap-2 rounded-lg" asChild>
            <a
              href={`${origin}/r/${item.name}.json`}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink className="h-4 w-4" />
              レジストリ JSON
            </a>
          </Button>
          <OpenInV0Button name={item.name} className="gap-2 rounded-lg" />
        </div>
      </section>
    </div>
  )
}
