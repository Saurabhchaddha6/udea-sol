import { Request, Response } from "express"
import * as productService from "../services/product.service"
import mongoose from "mongoose"


// GET /products
export const getProducts =async (req: Request, res: Response) => {
  const products =await productService.getAllProducts()
  res.status(200).json(products)
}

// GET /products/:id
export const getProductById =async (req: Request, res: Response) => {

  const product = await productService.getProductById(req.params.id)

  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  res.status(200).json(product)
}

// POST /products
export const createProduct =async (req: Request, res: Response) => {
  const { name, price } = req.body

  if (!name || price === undefined) {
    return res.status(400).json({ message: "Name and price are required" })
  }

  const product = await productService.createProduct({ name, price })


  res.status(201).json(product)
}

// PUT /products/:id
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" })
  }

  const product = await productService.updateProduct(id, req.body)

  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  res.status(200).json(product)
}
// DELETE /products/:id
export const deleteProduct =async (req: Request, res: Response) => {
  
  const id = req.params.id?.toString()

  if (!id) {
    return res.status(400).json({ message: "Invalid product ID" })
  }

  const product = await productService.deleteProduct(id)

  if (!product) {
    return res.status(404).json({ message: "Product not found" })
  }

  res.status(204).send()
}