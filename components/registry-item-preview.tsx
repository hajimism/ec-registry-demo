"use client"

import { CartSummary } from "@/registry/new-york/cart-summary/cart-summary"
import { defaultCart } from "@/registry/new-york/cart-summary/fixtures/default"
import { defaultProduct } from "@/registry/new-york/product-card/fixtures/default"
import { ProductCard } from "@/registry/new-york/product-card/product-card"
import { defaultProductDetail } from "@/registry/new-york/product-detail/fixtures/default"
import { ProductDetail } from "@/registry/new-york/product-detail/product-detail"
import { gridProducts } from "@/registry/new-york/product-grid/fixtures/products"
import { ProductGrid } from "@/registry/new-york/product-grid/product-grid"
import {
  mainProduct,
  relatedProducts,
  sideCart,
} from "@/registry/new-york/product-page/fixtures/default"
import { ProductPage } from "@/registry/new-york/product-page/product-page"
import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"
import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"
import { Textarea } from "@/registry/new-york/ui/textarea"

export function RegistryItemPreview({ name }: { name: string }) {
  switch (name) {
    case "button":
      return (
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button">Primary</Button>
          <Button type="button" variant="secondary">
            Secondary
          </Button>
          <Button type="button" variant="outline">
            Outline
          </Button>
        </div>
      )
    case "card":
      return (
        <div className="mx-auto w-full max-w-sm">
          <Card>
            <CardHeader>
              <CardTitle>Card</CardTitle>
              <CardDescription>
                Container for product rows, cart lines, etc.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Body</p>
            </CardContent>
            <CardFooter>
              <Button type="button" size="sm" className="w-full">
                Action
              </Button>
            </CardFooter>
          </Card>
        </div>
      )
    case "input":
      return (
        <div className="mx-auto w-full max-w-xs space-y-2">
          <Label htmlFor="demo-input">Label</Label>
          <Input id="demo-input" placeholder="Type here…" />
        </div>
      )
    case "label":
      return (
        <div className="mx-auto flex w-full max-w-xs flex-col gap-2">
          <Label htmlFor="demo-label-input">Product name</Label>
          <Input id="demo-label-input" defaultValue="Sample product" />
        </div>
      )
    case "textarea":
      return (
        <div className="mx-auto w-full max-w-md space-y-2">
          <Label htmlFor="demo-ta">Notes</Label>
          <Textarea id="demo-ta" placeholder="Multiple lines…" rows={3} />
        </div>
      )
    case "product-card":
      return (
        <div className="mx-auto w-full max-w-[220px]">
          <ProductCard product={defaultProduct} />
        </div>
      )
    case "product-detail":
      return (
        <div className="min-w-0">
          <ProductDetail product={defaultProductDetail} />
        </div>
      )
    case "product-grid":
      return (
        <div className="min-w-0 text-[13px]">
          <ProductGrid products={gridProducts} />
        </div>
      )
    case "cart-summary":
      return (
        <div className="mx-auto w-full max-w-sm text-[13px]">
          <CartSummary cart={defaultCart} />
        </div>
      )
    case "product-page":
      return (
        <div className="min-w-0 text-[13px]">
          <ProductPage
            product={mainProduct}
            relatedProducts={relatedProducts}
            cart={sideCart}
          />
        </div>
      )
    default:
      return (
        <p className="py-8 text-center text-xs text-muted-foreground">
          No preview for{" "}
          <span className="font-mono text-foreground/80">{name}</span>
        </p>
      )
  }
}
