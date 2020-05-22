const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE || 'mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
console.log(process.env.DATABASE)
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