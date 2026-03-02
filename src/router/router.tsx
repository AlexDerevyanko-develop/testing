import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import ProductsPage from "../pages/ProductsPage";
import Layout from "../components/Layout";

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
  notFoundComponent: NotFoundPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: ProductsPage,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/404",
  component: NotFoundPage,
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  profileRoute,
  productsRoute,
  notFoundRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
