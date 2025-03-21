import { ProductsPage } from "../pages";
import type { Route } from "./+types/products";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products" },
    { name: "description", content: "Get products" },
  ];
}

export default function Products() {
  return <ProductsPage />;
}
