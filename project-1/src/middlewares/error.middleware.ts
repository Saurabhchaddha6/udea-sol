import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"
import { ApiError } from "../utils/ApiError"

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err)

  
  // Zod errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues
    })
  }

  // Custom API errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    })
  }

  // Fallback (unknown errors)
  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  })
}