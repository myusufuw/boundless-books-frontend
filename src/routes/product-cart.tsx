import { ActionFunctionArgs, Form, Link, useLoaderData } from "react-router-dom"
import { CiCircleMinus } from "react-icons/ci"
import { CiCirclePlus } from "react-icons/ci"
import { cookies } from "../utilities/auth"

import { Cart } from "../types/cart"
import { formatCurrency } from "../utilities/number"
import { toast } from "react-toastify"

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

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const id = formData.get("id")
  const deleteOrderItem = formData.get("deleteOrderItem")
  const reduceQuantity = formData.get("reduceQuantity")
  const addQuantity = formData.get("addQuantity")

  // DELETE ORDER ITEM
  if (deleteOrderItem) {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/orders/${deleteOrderItem}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    )
    const deleteOderItemResponse: { message: string } = await response.json()

    if (response.status !== 200) {
      toast.error(deleteOderItemResponse.message)
      return null
    } else {
      toast.success(deleteOderItemResponse.message)
      return null
    }
  }

  // REDUCE QUANTITY
  if (reduceQuantity) {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/orders/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ quantity: Number(reduceQuantity) }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    )
    const updateOderItemResponse: { message: string } = await response.json()

    if (response.status !== 200) {
      toast.error(updateOderItemResponse.message)
      return null
    } else {
      toast.success(updateOderItemResponse.message)
      return null
    }
  }

  // ADD QUANTITY
  if (addQuantity) {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/orders/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ quantity: Number(addQuantity) }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    )
    const updateOderItemResponse: { message: string } = await response.json()

    if (response.status !== 200) {
      toast.error(updateOderItemResponse.message)
      return null
    } else {
      toast.success(updateOderItemResponse.message)
      return null
    }
  }
  return null
}

const ProductCart = () => {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>

  let totalGross = 0

  data[0].OrderItem.forEach((item) => {
    totalGross += item.product.price * item.quantity
  })

  return (
    <div>
      <p className="text-2xl font-semibold mb-6">Shopping Cart</p>
      {data[0].OrderItem.length > 0 ? (
        <div className="p-6 border-slate-300 border">
          {data[0]?.OrderItem?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row justify-between py-8 border-b border-slate-300"
            >
              <div className="flex flex-row">
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
                    <Form method="PUT">
                      <input
                        name="reduceQuantity"
                        className="hidden"
                        value={item.quantity - 1}
                        readOnly
                      />
                      <input
                        name="id"
                        className="hidden"
                        value={item.id}
                        readOnly
                      />
                      <button
                        disabled={item.quantity <= 1}
                        className="disabled:text-slate-400"
                      >
                        <CiCircleMinus fontSize={24} />
                      </button>
                    </Form>

                    <p className="text-lg font-semibold">{item.quantity}</p>

                    <Form method="PUT">
                      <input
                        name="addQuantity"
                        className="hidden"
                        value={item.quantity + 1}
                        readOnly
                      />
                      <input
                        name="id"
                        className="hidden"
                        value={item.id}
                        readOnly
                      />
                      <button>
                        <CiCirclePlus fontSize={24} />
                      </button>
                    </Form>
                  </div>
                  <p className="text-lg mt-4">
                    Price: Rp. {formatCurrency(item.product.price)}
                  </p>
                  <p className="text-lg mt-1 font-semibold">
                    Total: Rp.{" "}
                    {formatCurrency(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>

              <Form method="DELETE" className="mt-4 md:mt-0">
                <input
                  name="deleteOrderItem"
                  className="hidden"
                  value={item.id}
                  readOnly
                />
                <button className="w-full self-start px-4 py-2 border bg-red-500 rounded-md text-white hover:bg-red-700">
                  Remove
                </button>
              </Form>
            </div>
          ))}

          <div className="flex flex-col md:flex-row justify-between items-start  mt-6">
            <div>
              <p className="text-lg font-semibold">
                Total Items: {data[0].OrderItem.length}
              </p>
              <p className="text-lg font-semibold mt-2">
                Total Gross: Rp. {formatCurrency(totalGross)}
              </p>
            </div>
            <button className="w-full md:w-[90px] mt-4 md:mt-0 self-center px-4 py-2 border bg-blue-500 rounded-md text-white hover:bg-blue-700">
              Buy
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col h-[60vh]">
          <p className="text-xl font-semibold">
            Your Shopping Cart is currently empty 🛒
          </p>
          <Link className="text-xl text-blue-500 mt-4 hover:underline" to="/">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  )
}

export default ProductCart
