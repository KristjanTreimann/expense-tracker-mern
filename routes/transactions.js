// Use express
const express = require('express')

// Use router
const router = express.Router()

router.get('/', (req, res) => res.send('Hello'))

// export router in order to this
module.exports = router
