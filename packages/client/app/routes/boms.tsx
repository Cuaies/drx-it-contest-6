import { BomsPage } from "../pages/boms";
import type { Route } from "./+types/boms";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Boms" }, { name: "description", content: "Get Boms" }];
}

export default function Home() {
  return <BomsPage />;
}
