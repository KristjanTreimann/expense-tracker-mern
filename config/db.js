const mongoose = require('mongoose')

// When using mongoose it returns a promise so use async await with try catch. Use MONGO_URI variable
const connectDB = async () => {
  try {
    // as a second perimeter use object to stop warnings mongoose could give
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })

    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    )
  } catch (err) {
    console.log(`Error: ${err.message}`.red)
    // Shuts down application when error occures
    process.exit(1)
  }
}

module.exports = connectDB
