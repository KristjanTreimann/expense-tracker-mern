// Use express
const express = require('express')

// Use router
const router = express.Router()

// bring in from transactions functions from transactionController
const {
  getTransactions,
  addTransaction,
  deleteTransaction
} = require('../controllers/transactionController')

// Anytime we make a request to '/' which represents '/api/v1/transactions' from server.js because its connected to this file
// Then we can add methods here '.get()'. We make get request to that and we want to call getTransactions functions
router.route('/').get(getTransactions).post(addTransaction)

// because the delete needs an id
router.route('/:id').delete(deleteTransaction)

// export router in order to this
module.exports = router
