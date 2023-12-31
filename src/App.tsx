import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/index.ts";
import ErrorPage from "@/pages/error.tsx";

// 나중에 래퍼 레이아웃 다르게 적용하기 위해 로그인페이지, 유저 페이지는 sibling 라우트 관계로 둠.
const routes: RouteObject[] = [
  {
    path: "/",
    id: "root",
    element: null,
    errorElement: <ErrorPage />,
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
