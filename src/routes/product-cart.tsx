import { Link, useLoaderData } from "react-router-dom"
import { CiCircleMinus } from "react-icons/ci"
import { CiCirclePlus } from "react-icons/ci"
import { cookies } from "../utilities/auth"

import { Cart } from "../types/cart"
import { formatCurrency } from "../utilities/number"

export const loader = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  })

  const cart: Cart[] = await response.json()
  return cart
}

const ProductCart = () => {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>

  let totalGross = 0

  data[0].OrderItem.forEach((item) => {
    totalGross += item.product.price
  })

  return (
    <div>
      <p className="text-2xl font-semibold mb-6">Shopping Cart</p>
      <div className="p-6 border-slate-300 border">
        {data[0]?.OrderItem?.map((item, index) => (
          <div
            key={index}
            className="flex flex-row py-8 border-b border-slate-300"
          >
            <img
              src={item.product.imageUrl}
              className="object-cover w-[130px] h-[200px]"
            />

            <div className="flex flex-col ml-4 flex-1">
              <p className="text-2xl">{item.product.title}</p>
              <Link
                to={`/author/${item.product.author.slug}`}
                className="text-md text-blue-600 hover:underline"
              >
                {item.product.author.name}
              </Link>
              <div className="flex flex-row mt-4 gap-2">
                <button>
                  <CiCircleMinus fontSize={24} />
                </button>
                <p className="text-lg font-semibold">1</p>
                <button>
                  <CiCirclePlus fontSize={24} />
                </button>
              </div>
              <p className="text-lg mt-4">
                Price: Rp. {formatCurrency(item.product.price)}
              </p>
              <p className="text-lg mt-1 font-semibold">
                Total: Rp. {formatCurrency(item.product.price * item.quantity)}
              </p>
            </div>

            <button className="self-start px-4 py-2 border bg-red-500 rounded-md text-white hover:bg-red-700">
              Remove
            </button>
          </div>
        ))}

        <div className="flex flex-row justify-between items-start  mt-6">
          <div>
            <p className="text-lg font-semibold">
              Total Items: {data[0].OrderItem.length}
            </p>
            <p className="text-lg font-semibold mt-2">
              Total Gross: {formatCurrency(totalGross)}
            </p>
          </div>
          <button className="w-[90px] self-start px-4 py-2 border bg-blue-500 rounded-md text-white hover:bg-blue-700">
            Buy
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCart
