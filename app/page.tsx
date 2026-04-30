import { RegistryHome } from "@/components/registry-home"
import { mergeRegistryMeta } from "@/lib/registry-catalog"
import registry from "@/registry.json"

export default function Home() {
  const items = mergeRegistryMeta(registry.items).filter(
    (i) => i.type === "registry:block",
  )
  return <RegistryHome items={items} />
}
