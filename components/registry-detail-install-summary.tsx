"use client"

import { Loader2 } from "lucide-react"
import type { BuiltRegistryItem } from "@/lib/registry-built"

type Props = {
  itemName: string
  built: BuiltRegistryItem | null
  loading: boolean
  errorUrl: string | null
}

export function RegistryDetailInstallSummary({
  itemName,
  built,
  loading,
  errorUrl,
}: Props) {
  return (
    <section id="install-files" aria-labelledby="install-files-heading">
      <h2
        id="install-files-heading"
        className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-muted-foreground"
      >
        Install output
      </h2>
      {loading && (
        <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          Loading registry item…
        </div>
      )}
      {errorUrl && (
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          Could not fetch the built{" "}
          <a className="underline hover:text-foreground" href={errorUrl}>
            registry item
          </a>
          . Locally, run{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">
            bun run registry:build
          </code>{" "}
          and confirm{" "}
          <code className="font-mono text-[12px]">/r/{itemName}.json</code> is
          served.
        </p>
      )}
      {!loading && built && (
        <div className="space-y-4 rounded-xl border border-border/55 bg-card p-4 shadow-sm ring-1 ring-black/[0.03] dark:ring-white/[0.06]">
          <div>
            <p className="mb-2 text-[12px] font-medium text-muted-foreground">
              Files (target)
            </p>
            <ul className="space-y-1.5 font-mono text-[12px] text-foreground/90">
              {built.files.map((f) => (
                <li key={f.path} className="flex flex-wrap gap-x-2 gap-y-0.5">
                  <span className="text-muted-foreground">📄</span>
                  <span>{f.target ?? f.path}</span>
                  {f.content != null && (
                    <span className="text-muted-foreground">
                      ({f.content.split("\n").length} lines)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {built.dependencies && built.dependencies.length > 0 && (
            <div>
              <p className="mb-2 text-[12px] font-medium text-muted-foreground">
                npm dependencies
              </p>
              <ul className="flex flex-wrap gap-2">
                {built.dependencies.map((dep) => (
                  <li
                    key={dep}
                    className="rounded-md bg-muted/60 px-2 py-1 font-mono text-[12px]"
                  >
                    📦 {dep}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
