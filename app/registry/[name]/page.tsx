import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RegistryDetail } from "@/components/registry-detail"
import {
  getMergedRegistryItem,
  mergeRegistryMeta,
} from "@/lib/registry-catalog"
import registry from "@/registry.json"

type PageProps = { params: Promise<{ name: string }> }

export async function generateStaticParams() {
  return registry.items
    .filter((i) => i.type === "registry:block")
    .map((i) => ({ name: i.name }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name: slug } = await params
  const items = mergeRegistryMeta(registry.items).filter(
    (i) => i.type === "registry:block",
  )
  const item = getMergedRegistryItem(items, slug)
  if (!item) return { title: "Not found" }
  return {
    title: `${item.title} — EC Registry`,
    description: item.description,
  }
}

export default async function RegistryItemPage({ params }: PageProps) {
  const { name: slug } = await params
  const items = mergeRegistryMeta(registry.items).filter(
    (i) => i.type === "registry:block",
  )
  const item = getMergedRegistryItem(items, slug)
  if (!item) notFound()

  const baseUrl =
    (typeof registry.homepage === "string" && registry.homepage) ||
    "http://localhost:3000"

  return <RegistryDetail item={item} baseUrl={baseUrl} allItems={items} />
}
