// sets the configuration at the app level
export default class Config {
    constructor(config) {
        this.ledgers = []

        if (config.length > 0) {
            config.map((ledger) => this.ledgers.push(ledger))
        } else {
            throw new Error('Invalid config passed')
        }
    }
}
