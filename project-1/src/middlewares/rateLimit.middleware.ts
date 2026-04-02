import { Request, Response, NextFunction } from "express"
import { checkRateLimit } from "../utils/tokenBucket"

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).userId || req.ip

  const allowed = checkRateLimit(userId)

  if (!allowed) {
    return res.status(429).json({
      success: false,
      message: "Too many requests, slow down"
    })
  }

  next()
}