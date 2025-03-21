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

    index("routes/adminDashboard.tsx"),
    route("materials", "routes/materials.tsx"),
    route("products", "routes/products.tsx"),
    route("boms", "routes/boms.tsx"),
    route("stages", "routes/stages.tsx"),
  ]),
] satisfies RouteConfig;
