// backend/controllers/transactionController
const Transaction = require("../models/Transaction");

const getTransactions = async (req, res) => {
  try {
    const { category, startDate, endDate, minAmount, maxAmount } = req.query;
    const { userId } = req.user.userId;
    const filter = { userId };

    if (category) {
      filter.category = category;
    }
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }
    if (minAmount || maxAmount) {
      filter.amount = {};
      if (minAmount) {
        filter.amount.$gte = parseFloat(minAmount);
      }
      if (maxAmount) {
        filter.amount.$lte = parseFloat(maxAmount);
      }
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};

const postTransaction = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;

    const transaction = new Transaction({
      userId: req.user.userId,
      amount,
      category,
      description,
      date,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { amount, category, description, date } = req.body;
  await Transaction.findOneAndUpdate(
    { _id: id, userId: req.user.userId },
    { amount, category, description, date }
  );
  res.json(200);
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  await Transaction.findOneAndDelete({ _id: id, userId: req.user.userId });
  res.json(200);
};

module.exports = {
  getTransactions,
  postTransaction,
  updateTransaction,
  deleteTransaction,
};
