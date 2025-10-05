import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../pages/RootLayout";
import Catalog from "../pages/Catalog";
import AboutUs from "../components/AboutUs/AboutUs";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <div>404 Not Found</div>,
    children: [
      { index: true, element: <Catalog />},
      { path: "shop", element: <Catalog /> },
      { path: "about", element: <AboutUs /> },
      { path: "contact", element: <div>Контакты</div> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
