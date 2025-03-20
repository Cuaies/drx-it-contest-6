import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  route("register", "routes/register.tsx"),
  route("login", "routes/login.tsx"),

  layout("./layouts/generic.tsx", [index("routes/home.tsx")]),
] satisfies RouteConfig;
