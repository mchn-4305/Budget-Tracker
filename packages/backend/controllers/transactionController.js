const Transaction = require("../models/Transaction")

module.exports = getTransactions = async (req, res) => {
    try {
        const { category, startDate, endDate, minAmount, maxAmount } = req.query
        const filter = {}
        
        if (category) { filter.category = category }
        if (startDate || endDate) {
            filter.date = {}
            if (startDate) { filter.date.$gte = new Date(startDate) }
            if (endDate) { filter.date.$lte = new Date(endDate) }
        }
        if (minAmount || maxAmount) {
            filter.amount = {}
            if (minAmount) { filter.amount.$gte = parseFloat(minAmount) }
            if (maxAmount) { filter.amount.$lte = parseFloat(maxAmount) }
        }
        
        const transactions = Transaction.find(filter).sort({ date: -1 })
        res.status(200).json(transactions)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "server error" })
    }
}

module.exports = postTransaction = async (req, res) => {
    try {
        const { amount, category, description, date } = req.body

        const transaction = new Transaction ({
            userId: req.user.userId,
            amount,
            category,
            description,
            date
        })

        await transaction.save()
        res.status(201).json(transaction)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
}