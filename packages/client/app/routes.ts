import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/generic.tsx", [
    route("register", "routes/register.tsx"),
    route("login", "routes/login.tsx"),

    index("routes/home.tsx"),
    route("materials", "routes/materials.tsx"),
    route("products", "routes/products.tsx"),
  ]),
] satisfies RouteConfig;
