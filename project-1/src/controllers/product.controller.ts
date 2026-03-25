import { Request, Response } from "express"
import { Product } from "../types/product"

let products: Product[] = []
let idCounter = 1

// GET /products
export const getProducts = (req: Request, res: Response) => {
  res.status(200).json(products)
}

// GET /products/:id
export const getProductById = (req: Request, res: Response) => {
  const id = Number(req.params.id)

  const product = products.find(p => p.id === id)

  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  res.status(200).json(product)
}

// POST /products
export const createProduct = (req: Request, res: Response) => {
  const { name, price } = req.body

  if (!name || price === undefined) {
    return res.status(400).json({ message: "Name and price are required" })
  }

  if (typeof price !== "number" || price < 0) {
    return res.status(400).json({ message: "Price must be a positive number" })
  }

  const newProduct: Product = {
    id: idCounter++,
    name,
    price
  }

  products.push(newProduct)

  res.status(201).json(newProduct)
}

// PUT /products/:id
export const updateProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { name, price } = req.body

  const product = products.find(p => p.id === id)

  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  if (name !== undefined) {
    product.name = name
  }

  if (price !== undefined) {
    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({ message: "Price must be a positive number" })
    }
    product.price = price
  }

  res.status(200).json(product)
}

// DELETE /products/:id
export const deleteProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id)

  const index = products.findIndex(p => p.id === id)

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" })
  }

  products.splice(index, 1)

  res.status(204).send()
}