import Workflow from './workflow' // eslint-disable-line
(
    async () => {
        try {
            const config = [{
                'ledger': 'bdb',
                'host': 'http://localhost:29984/api/v1/',
                'seed': 'abcdefghij'
            },
            {
                'ledger': 'iota',
                'host': 'http://node02.iotatoken.nl:14265/',
                'seed': 'KHDJNDXXHKRDHDPNLIVGQWMMIEYMBOXTSXHGOQPHRFXDZCTPWGXGBEIFBKBCUZMULPMRNLATQCTIUCINM'
            }]
            const workflow = new Workflow(config)
            console.log(workflow.configuration)
            const result = await workflow.execute({ ns: 'bdb.user' }, { values: { name: 'bdbUSer' } }, ['iota'])
            console.log(result)
        } catch (ex) {
            console.error(ex)
        }
    }
)()
