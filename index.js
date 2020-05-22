require('dotenv').config()
const bots = require('./tradebot')
const mongohelper = require('./mongoose/schemas')

const logger = require('./ticklogger')
arnold = new bots.Arnold()

record1 = new logger.TickerMaker(tickername = 'tBTCUSD')
record1.candleFeed()
record1.candles.subscribe({
    next: async data => {
        let findcandle = await mongohelper.Candlestick.find({ timestamp: data.timestamp, symbol: data.symbol })
        if (findcandle.length == 0) {
            let newdoc = mongohelper.Candlestick.create(data)
            console.log(newdoc)
        } else {
            let update = await mongohelper.Candlestick.findOneAndUpdate({ timestamp: data.timestamp, symbol: data.symbol }, { $set: { data } })
            console.log(update)
        }
    }
})