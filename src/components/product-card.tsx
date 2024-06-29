import { Link } from "react-router-dom"
import { Product } from "../types/product"

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      className="shadow-md border border-slate-200 p-4"
      to={`/product/${product.slug}`}
    >
      <img src={product.imageUrl} className="h-[200px] object-contain border" />
      <Link to="/" className="mt-3 text-xs text-slate-600 hover:underline">
        {product.author.name}
      </Link>
      <p className="mt-2 text-sm truncate">{product.title}</p>
      <p className="font-medium">
        Rp. {new Intl.NumberFormat("id-ID").format(product.price)}
      </p>
    </Link>
  )
}

export default ProductCard
