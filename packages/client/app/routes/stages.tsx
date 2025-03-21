import { StagesPage } from "../pages";
import type { Route } from "./+types/stages";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Stages" }, { name: "description", content: "Get stages" }];
}

export default function Stages() {
  return <StagesPage />;
}
