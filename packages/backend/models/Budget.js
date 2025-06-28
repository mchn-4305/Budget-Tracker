const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.SchemaTypes.ObjectId, required: true, unique: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  period: { type: String, required: true },
  startDate: { type: Date, required: true, default: Date.now },
  endDate: { type: Date, required: true, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Budget", budgetSchema);
