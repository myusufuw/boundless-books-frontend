import { Product } from "../../types/product"

const loader = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`)
  const product: Product[] = await response.json()
  return product
}

export default loader
