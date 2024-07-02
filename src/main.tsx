import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Slide, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Error from "./components/error.tsx"
import "./index.css"
import AuthenticationLayout from "./layout/authentication-layout.tsx"
import MainLayout from "./layout/main-layout.tsx"
import Author from "./routes/author.tsx"
import ProductDetail, {
  loader as productDetailLoader,
} from "./routes/product-detail.tsx"
import { Product, loader as productLoader } from "./routes/product.tsx"
import SignIn, { action as signInAction } from "./routes/sign-in.tsx"
import SignUp, { action as signUpAction } from "./routes/sign-up.tsx"

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Product />,
        loader: productLoader,
      },
      {
        path: "/product/:slug",
        element: <ProductDetail />,
        loader: productDetailLoader,
      },
      {
        path: "/author/:slug",
        element: <Author />,
      },
    ],
  },
  {
    element: <AuthenticationLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
        action: signInAction,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
        action: signUpAction,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme="light"
      transition={Slide}
    />
  </React.StrictMode>
)
