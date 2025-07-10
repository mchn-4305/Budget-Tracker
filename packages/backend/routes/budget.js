// backend/routes/budget.js
const express = require("express")
const router = express.Router()
const authenticate = require("../middleware/authMiddleware")
const budgetController = require("../controllers/budgetController")

router.use(authenticate)

router.get("/", budgetController.getBudgets)

router.post("/", budgetController.postBudget)

router.put("/:id", budgetController.updateBudget)

router.delete("/:id", budgetController.deleteBudget)

module.exports = router