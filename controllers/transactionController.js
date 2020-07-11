// Bring in model and then we can use mongoose methods here like find, create, remove, etc
const Transaction = require('../models/Transaction')

// Here are all the methods that use the model to interact with database

// @desc Get all transactions
// @route GET /api/v1/transactions
// @access Public
// to get transactions from db it returns a promise so use async await
exports.getTransactions = async (req, res, next) => {
  try {
    // create a variable transactions and use model Transaction with find method to get all transactions
    // as this will be a promise use await on that
    const transaction = await Transaction.find()

    // return a response and set status 200 on that. 200 = OK. and attach some json data to this.
    // what we send back is success value, if were getting multiple pieces of data then send count
    // also actual data what well put to data property transactions
    return res.status(200).json({
      success: true,
      count: transaction.length,
      data: transaction
    })
  } catch (error) {
    return res.send(500).json({
      success: false,
      error: 'Server error'
    }) // 500 - server error
  }
}

// @desc Add transaction
// @route POST /api/v1/transactions
// @access Public
exports.addTransaction = async (req, res, next) => {
  // When we send data from the client its going to come in 'req.body.something' and in order to use req.body
  res.send('POST transaction')
}

// @desc Delete transaction
// @route DELETE /api/v1/transactions/:id  // delete needs id
// @access Public
exports.deleteTransaction = async (req, res, next) => {
  res.send('DELETE transaction')
}
