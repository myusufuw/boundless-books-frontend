import { useLoaderData, type Params } from "react-router-dom"
import { AuthorDetail } from "../types/product"
import ProductCard from "../components/product-card"

export const loader = async ({ params }: { params: Params<"slug"> }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/authors/${params.slug}`
  )
  const author: AuthorDetail = await response.json()
  return author
}

const Author = () => {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row gap-4 md:gap-10 item border-b pb-5">
        <img
          className="w-[100px] h-[100px] rounded-full object-cover shadow-md self-center"
          src={data.imageUrl}
        />
        <p className="flex-[1]">{data.about}</p>
      </div>

      {/* PRODUCT LIST */}
      <div className="grid gap-4 mt-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {data.books.map((item, index) => (
          <ProductCard product={item} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Author
