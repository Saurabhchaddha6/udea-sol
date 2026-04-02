import { Router } from "express"
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller"
import { authenticate } from "../middlewares/auth.middleware"
import { validate } from "../middlewares/validate.middleware"
import {
  createProductSchema,
  updateProductSchema,
  productIdSchema,
  filterSchema
} from "../validators/product.validator"
import { rateLimiter } from "../middlewares/rateLimit.middleware"


const router = Router()

router.use(authenticate)
router.use(rateLimiter)

router.get("/", validate(filterSchema), getProducts)
router.get("/:id", validate(productIdSchema), getProductById)
router.post("/", validate(createProductSchema), createProduct)
router.put("/:id", validate(updateProductSchema), updateProduct)
router.delete("/:id", validate(productIdSchema), deleteProduct)

export default router