const mongoose = require('mongoose')
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
            console.log(`${this.tickername} feed initialized`)
            this.ws.send(JSON.stringify(this.request))
        })

        console.log(this.feed ? 'connected' : 'bad connection...')

        this.ws.on('message', e => {
            let payload = JSON.parse(e)
            this.createTicker(payload)
        })

    }

    async createTicker(payload) {
        let time = new Date(Math.floor(new Date(payload.time) / 60 / 1000) * 60 * 1000)

        if (this.currenttime - time == 0 && this.currenttime != null) {
            this.currentCandle = {
                ...this.currentCandle,
                timestamp: time,
                high: payload.price > this.currentCandle.high ? payload.price : this.currentCandle.high,
                low: payload.price < this.currentCandle.low ? payload.price : this.currentCandle.low,
                close: payload.price,
                volume: payload.volume_24h,
                tickername: this.tickername
            }
            console.log(`${time} ${this.currentCandle.tickername} is @ $${this.currentCandle.close}`)
        } else {

            if (this.currenttime) {

                if (Object.keys(this.currentCandle).length > 0) {
                    let newcandle = await this.storetick(this.currentCandle)
                    console.log(`${newcandle.timestamp} ${newcandle.tickername} closed with $${newcandle.close}`)
                }

                this.currentCandle = {
                    timestamp: time,
                    open: payload.price,
                    high: payload.price,
                    low: payload.price,
                    close: payload.price,
                    volume: payload.volume_24h,
                    tickername: this.tickername
                }

            }

            this.currenttime = time
        }
    }

    async storetick(tick) {
        let newData = await Candlestick.create(tick)
        return newData
    }

    async getData() {
        let tick = await Candlestick.find()
        return tick
    }

}

module.exports = {
    TickerMaker: TickerMaker
}