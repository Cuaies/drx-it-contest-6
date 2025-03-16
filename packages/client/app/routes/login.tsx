import { LoginPage } from "../pages";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login Page" },
    { name: "description", content: "Login Page" },
  ];
}

export default function Home() {
  return <LoginPage />;
}
