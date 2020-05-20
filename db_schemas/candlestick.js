const mongoose = require('mongoose')
console.log(process.env.DATABASE)
mongoose.connect(`${process.env.DATABASE}`, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
console.log(db)

db.on('error', e => {
    console.log(`${new Date()}: [MONGO-DB] ${e}`)
})

const Candlestick = new mongoose.model('candlestick', {
    timestamp: Date,
    tickername: { type: String, required: true },
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number,
})

module.exports = {
    Candlestick: Candlestick
}