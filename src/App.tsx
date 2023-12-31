import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/index.ts";

const routes: RouteObject[] = [
  {
    path: "/",
    id: "root",
    element: null,
    children: [
      { index: true, element: null },
      {
        path: ROUTE_PATHS.BOOKS,
        element: null,
      },
    ],
  },
  { path: ROUTE_PATHS.SIGN, element: null },
  {
    id: "auth",
    element: null,
    children: [
      { path: ROUTE_PATHS.USERS, element: null },
      {
        path: ROUTE_PATHS.DASHBOARD,
        element: null,
      },
    ],
  },
];

const router = createBrowserRouter(
  routes.map((route) => {
    return route;
  }),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
