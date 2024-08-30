import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeView from "./page/HomeView";
import AboutView from "./page/AboutView";
import CartView from "./page/CartView";
import ProductView from "./page/ProductView";
import OrderView from "./page/OrderView";
import LoginView from "./page/auth/LoginView";
import RegisterView from "./page/auth/RegisterView";
import PublicLayout from "./layouts/PublicLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: "/about",
        element: <AboutView />,
      },
      {
        path: "/cart",
        element: <CartView />,
      },
      {
        path: "/product",
        element: <ProductView />,
      },
      {
        path: "/order",
        element: <OrderView />,
      },
      {
        path: "/login",
        element: <LoginView />,
      },
      {
        path: "/register",
        element: <RegisterView />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
