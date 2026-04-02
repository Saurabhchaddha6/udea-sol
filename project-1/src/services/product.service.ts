// src/services/product.service.ts

import { Product } from "../models/product.model"

// GET ALL (pagination + filtering)
export const getAllProducts = async (
  page: number,
  limit: number,
  filters: {
    minPrice?: number
    maxPrice?: number
    name?: string
  }
) => {
  const skip = (page - 1) * limit

  const query: any = {}

  // Price filter
  if (filters.minPrice || filters.maxPrice) {
    query.price = {}

    if (filters.minPrice) {
      query.price.$gte = filters.minPrice
    }

    if (filters.maxPrice) {
      query.price.$lte = filters.maxPrice
    }
  }

  // Name search (case-insensitive)
  if (filters.name) {
    query.name = {
      $regex: filters.name,
      $options: "i"
    }
  }

  const [products, total] = await Promise.all([
    Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Product.countDocuments(query)
  ])

  return {
    products,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  }
}

// GET BY ID
export const getProductById = async (id: string) => {
  return await Product.findById(id)
}

// CREATE
export const createProduct = async (data: {
  name: string
  price: number
}) => {
  return await Product.create(data)
}

// UPDATE
export const updateProduct = async (
  id: string,
  data: { name?: string; price?: number }
) => {
  return await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  })
}

// DELETE
export const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id)
}