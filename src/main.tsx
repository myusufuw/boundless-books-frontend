import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import MainLayout from "./layout/main-layout.tsx"
import Author from "./routes/author.tsx"
import ProductDetail from "./routes/product-detail.tsx"
import { Product, loader as ProductLoader } from "./routes/product.tsx"

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Product />,
        loader: ProductLoader,
      },
      {
        path: "/product/:slug",
        element: <ProductDetail />,
      },
      {
        path: "/author/:slug",
        element: <Author />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
