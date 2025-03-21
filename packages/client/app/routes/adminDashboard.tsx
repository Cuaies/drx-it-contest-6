import { AdminDashboardPage } from "../pages/adminDashboard";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin Dashboard" },
    { name: "description", content: "Admin dashboard" },
  ];
}

export default function AdminDashboard() {
  return <AdminDashboardPage />;
}
