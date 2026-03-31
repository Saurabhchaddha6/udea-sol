import { z } from "zod"

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    price: z.coerce.number().positive("Price must be positive")
  })
})

export const updateProductSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  }),
  body: z.object({
    name: z.string().optional(),
    price: z.coerce.number().positive().optional()
  })
})

export const productIdSchema = z.object({
  params: z.object({
    id: z.string().min(1)
  })
})