import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { AppShell } from "@/components/app-shell"
import { mergeRegistryMeta } from "@/lib/registry-catalog"
import registry from "@/registry.json"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: { default: "EC Registry", template: "%s — EC Registry" },
  description:
    "EC ドメイン向け shadcn レジストリ。ブロックのプレビューとインストール。",
}

const items = mergeRegistryMeta(registry.items).filter(
  (i) => i.type === "registry:block",
)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-svh font-sans antialiased font-features-['liga','kern'] selection:bg-foreground/10 selection:text-foreground`}
      >
        <AppShell items={items}>{children}</AppShell>
      </body>
    </html>
  )
}
