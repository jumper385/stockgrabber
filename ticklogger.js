const WebSocket = require('ws') <<
    << << < HEAD
const { Subject } = require('rxjs') ===
    === =
    const Candlestick = require('./db_schemas/candlestick').Candlestick
const db = require('./db_schemas/candlestick').db >>>
    >>> > 8e1 f78e725c7e13fb16b0db01ff32dd9cda23edd

class TickerMaker {

    constructor(tickername = 'tBTCUSD', feedlink = 'wss://api-pub.bitfinex.com/ws/2') {
        this.feedlink = feedlink
        this.ws = new WebSocket(this.feedlink)
        this.tickername = tickername
        this.request = {
            event: 'subscribe',
            channel: 'candles',
            key: `trade:1m:${tickername}` //'trade:TIMEFRAME:SYMBOL'
        }
        this.currenttime = null
        this.currentCandle = {}

        // Socket Bootup
        this.candles = new Subject()
    }

    async candleFeed() {

        this.ws.on('open', () => {
            console.log(`${this.tickername} feed initialized`)
            this.ws.send(JSON.stringify(this.request))
            this.log(`${this.tickername} feed initialized`)
        })

        this.ws.on('message', e => {
            let payload = JSON.parse(e)
            switch (payload.event) {
                case 'info':
                    break
                case 'subscribed':
                    break
                default:
                    if (payload[1]) {
                        switch (payload[1].length) {
                            case 240:
                                payload[1].map(row => {
                                    let candle = {
                                        timestamp: new Date(row[0]),
                                        open: row[1],
                                        close: row[2],
                                        high: row[3],
                                        low: row[4],
                                        volume: row[5],
                                        symbol: this.request.key,
                                    }
                                    typeof payload[1][0] == 'number' && this.candles.next(candle)
                                })
                            case 6:
                                let candle = {
                                    timestamp: new Date(payload[1][0]),
                                    open: payload[1][1],
                                    close: payload[1][2],
                                    high: payload[1][3],
                                    low: payload[1][4],
                                    volume: payload[1][5],
                                    symbol: this.request.key,
                                }
                                typeof payload[1][0] == 'number' && this.candles.next(candle)

                            default:
                                break
                        }
                    }
            }
        })

    }
}

module.exports = {
    TickerMaker: TickerMaker,
}