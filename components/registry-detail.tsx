"use client"

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Copy,
  ExternalLink,
  Moon,
  Sun,
} from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { RegistryDetailInstallSummary } from "@/components/registry-detail-install-summary"
import { RegistryDetailSourceTabs } from "@/components/registry-detail-source-tabs"
import { RegistryItemPreview } from "@/components/registry-item-preview"
import {
  hasScenarioExamples,
  RegistryItemScenarioPreview,
} from "@/components/registry-item-scenario-preview"
import { ShikiCodeBlock } from "@/components/shiki-code-block"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useRegistryBuiltItem } from "@/components/use-registry-built-item"
import type { RegistryItemWithMeta } from "@/lib/registry-catalog"
import {
  getRegistryNeighbors,
  getRelatedBySharedObjects,
} from "@/lib/registry-facets"
import { cn } from "@/lib/utils"

type RegistryDetailProps = {
  item: RegistryItemWithMeta
  baseUrl: string
  allItems: RegistryItemWithMeta[]
}

type Pm = "npx" | "pnpm" | "yarn" | "bun"

function typeLabel(type: string | undefined) {
  if (!type) return null
  return type.replace("registry:", "")
}

const pmCommand: Record<Pm, (itemUrl: string) => string> = {
  npx: (u) => `npx shadcn@latest add ${u}`,
  pnpm: (u) => `pnpm dlx shadcn@latest add ${u}`,
  yarn: (u) => `yarn dlx shadcn@latest add ${u}`,
  bun: (u) => `bunx shadcn@latest add ${u}`,
}

