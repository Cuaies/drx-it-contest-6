import { RegisterPage } from "../pages";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register Page" },
    { name: "description", content: "Register Page" },
  ];
}

export default function Home() {
  return <RegisterPage />;
}
