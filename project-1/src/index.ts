import express from "express"
import productRoutes from "./routes/product.routes"
import { logger } from "./middlewares/logger"

const app = express()

app.use(express.json())
app.use(logger)

app.use("/products", productRoutes)

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Service is running" })
})

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})