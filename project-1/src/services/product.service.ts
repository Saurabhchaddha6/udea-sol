import { Product } from "../models/product.model"

export const getAllProducts = async () => {
  return await Product.find()
}

export const getProductById = async (id: string) => {
  return await Product.findById(id)
}

export const createProduct = async (data: { name: string; price: number }) => {
  return await Product.create(data)
}

export const updateProduct = async (
  id: string,
  data: { name?: string; price?: number }
) => {
  return await Product.findByIdAndUpdate(id, data, { new: true })
}

export const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id)
}