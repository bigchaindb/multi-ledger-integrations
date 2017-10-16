import * as driver from 'bigchaindb-driver' // eslint-disable-line
import bip39 from 'bip39'

// BigchainDB connection wrapper
export default class BdbConnection {
    constructor(options) {
        this.conn = this.getConnection(options.host)
        this.name = options.ledger
        this.keypair = new driver.Ed25519Keypair(bip39.mnemonicToSeed(options.seed).slice(0, 32))
    }

    getConnection(host) {
        return new driver.Connection(host)
    }

    async createTransaction(asset, metadata) {
        const condition = driver.Transaction.makeEd25519Condition(this.keypair.publicKey, true)

        const output = driver.Transaction.makeOutput(condition)

        const transaction = driver.Transaction.makeCreateTransaction(
            asset,
            metadata,
            [output],
            this.keypair.publicKey
        )

        const txSigned = driver.Transaction.signTransaction(transaction, this.keypair.privateKey)
        let tx
        await this.conn.postTransaction(txSigned)
            .then(() => this.conn.pollStatusAndFetchTransaction(txSigned.id))
            .then(retrievedTx => {
                tx = retrievedTx
            })

        return tx
    }

    async updateTransaction(tx, metadata) {
        const condition = driver.Transaction.makeEd25519Condition(this.keypair.publicKey)

        const output = driver.Transaction.makeOutput(condition)

        const txTransfer = driver.Transaction.makeTransferTransaction(
            tx,
            metadata,
            [output],
            0
        )

        const txSigned = driver.Transaction.signTransaction(txTransfer, this.keypair.privateKey)
        let trTx
        await this.conn.postTransaction(txSigned)
            .then(() => this.conn.pollStatusAndFetchTransaction(txSigned.id))
            .then(retrievedTx => {
                trTx = retrievedTx
            })

        return trTx
    }
}

