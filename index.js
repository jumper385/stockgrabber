require('dotenv').config()
const bots = require('./tradebot')
const express = require('express')
const schemas = require('./db_schemas/candlestick')

const logger = require('./ticklogger')
arnold = new bots.Arnold()
app = express()

record1 = new logger.TickerMaker(tickername = 'BTC-USD').connect()
record2 = new logger.TickerMaker(tickername = 'ETH-USD').connect()
record2 = new logger.TickerMaker(tickername = 'LTC-USD').connect()
record2 = new logger.TickerMaker(tickername = 'LINK-USD').connect()
record2 = new logger.TickerMaker(tickername = 'XRP-USD').connect()
record2 = new logger.TickerMaker(tickername = 'REP-USD').connect()
record2 = new logger.TickerMaker(tickername = 'BCH-USD').connect()  

app.get('/', async(req,res) => {
    res.json(await schemas.Candlestick.find())
})

app.listen(process.env.PORT || 3000, () => console.log('api initialized'))