const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.SchemaTypes.ObjectId, required: true, unique: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, default: null },
    date: { type: Date, default: Date.now },
    createdAt: { type: Date, immutable: true, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Transaction", transactionSchema)