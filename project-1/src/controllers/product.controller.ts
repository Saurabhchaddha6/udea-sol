import { Request, Response } from "express"
import * as productService from "../services/product.service"
import mongoose from "mongoose"
import { asyncHandler } from "../utils/asyncHandler"
import { ApiError } from "../utils/ApiError"

// GET /products
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const page = Math.max(Number(req.query.page) || 1, 1)
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100)

  const filters = {
    minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
    maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
    name: req.query.name as string | undefined
  }

  const result = await productService.getAllProducts(page, limit, filters)

  res.status(200).json({
    success: true,
    ...result
  })
})

// GET /products/:id
export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID")
  }

  const product = await productService.getProductById(id)

  if (!product) {
    throw new ApiError(404, "Product not found")
  }

  res.status(200).json({
    success: true,
    data: product
  })
})

// POST /products
export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, price } = req.body

  if (!name || price === undefined) {
    throw new ApiError(400, "Name and price are required")
  }

  const product = await productService.createProduct({ name, price })

  res.status(201).json({
    success: true,
    data: product
  })
})

// PUT /products/:id
export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID")
  }

  const product = await productService.updateProduct(id, req.body)

  if (!product) {
    throw new ApiError(404, "Product not found")
  }

  res.status(200).json({
    success: true,
    data: product
  })
})

// DELETE /products/:id
export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid product ID")
  }

  const product = await productService.deleteProduct(id)

  if (!product) {
    throw new ApiError(404, "Product not found")
  }

  res.status(204).send()
})