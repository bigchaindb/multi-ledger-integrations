# BigchainDB Multi-Ledger-Integrations

BigchainDB transaction integrations with other ledgers using a workflow based architecture

## Approach

1. A transaction is created in BigchainDB with some data
1. Another transaction is created in another ledger (ex: IOTA) with same data
1. The BigchainDB transcation is updated with transaction Id of transaction from other ledgers

> The metadata of the BigchainDB transaction contains a field `_links` which has the transaction ids from other ledgers

### Example

In the following example the IOTA transaction id is stored as a link in the BigchainDB transaction metadata.

```json
{
    "asset": {
        "ns": "bdb.user",
        "schema": "http://schema.bdb.user"
    },
    "metadata": {
        "values": {
            "name": "BDB User"
        },
        "_links": [
            {
                "ledger": "iota",
                "id": "YXNI9DMCZLTBKTOOTQSDOPJFGOXKTSMCCLVSKQKFQWTLELLXCFDBJXBOJEBGWENPQ9WTFAY9QMHF99999"
            }
        ]
    },
    "id": "a79a348b6de67642adb2862dd9b8bd0af344b79578184f4fc77fdacc40451e9c"
}

```

## Setup and usage

The code is structured in ES6 modules and can be used by calling the workflow.js default method with the following parameters:

1. Asset (the BigchainDB asset)
1. Metadata (again, the BigchainDB metadata)
1. Optional ledgers (at this time, only "iota" is supported)

### Configuration

The configuration section in config.js needs the following values,

1. BigchainDB server endpoint (ex: "http://localhost:29984/api/v1/")
1. Server/node endpoints for additional ledgers

### Example usage

```js
// Import the modules
// Path depends on where you are importing from
import Workflow from './workflow'

// Set the congiguration for ledger endpoints and seed
// Seed: For BDB it is used to generate a ED25519 keypair using bip39
// Seed: For IOTA this is the required seed parameter for the API
// The configuration needs to be in the following schema (a array of objects with 3 fields as defined below)
const config = [{
                    'ledger': 'bdb',
                    'host': 'http://localhost:29984/api/v1/',
                    'seed': 'abcdefghij'
                },
                {
                    'ledger': 'iota',
                    'host': '', // add IOTA node address here
                    'seed': 'KHDJNDXXHKRDHDPNLIVGQWMMIEYMBOXTSXHGOQPHRFXDZCTPWGXGBEIFBKBCUZMULPMRNLATQCTIUCINM'
                }]

// Create workflow object
const workflow = new Workflow(config)

// Execute the workflow
const result = await workflow.execute({ ns: 'bdb.user' }, { values: { name: 'bdb user' } }, ['iota'])
```

The above code snippet executes the workflow (sends transactions) with IOTA as a ledger in addition to BigchainDB and returns the BigchainDB transaction with link to IOTA transaction.
