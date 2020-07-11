// Bring mongoose in
const mongoose = require('mongoose')

// We need to create schema for our models
const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true, // trim any whitespaces
    required: [true, 'Please add some text']
  },
  amount: {
    type: Number,
    required: [true, 'Please add a positive or negative number']
  },
  createdAt: {
    type: Date,
    default: Date.now // default gets inserted automatically
  }
})

// Export so we can bring it in to our controller. mongoose.model(name, schema)
module.exports = mongoose.model('Transaction', TransactionSchema)
