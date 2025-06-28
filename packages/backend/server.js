const express = require("express")
const app = express()
require('dotenv').config()
const db = require("./utils/db")
const authRoutes = require("./routes/auth")
// const transactionRoutes = require("./routes/transactions")
// const budgetRoutes = require("./routes/budgets")

db.connect().catch(err => console.error("Initial DB Connection failed:", err))

app.use(express.json())

app.use("/api/auth", authRoutes)
// app.use("/api/transactions", transactionRoutes)
// app.use("/api/budgets", budgetRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))