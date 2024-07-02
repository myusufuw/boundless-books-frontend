import { Link, useNavigate } from "react-router-dom"
import { Product } from "../types/product"

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate()
  return (
    <Link
      className="shadow-md border border-slate-200 p-3 flex flex-col"
      to={`/product/${product.slug}`}
    >
      <img src={product.imageUrl} className="h-[200px] object-cover border" />
      <p
        onClick={() => navigate(`/author/${product.author.name}`)}
        className="mt-3 text-xs text-slate-600 hover:underline"
      >
        {product.author.name}
      </p>
      <p className="mt-2 text-sm truncate">{product.title}</p>
      <p className="font-medium">
        Rp. {new Intl.NumberFormat("id-ID").format(product.price)}
      </p>
    </Link>
  )
}

export default ProductCard
