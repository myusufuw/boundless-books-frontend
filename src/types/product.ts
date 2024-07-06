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
  publisher: Publisher
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

export interface Publisher {
  id: string
  name: string
  slug: string
  address: string
  createdAt: Date
  updatedAt: Date
}

export interface AuthorDetail {
  id: string
  name: string
  slug: string
  about: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
  books: Product[]
}
