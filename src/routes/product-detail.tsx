import moment from "moment"
import { useContext } from "react"
import { FaCartPlus } from "react-icons/fa"
import type { ActionFunctionArgs, Params } from "react-router-dom"
import { Form, Link, redirect, useLoaderData } from "react-router-dom"
import { toast } from "react-toastify"
import { MainContext } from "../context/main-context"
import { productDetailList } from "../data/product-detail"
import { Product as ProductType } from "../types/product"
import { cookies } from "../utilities/auth"

export const loader = async ({ params }: { params: Params<"slug"> }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/products/${params.slug}`
  )
  const product: ProductType = await response.json()
  return product
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()

  const bodyParams = {
    productId: formData.get("productId"),
  }

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
    method: "POST",
    body: JSON.stringify(bodyParams),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  })

  const addToCartResponse: { message: string } = await response.json()

  if (response.status !== 200) {
    toast.error(addToCartResponse.message)
    return null
  } else {
    toast.success(addToCartResponse.message)
    return redirect("/cart")
  }
}

const ProductDetail = () => {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>
  const { auth } = useContext(MainContext)

  return (
    <div className="flex flex-col mx-4">
      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col p-4 border gap-3">
          <img
            src={data.imageUrl}
            className="w-[200px] h-[300px] shadow-md object-cover self-center"
          />

          <Form method="post" className="md:w-full w-[200px] self-center">
            <input name="productId" className="hidden" defaultValue={data.id} />
            <button
              type="submit"
              disabled={!auth.token}
              className="w-full p-2.5 border bg-blue-600 rounded-md text-white hover:bg-blue-800 flex flex-row items-center gap-4 justify-center disabled:bg-slate-500 disabled:cursor-not-allowed"
            >
              <FaCartPlus />
              Add To Cart
            </button>
          </Form>
        </div>

        {/* DETAILS */}
        <div>
          <p className="text-2xl">{data.title}</p>
          <Link
            to={`/author/${data.author.slug}`}
            className="text-md text-blue-600 hover:underline"
          >
            {data.author.name}
          </Link>
          <div className="mt-4 border w-[200px] p-3 border-slate-400 bg-slate-50 shadow-sm rounded-md">
            <p className="text-lg font-semibold">Rp. {data.price}</p>
          </div>

          <div className="grid grid-cols-2 md:w-[500px] mt-4">
            {productDetailList(
              data.numberOfPages,
              data.publisher.name,
              moment(data.publicationDate).format("DD MMM YYYY"),
              data.weight,
              data.isbn,
              data.width,
              data.language,
              data.length
            ).map((item, index) => (
              <div key={index} className="flex flex-col mb-3">
                <p className="text-sm text-slate-500 font-semibold">
                  {item.title}
                </p>
                <p className="text-md">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="mt-4">
        <p className="text-lg font-semibold">Description: </p>
        <p className="whitespace-pre-line">{data.description}</p>
      </div>
    </div>
  )
}

export default ProductDetail
