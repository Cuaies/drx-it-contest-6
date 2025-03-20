import { MaterialsPage } from "../pages";
import { ProductsPage } from "../pages/products";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products" },
    { name: "description", content: "Get products" },
  ];
}

export default function Products() {
  return <ProductsPage />;
}
