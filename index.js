const mongoose = require('mongoose')
const bots = require('./tradebot')

const logger = require('./ticklogger')
arnold = new bots.Arnold()

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })

record1 = new logger.TickerMaker(tickername = 'BTC-USD').connect()
record2 = new logger.TickerMaker(tickername = 'ETH-USD').connect()