import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeView from "./page/HomeView";
import AboutView from "./page/AboutView";
import CartView from "./page/CartView";
import ProductView from "./page/ProductView";
import OrderView from "./page/OrderView";
import LoginView from "./page/auth/LoginView";
import RegisterView from "./page/auth/RegisterView";
import PublicLayout from "./layouts/PublicLayout";
import DetailProductView from "./page/DetailProductView";
import CheckoutView from "./page/CheckoutView";
import CreateProductView from "./page/CreateProductView";
import EditProductView from "./page/EditProductView";
import { loader as HomeLoader } from "./page/HomeView";
import { loader as ProductLoader } from "./page/ProductView";
import { loader as CheckoutLoader } from "./page/CheckoutView";
import { loader as OrderLoader } from "./page/OrderView";
import { loader as CreateProductLoader } from "./page/CreateProductView";
import { loader as EditProductLoader } from "./page/CreateProductView";
import { action as LoginAction } from "./page/auth/LoginView";
import { action as RegisterAction } from "./page/auth/RegisterView";
import { store } from "./store";
import ErrorView from "./page/ErrorView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <HomeView />,
        loader: HomeLoader,
      },
      {
        path: "about",
        element: <AboutView />,
      },
      {
        path: "cart",
        element: <CartView />,
      },
      {
        path: "product",
        element: <ProductView />,
        loader: ProductLoader,
      },
      {
        path: "product/create",
        element: <CreateProductView />,
        loader: CreateProductLoader(store),
      },
      {
        path: "product/:id/edit",
        element: <EditProductView />,
        loader: EditProductLoader(store),
      },
      {
        path: "product/:id",
        element: <DetailProductView />,
      },
      {
        path: "order",
        element: <OrderView />,
        loader: OrderLoader(store),
      },
      {
        path: "checkout",
        element: <CheckoutView />,
        loader: CheckoutLoader(store),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginView />,
    action: LoginAction(store),
  },
  {
    path: "/register",
    element: <RegisterView />,
    action: RegisterAction(store),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
