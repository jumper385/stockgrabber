const mongoose = require('mongoose')
console.log(process.env.DATABASE)
mongoose.connect(`mongodb://db`, { useNewUrlParser: true, useUnifiedTopology: true })

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