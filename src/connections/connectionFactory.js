import BdbConnection from '../connections/bdb'
import IotaConnection from '../connections/iota'

// connection factory
// gets the connection object for a ledger
export default function getConnection(ledgerName, options) {
    if (ledgerName === 'bdb') {
        return new BdbConnection(options)
    }

    if (ledgerName === 'iota') {
        return new IotaConnection(options)
    }

    throw new Error(`ledger: ${ledgerName} is not supported`)
}
