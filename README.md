# BigchainDB Multi-Ledger-Integrations

BigchainDB transaction integrations with other ledgers using a workflow based architecture.

## Approach

1. A transactions is created in BigchainDB with some data
1. Another transaction is created in another ledger (ex: IOTA) with same data
1. The BigchainDB transcation is updated with transaction Id of transaction from other ledgers

> The metadata of the BigchainDB transaction contains a field `_links` which has the transaction ids from other ledgers.

### Example

In the following example the IOTA transaction id is stored as a link in the BigchainDB transaction metadata.

```json
{
    "asset": {
        "ns": "bdb.user",
        "schema": "http://schema.bdb.user"
    },
    "metadata": {
        "_data": {
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

The configuration section in config.js needs two values,

1. BigchainDB server url (ex: "http://localhost:29984/api/v1/")
1. IOTA node url (ex: "http://node02.iotatoken.nl:14265/")

### Example usage

```js
import * as workflow from 'bdb-ledgers'
workflow.setConfig({
    [
        {
            "ledger": "bdb",
            "server": "http://localhost:29984/api/v1/"
        },
        {
            "ledger": "iota",
            "server": "http://node02.iotatoken.nl:14265/"
        },
        ...
    ]
})
workflow.execute(asset, metadata, "iota")
```

The above code snippet does the following,

1. Imports the modules
1. Sets the server configurations
1. Executes the workflow with IOTA as an additional ledger