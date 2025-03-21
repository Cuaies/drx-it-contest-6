import { BomsPage } from "../pages";
import type { Route } from "./+types/boms";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Boms" }, { name: "description", content: "Get Boms" }];
}

export default function Boms() {
  return <BomsPage />;
}
