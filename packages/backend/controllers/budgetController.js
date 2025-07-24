// backend/controllers/transactionController
const Budget = require("../models/Transaction");

const getBudgets = async (req, res) => {
  try {
    const { category, limit, period, endDate } = req.query;
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};