export function RegistryDetail({
  item,
  baseUrl,
  allItems,
}: RegistryDetailProps) {
  const registryJsonUrl = `${baseUrl.replace(/\/$/, "")}/r/${item.name}.json`
  const { prev, next } = getRegistryNeighbors(allItems, item.name)
  const related = getRelatedBySharedObjects(item, allItems)
  const {
    built,
    loading: builtLoading,
    errorUrl,
  } = useRegistryBuiltItem(baseUrl, item.name)

  const [pm, setPm] = React.useState<Pm>("bun")
  const [copiedInstall, setCopiedInstall] = React.useState(false)
  const [previewDark, setPreviewDark] = React.useState(false)
  const [sourceDialogOpen, setSourceDialogOpen] = React.useState(false)

  const installLine = pmCommand[pm](registryJsonUrl)

  const copyInstall = async () => {
    await navigator.clipboard.writeText(installLine)
    setCopiedInstall(true)
    window.setTimeout(() => setCopiedInstall(false), 2000)
  }

  const kind = typeLabel(item.type)
  const deps = item.dependencies ?? []
  const regDeps = item.registryDependencies ?? []
  const propsRef = item.propsReference ?? []
  const showExamples = hasScenarioExamples(item.name)
  const minVersion = item.shopify?.api?.minVersion

  return (
    <TooltipProvider delayDuration={200}>
      <div className="px-6 pb-20 pt-2 md:px-10 md:pt-3 lg:px-12">
        <div className="mx-auto max-w-[1400px]">
          <Dialog open={sourceDialogOpen} onOpenChange={setSourceDialogOpen}>
            <DialogContent
              className="flex max-h-[min(90vh,800px)] w-[min(100vw-2rem,48rem)] max-w-[min(100vw-2rem,48rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-[min(100vw-2rem,48rem)]"
              showCloseButton
            >
              <DialogHeader className="shrink-0 border-b px-6 py-4">
                <DialogTitle>Source code</DialogTitle>
              </DialogHeader>
              <div className="min-h-0 flex-1 overflow-auto px-6 pb-6">
                <RegistryDetailSourceTabs
                  built={built}
                  loading={builtLoading}
                  embedded
                />
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:items-start lg:content-start lg:gap-8 xl:gap-10">
            <div className="order-2 flex min-w-0 flex-col gap-8 lg:order-1">
              <nav
                className="flex flex-col items-start gap-2"
                aria-label="Page navigation"
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
                  Components
                </Link>
                {(prev || next) && (
                  <div className="flex flex-wrap items-center gap-2">
                    {prev && (
                      <Link
                        href={`/registry/${prev.name}`}
                        className="inline-flex max-w-full min-w-0 items-center gap-1 rounded-lg px-2 py-1 text-[12px] text-muted-foreground ring-1 ring-border/50 transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <ArrowLeft className="h-3 w-3 shrink-0" />
                        <span className="truncate">{prev.title}</span>
                      </Link>
                    )}
                    {next && (
                      <Link
                        href={`/registry/${next.name}`}
                        className="inline-flex max-w-full min-w-0 items-center gap-1 rounded-lg px-2 py-1 text-[12px] text-muted-foreground ring-1 ring-border/50 transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <span className="truncate">{next.title}</span>
                        <ArrowRight className="h-3 w-3 shrink-0" />
                      </Link>
                    )}
                  </div>
                )}
              </nav>

              <header className="w-full min-w-0">
                <div className="flex flex-col gap-4">
                  <div className="min-w-0">
                    <p className="text-[12px] text-muted-foreground">
                      <span className="font-medium text-foreground/80">
                        ec-registry
                      </span>
                      <span className="mx-1.5 text-muted-foreground/60">/</span>
                      <span className="font-mono text-[13px] text-foreground/90">
                        {item.name}
                      </span>
                    </p>
                    {kind && (
                      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {kind === "block" ? "Block" : kind}
                      </p>
                    )}
                    <h1 className="mt-2 text-[1.75rem] font-semibold leading-[1.1] tracking-tight md:text-[2rem]">
                      {item.title}
                    </h1>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <OpenInV0Button
                      name={item.name}
                      registryItemUrl={registryJsonUrl}
                      className="rounded-lg"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 rounded-lg"
                      asChild
                    >
                      <Link
                        href={registryJsonUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Open registry JSON in a new tab"
                      >
                        <ExternalLink
                          className="h-4 w-4 shrink-0"
                          aria-hidden
                        />
                        View registry JSON
                      </Link>
                    </Button>
                  </div>
                </div>
                {item.description && (
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
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

              <section
                id="install"
                className="scroll-mt-8"
                aria-labelledby="install-heading"
              >
                <h2
                  id="install-heading"
                  className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Install
                </h2>
                <div className="rounded-xl border border-border/55 bg-card p-5 shadow-sm ring-1 ring-black/3 dark:ring-white/6">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {(["npx", "pnpm", "yarn", "bun"] as const).map((k) => (
                      <Button
                        key={k}
                        type="button"
                        size="sm"
                        variant={pm === k ? "secondary" : "ghost"}
                        className="rounded-lg font-mono text-[12px]"
                        onClick={() => setPm(k)}
                      >
                        {k}
                      </Button>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <div className="min-w-0 flex-1">
                      <ShikiCodeBlock code={installLine} lang="bash" />
                    </div>
                    <Tooltip>
                      <TooltipTrigger
                        type="button"
                        className={cn(
                          buttonVariants({
                            variant: "secondary",
                            size: "icon-lg",
                          }),
                          "shrink-0 rounded-lg",
                        )}
                        onClick={() => void copyInstall()}
                      >
                        {copiedInstall ? (
                          <Check className="h-4 w-4 shrink-0" aria-hidden />
                        ) : (
                          <Copy className="h-4 w-4 shrink-0" aria-hidden />
                        )}
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        {copiedInstall
                          ? "Install command copied"
                          : "Copy install command"}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </section>

              <div className="flex scroll-mt-8 flex-col gap-6">
                <section
                  id="dependencies"
                  className="min-w-0"
                  aria-labelledby="dependencies-heading"
                >
                  <h2
                    id="dependencies-heading"
                    className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    Dependencies
                  </h2>
                  <div className="rounded-xl border border-border/55 bg-card p-5 shadow-sm ring-1 ring-black/3 dark:ring-white/6">
                    <p className="mb-3 text-[12px] font-medium text-muted-foreground">
                      npm
                    </p>
                    {deps.length > 0 ? (
                      <ul className="mb-6 flex flex-wrap gap-2">
                        {deps.map((d) => (
                          <li
                            key={d}
                            className="rounded-md bg-muted/60 px-2.5 py-1 font-mono text-[12px]"
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mb-6 text-[13px] text-muted-foreground">
                        No additional npm packages.
                      </p>
                    )}
                    <p className="mb-3 text-[12px] font-medium text-muted-foreground">
                      registryDependencies
                    </p>
                    {regDeps.length > 0 ? (
                      <ul className="flex flex-wrap gap-2">
                        {regDeps.map((d) => (
                          <li key={d}>
                            <Link
                              href={`/registry/${d}`}
                              className="inline-flex rounded-md bg-muted/60 px-2.5 py-1 font-mono text-[12px] text-foreground underline-offset-2 hover:underline"
                            >
                              {d}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-[13px] text-muted-foreground">None</p>
                    )}
                  </div>
                </section>

                <div className="min-w-0">
                  <RegistryDetailInstallSummary
                    itemName={item.name}
                    built={built}
                    loading={builtLoading}
                    errorUrl={errorUrl}
                  />
                </div>
              </div>

              <section
                id="api"
                className="scroll-mt-8"
                aria-labelledby="api-heading"
              >
                <h2
                  id="api-heading"
                  className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  API Reference
                </h2>
                <div className="rounded-xl border border-border/55 bg-card p-5 shadow-sm ring-1 ring-black/3 dark:ring-white/6">
                  {propsRef.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[480px] border-collapse text-left text-[13px]">
                        <thead>
                          <tr className="border-b border-border/60 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                            <th className="py-2 pr-4">Prop</th>
                            <th className="py-2 pr-4">Type</th>
                            <th className="py-2 pr-4">Default</th>
                            <th className="py-2">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {propsRef.map((row) => (
                            <tr
                              key={row.name}
                              className="border-b border-border/40 last:border-0"
                            >
                              <td className="py-2 pr-4 font-mono text-[12px]">
                                {row.name}
                              </td>
                              <td className="py-2 pr-4 font-mono text-[12px] text-muted-foreground">
                                {row.type}
                              </td>
                              <td className="py-2 pr-4 font-mono text-[12px] text-muted-foreground">
                                {row.default ?? "—"}
                              </td>
                              <td className="py-2 text-muted-foreground">
                                {row.description ?? "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-[13px] leading-relaxed text-muted-foreground">
                      No props table for this block. See the description and
                      source for the component signature.
                    </p>
                  )}
                </div>
              </section>

              <section
                id="shopify"
                className="scroll-mt-8"
                aria-labelledby="shopify-heading"
              >
                <h2
                  id="shopify-heading"
                  className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  Shopify metadata
                </h2>
                <div className="rounded-xl border border-border/55 bg-card p-5 shadow-sm ring-1 ring-black/3 dark:ring-white/6">
                  <dl className="grid gap-3 text-[13px] sm:grid-cols-[8rem_1fr]">
                    <dt className="font-medium text-muted-foreground">
                      objects
                    </dt>
                    <dd className="text-foreground/90">
                      {(item.shopify?.objects ?? []).length
                        ? (item.shopify?.objects ?? []).join(", ")
                        : "—"}
                    </dd>
                    <dt className="font-medium text-muted-foreground">view</dt>
                    <dd>{item.shopify?.view ?? "—"}</dd>
                    <dt className="font-medium text-muted-foreground">
                      actions
                    </dt>
                    <dd>
                      {(item.shopify?.actions ?? []).length
                        ? (item.shopify?.actions ?? []).join(", ")
                        : "—"}
                    </dd>
                    <dt className="font-medium text-muted-foreground">
                      granularity
                    </dt>
                    <dd>{item.shopify?.granularity ?? "—"}</dd>
                    <dt className="font-medium text-muted-foreground">
                      surface
                    </dt>
                    <dd>{item.shopify?.surface ?? "—"}</dd>
                    <dt className="font-medium text-muted-foreground">
                      api.minVersion
                    </dt>
                    <dd className="font-mono text-[12px]">
                      {minVersion ?? "—"}
                    </dd>
                    <dt className="font-medium text-muted-foreground">
                      fragmentExports
                    </dt>
                    <dd className="font-mono text-[12px] break-all">
                      {(item.shopify?.api?.fragmentExports ?? []).length
                        ? (item.shopify?.api?.fragmentExports ?? []).join(", ")
                        : "—"}
                    </dd>
                  </dl>

                  {related.length > 0 && (
                    <div className="mt-6 border-t border-border/40 pt-5">
                      <p className="mb-2 text-[12px] font-medium text-muted-foreground">
                        Related blocks (shared Shopify objects)
                      </p>
                      <ul className="flex flex-wrap gap-2">
                        {related.map((r) => (
                          <li key={r.name}>
                            <Link
                              href={`/registry/${r.name}`}
                              className="text-[13px] text-foreground underline-offset-2 hover:underline"
                            >
                              {r.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <div className="order-1 min-h-0 w-full max-w-full lg:sticky lg:top-3 lg:order-2 lg:self-start">
              <section
                id="preview"
                className="scroll-mt-4 lg:scroll-mt-0"
                aria-labelledby="preview-heading"
              >
                <div
                  className={cn(
                    "relative w-full max-w-full overflow-hidden rounded-2xl border border-border/40 bg-linear-to-br from-purple-600/10 via-background to-sky-500/11 p-px shadow-sm ring-1 ring-border/35 dark:from-purple-500/8 dark:via-background dark:to-blue-600/10 dark:ring-border/40",
                  )}
                >
                  <div className="flex items-center justify-between gap-2 rounded-xl bg-background/55 px-3 py-1.5 backdrop-blur-sm dark:bg-background/25">
                    <h2
                      id="preview-heading"
                      className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      Preview
                    </h2>
                    <div className="flex shrink-0 items-center gap-1">
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-md"
                        aria-label={
                          previewDark
                            ? "Show in light theme"
                            : "Show in dark theme"
                        }
                        onClick={() => setPreviewDark((d) => !d)}
                      >
                        {previewDark ? (
                          <Sun className="h-4 w-4" aria-hidden />
                        ) : (
                          <Moon className="h-4 w-4" aria-hidden />
                        )}
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-md"
                        aria-label="View source"
                        onClick={() => setSourceDialogOpen(true)}
                      >
                        <Code2 className="h-4 w-4" aria-hidden />
                      </Button>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "flow-root max-h-[min(82vh,860px)] overflow-y-auto px-4 pb-1.5 pt-3 md:px-6 md:pb-2 md:pt-3.5 [scrollbar-width:thin]",
                      previewDark && "dark",
                    )}
                  >
                    {showExamples ? (
                      <section
                        id="examples"
                        className="scroll-mt-2"
                        aria-labelledby="examples-heading"
                      >
                        <h2
                          id="examples-heading"
                          className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                          Examples
                        </h2>
                        <RegistryItemScenarioPreview name={item.name} />
                      </section>
                    ) : (
                      <div className="mx-auto flex max-w-4xl items-center justify-center py-3 md:py-4">
                        <RegistryItemPreview name={item.name} />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
