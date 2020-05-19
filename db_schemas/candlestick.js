const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })

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