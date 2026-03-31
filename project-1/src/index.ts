import express from "express"
import productRoutes from "./routes/product.routes"
import { logger } from "./middlewares/logger"
import dotenv from "dotenv"
import { connectDB } from "./config/db"
import authRoutes from "./routes/auth.routes"
import { errorHandler } from "./middlewares/error.middleware"


dotenv.config({ path: "./.env" })
connectDB()


const app = express()

app.use(express.json())
app.use(logger)

app.use("/auth", authRoutes)

app.use("/products", productRoutes)

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Service is running" })
})

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" })
})

app.use(errorHandler)

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err)
  process.exit(1)
})

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err)
  process.exit(1)
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})