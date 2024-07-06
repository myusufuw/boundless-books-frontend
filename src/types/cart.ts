export interface Cart {
  id: string
  userId: string
  status: string
  createdAt: Date
  updatedAt: Date
  OrderItem: OrderItem[]
}

export interface OrderItem {
  id: string
  quantity: number
  productId: string
  orderId: string
  createdAt: Date
  updatedAt: Date
  product: Product
}

export interface Product {
  id: string
  title: string
  isbn: string
  slug: string
  publicationDate: Date
  numberOfPages: number
  length: number
  width: number
  weight: number
  language: string
  description: string
  imageUrl: string
  price: number
  authorId: string
  publisherId: string
  createdAt: Date
  updatedAt: Date
  author: Author
}

export interface Author {
  id: string
  name: string
  slug: string
  about: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}
