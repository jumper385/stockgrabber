const bots = require('./tradebot')
const mongohelper = require('./mongoose/schemas')

const logger = require('./ticklogger')
arnold = new bots.Arnold()

record1 = new logger.TickerMaker(tickername = 'tBTCUSD')
record1.candleFeed()
record1.candles.subscribe({
    next: async data => {
        console.log(data)
        let findcandle = await mongohelper.Candlestick.find({ timestamp: data.timestamp, symbol: data.symbol })
        if (findcandle.length == 0) {
            mongohelper.Candlestick.create(data)
        } else {
            findcandle[0].updateOne({ $set: { data } })
        }
    }
})