import { Link, useNavigate } from "react-router-dom"
import { Product } from "../types/product"
import { formatCurrency } from "../utilities/number"

const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate()
  return (
    <Link
      className="shadow-md border border-slate-200 p-3 flex flex-col min-w-[150px] max-w-[175px]"
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
      <p className="font-medium">Rp. {formatCurrency(product.price)}</p>
    </Link>
  )
}

export default ProductCard
