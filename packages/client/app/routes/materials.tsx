import { MaterialsPage } from "../pages";
import type { Route } from "./+types/materials";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Materials" },
    { name: "description", content: "Get materials" },
  ];
}

export default function Materials() {
  return <MaterialsPage />;
}
