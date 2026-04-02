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

export const filterSchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),
    name: z.string().optional()
  })
})