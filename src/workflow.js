import getConnection from './connections/connectionFactory'
import Config from './config'

export default class Workflow {
    constructor(config) {
        this.configuration = new Config(config)
    }

    getLedgerConnections(optionalLedgers) {
        const optionalLedgerInstances = []
        // if bdb is in optional ledgers, remove it as its already there as default ledger
        if (optionalLedgers.includes('bdb')) {
            const index = optionalLedgers.indexOf('bdb')
            optionalLedgers.splice(index, 1)
        }
        optionalLedgers.forEach((element) => {
            const config = this.configuration.ledgers.find(i => i.ledger === element)
            optionalLedgerInstances.push(getConnection(element, config))
        })
        return optionalLedgerInstances
    }

    async execute(asset, metadata, optionalLedgers = []) {
        const result = []

        // create bdb object
        const bdbConnection = getConnection('bdb',
            this.configuration.ledgers.find(i => i.ledger === 'bdb'))

        // foreach optionalLedgers create object
        const optionalLedgerConnections = this.getLedgerConnections(optionalLedgers)

        // createTransaction for bdb
        const bdbCreateTx = await bdbConnection.createTransaction(asset, metadata)

        // createTransaction for each optionalLedger => result
        await Promise.all(optionalLedgerConnections.map(async (ledger) => {
            const tx = await ledger.createTransaction(asset, metadata)
            if (tx !== '') {
                result.push({ 'ledger': ledger.name, 'id': tx })
                console.log(result)
            }
        }))

        if (result.length > 0) {
            // from values in result update bdb transaction
            metadata._links = result
            const bdbTx = await bdbConnection.updateTransaction(bdbCreateTx, metadata)
            return bdbTx
        } else {
            return bdbCreateTx
        }
    }
}
