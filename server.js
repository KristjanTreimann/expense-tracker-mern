// Create regular express simple server
// We use commonJS module syntax when working in backend. E.g const 'require'
const path = require('path') // to manipulate path names
const express = require('express')
const dotenv = require('dotenv') // dotenv allows us to create global variables
const colors = require('colors') // colors in console
const morgan = require('morgan') // used for logging
const connectDB = require('./config/db')

// Let dotenv know which config file to use
dotenv.config({ path: './config/config.env' })

// Call connectDB function
connectDB()

// Bring router in
const transactions = require('./routes/transactions')

// Initialize express app
const app = express()

// Use body parser for addTransaction in transactionController.js
app.use(express.json())

// add morgan. if were in dev mode use morgan. pass in dev method.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

/* // Simple route. Handle get request to /, has callback fn(takes in request,response ). Res.send sends text hello
app.get('/', (req, res) => res.send('Hello')) */

// Mount the router
// app.use('route we want to connect', filename where route is created )
// Whenever we make request to /api/... it should use to transactions.js route
app.use('/api/v1/transactions', transactions)

// Check enviroment. If production
if (process.env.NODE_ENV === 'production') {
  //set static folder to build folder
  app.use(express.static('client/build'))

  // have a route for anything if we hit we want to load index.html in the build folder -> thats the entrypoint to our react app in production
  // '*' - anything, res.sendFile(pass in file location) - you can send file,
  // use path.resolve to access it,__dirname(current directory), 'totheclientfolder', 'intobuildfolder', 'toIndex.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

// access variable from config use process.env.variablename |or| 5000
const PORT = process.env.PORT || 5000

// To run the server we want to listen the port.
// Port goes to config file and we use dotenv to get variables
// .brightYellow comes from colors module
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .brightYellow
  )
)
