import { RegisterPage } from "../pages";
import type { Route } from "./+types/register";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register Page" },
    { name: "description", content: "Register Page" },
  ];
}

export default function Register() {
  return <RegisterPage />;
}
