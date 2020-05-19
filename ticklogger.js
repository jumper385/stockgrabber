const WebSocket = require('ws')
const Candlestick = require('./db_schemas/candlestick').Candlestick

class TickerMaker {

    constructor(tickername = 'BTC-USD', feedlink = 'wss://ws-feed.pro.coinbase.com') {
        this.feedlink = feedlink
        this.ws = new WebSocket(this.feedlink)
        this.tickername = tickername
        this.request = {
            type: 'subscribe',
            product_ids: [tickername],
            channels: ["ticker"]
        }
        this.currenttime = null
        this.currentCandle = {}
    }

    async connect() {
        this.feed = await this.ws.on('open', () => {
            this.ws.send(JSON.stringify(this.request))
            console.log(`${this.tickername} feed initialized`)
        })

        this.ws.on('message', e => {
            let payload = JSON.parse(e)
            payload.time && this.createTicker(payload)
        })

    }

    async createTicker(payload) {

        let payloadtimestamp  = new Date(payload.time)
        let nearestmin = new Date(Math.floor(payloadtimestamp/60/1000)*1000*60)
        let candlequery = await Candlestick.find({timestamp: nearestmin, tickername: this.tickername})

        if (candlequery.length == 0){
            Candlestick.create({
                timestamp: nearestmin, 
                tickername: this.tickername,
                open: payload.price, 
                high: payload.price, 
                low: payload.price, 
                close: payload.price, 
                volume: payload.volume_24h,
            })
            console.log(`created new ${this.tickername} tick`)
            
        } else {
            let updated = await candlequery[0].updateOne({$set:{
                high: candlequery[0].high < payload.price ? payload.price : candlequery[0].high,
                low: candlequery[0].low > payload.price ? payload.price : candlequery[0].low, 
                close: payload.price, 
                volume: payload.volume_24h
            }})
            if(candlequery.length > 1){
                let repeatedDocuments = candlequery.slice(1)
                let deleted = await Promise.all(repeatedDocuments.map(doc => {
                    return doc.deleteOne()
                }))
                console.log(deleted && `deleted ${deleted.length} copies`)
            }
        }

    }

    async getData() {
        let tick = await Candlestick.find()
        return tick
    }

}

module.exports = {
    TickerMaker: TickerMaker
}