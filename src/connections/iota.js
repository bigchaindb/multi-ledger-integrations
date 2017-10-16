import IOTA from 'iota.lib.js'
import CryptoJS from 'crypto-js'
import sha256 from 'crypto-js/sha256'

const defaultSeed = 'KHDJNDXXHKRDHDPNLIVGQWMMIEYMBOXTSXHGOQPHRFXDZCTPWGXGBEIFBKBCUZMULPMRNLATQCTIUCINM'

// IOTA connection wrapper
export default class IotaConnection {
    constructor(options) {
        this.conn = this.getConnection(options.host)
        this.name = options.ledger
        this.seed = options.seed ? options.seed : defaultSeed
    }

    // Gets connection to the IOTA node
    getConnection(host) {
        return new IOTA({
            'provider': host
        })
    }

    // Gets the address for sending a IOTA transfer
    async getNewAddress(seed) {
        return new Promise((resolve, reject) => {
            this.conn.api.getNewAddress(seed, {}, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

    // Gets trytes from data
    getTrytes(data) {
        const hash = sha256(JSON.stringify(data))
        const str = hash.toString(CryptoJS.enc.Base64)
        const trytes = this.conn.utils.toTrytes(str)
        return trytes
    }

    // Creates a IOTA transfer
    async createTransaction(asset, metadata) {
        const data = {
            'asset': asset,
            'metadata': metadata
        }
        const trytes = this.getTrytes(data)
        const address = await this.getNewAddress(this.seed)
        const transfer = [{
            'address': address,
            'value': 0,
            'message': trytes
        }]

        let tx
        try {
            tx = await this._sendTransaction(transfer, this.seed)
            return tx[0].hash
        } catch (error) {
            console.log(error)
            return ''
        }
    }

    // Sends the IOTA transfer
    async _sendTransaction(transfer, seed) {
        return new Promise((resolve, reject) => {
            this.conn.api.sendTransfer(seed, 3, 15, transfer, {}, (err, tx) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(tx)
                }
            })
        })
    }
}

