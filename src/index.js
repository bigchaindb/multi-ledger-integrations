import Workflow from './workflow' // eslint-disable-line

(
    async () => {
        try {
            const config = [{
                'ledger': 'bdb',
                'host': 'http://localhost:9984/api/v1/', // update bdb host url
                'seed': 'abcdefghij'
            },
            {
                'ledger': 'iota',
                'host': '', // add iota host url here
                'seed': 'KHDJNDXXHKRDHDPNLIVGQWMMIEYMBOXTSXHGOQPHRFXDZCTPWGXGBEIFBKBCUZMULPMRNLATQCTIUCINM'
            }]
            const workflow = new Workflow(config)
            console.log(workflow.configuration)
            const result = await workflow.execute(
                { ns: 'bdb.user' }, { values: { name: `bdbuser-${parseInt(Math.random()*1000)}` } },
                ['iota'])
            console.log(JSON.stringify(result))
        } catch (ex) {
            console.error(ex)
        }
    }
)()
