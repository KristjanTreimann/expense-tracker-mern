// Bring in model and then we can use mongoose methods here like find, create, remove, etc
const Transaction = require('../models/Transaction')
const { create } = require('../models/Transaction')

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
    return res.status(500).json({
      success: false,
      error: 'Server error'
    }) // 500 - server error
  }
}

// @desc Add transaction
// @route POST /api/v1/transactions
// @access Public
exports.addTransaction = async (req, res, next) => {
  try {
    // When we send data from the client its going to come in 'req.body.something' and in order to use req.body add app.use(express.json()) to server.js
    // we'll get that req.body.whateverdatawesend. Use destructuring to pull out text and amount from req.body
    const { text, amount } = req.body

    // create variable transaction and use mongoose create method
    // So we wanna await our model Transaction then .create and simply pass in req.body
    // You can only pass in fields that are in our model Transaction
    const transaction = await Transaction.create(req.body)

    // If this works out and we get our model created then we want to return a response 201(create and succesful)
    return res.status(201).json({
      success: true,
      data: transaction // transaction we just created
    })
  } catch (err) {
    // Check validation error
    if (err.name === 'ValidationError') {
      // Pull out validation error messages by mapping through err.error object values and for each value we want to get message
      const messages = Object.values(err.errors).map((val) => val.message)

      // 400 - client error, client didnt send what was supposed to
      return res.status(400).json({
        success: false, // false because it is an error
        error: messages // for the error we send messages array
      })
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server error'
      }) // 500 - server error
    }
  }
}

// @desc Delete transaction
// @route DELETE /api/v1/transactions/:id  // delete needs id
// @access Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    // findById to make sure it exists. req.params.id which allows to access to whatever is passed in as this id
    const transaction = await Transaction.findById(req.params.id)

    // if none found return with status 404(not found) and response with json
    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      })
    }

    // if transaction found we await to that specific transaction we pulled out from database and call remove
    // Some methods are called on actual model like .findById and some are called on resource like .remove
    await transaction.remove()

    // Once its removed we need to
    return res.status(200).json({
      success: true,
      data: {} // Send an empty object back
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    })
  }
}
