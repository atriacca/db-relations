const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 7000


// Middlewares for every request
app.use(express.json()) // req.body
app.use(morgan('dev'))


// DB connect
mongoose.connect('mongodb://localhost:27017/db-relations2', {useNewUrlParser: true}, () => {
    console.log("connected to the DB")
})


// Routes
app.use("/posts", require('./routes/postRouter.js'))
app.use("/user", require('./routes/userRouter.js'))


// Error handler
app.use((err, req, res, next) => {
    console.error(err)
    return res.send({errMsg: err.message})
})

// Server Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
