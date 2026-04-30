import {
  Box,
  LayoutGrid,
  LayoutPanelTop,
  LayoutTemplate,
  type LucideIcon,
  Package,
  ShoppingBag,
} from "lucide-react"

/** グリッドカード用アイコン（名前 → コンポーネント） */
export const REGISTRY_ITEM_ICON: Record<string, LucideIcon> = {
  "product-card": Package,
  "product-detail": LayoutPanelTop,
  "product-grid": LayoutGrid,
  "cart-summary": ShoppingBag,
  "product-page": LayoutTemplate,
}

export function getRegistryItemIcon(name: string): LucideIcon {
  return REGISTRY_ITEM_ICON[name] ?? Box
}
