const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })

const Candlestick = new mongoose.model('candlestick', {
    timestamp: Date,
    symbol: { type: String, required: true },
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    volume: Number,
})

module.exports = {
    Candlestick: Candlestick
}