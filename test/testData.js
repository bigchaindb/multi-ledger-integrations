/* eslint-disable */

const bdbTx = {
    'id': '290fe3e9e222882d41e0950df2e35cf8475a4e135f37e43f897b6e6e19555db5',
    'operation': 'CREATE',
    'outputs': [
        {
            'condition': {
                'details': {
                    'type': 'ed25519-sha-256',
                    'public_key': '5PMAtEZ46LahCLmQxH6DTYmBidaWwB97g9ZnbFFBPoRg'
                },
                'uri': 'ni:///sha-256;wGydIT8Askflaxkdw0ScyOmm7raaly0rIngvHrx7aoc?fpt=ed25519-sha-256&cost=131072'
            },
            'amount': '1',
            'public_keys': [
                '5PMAtEZ46LahCLmQxH6DTYmBidaWwB97g9ZnbFFBPoRg'
            ]
        }
    ],
    'inputs': [
        {
            'fulfillment': 'pGSAIEEoVQ5zjlHrxtWwQdzsLQ78YgqDDcdF3OIzS5fz2fRfgUA8oubontQBsPdO_OoYuonL1I6M6cH7MQ2apOKBO4AYzl0Vq8gXwa_GebEw_WmQ44FIHlAhsNk-b0_2xtXxBK0O',
            'fulfills': null,
            'owners_before': [
                '5PMAtEZ46LahCLmQxH6DTYmBidaWwB97g9ZnbFFBPoRg'
            ]
        }
    ],
    'version': '1.0'
}

const iotaTxHash = 'pGSAIEEoVQ5zjlHrxtWwQdzsLQ78YgqDDcdF3OIzS5fz2fRfgUA8oubontQBsPdO_OoYuonL1I6M6cH7MQ2apOKBO4AYzl0Vq8gXwa_GebEw_WmQ44FIHlAhsNk-b0_2xtXxBK0O'

export default { bdbTx, iotaTxHash }
