import { type RouteConfig, index, route } from "@react-router/dev/routes";

// TODO: use constants for paths
export default [
  index("routes/home.tsx"),
  route("register", "routes/register.tsx"),
  route("login", "routes/login.tsx"),
] satisfies RouteConfig;
