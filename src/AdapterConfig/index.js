const validateConfig = require('./validateConfig')

// this variable added for documentation purposes
// ________________________________________________
const configParam = {
    clearUndefineds: false,
    clearNulls: false,
    toDefaults: {
        null: false,
        undefined: true
    }
}
// ________________________________________________

class AdapterConfig {
    static defaultConfig = new AdapterConfig()

    clearUndefineds = false
    clearNulls = false
    toDefaults = {
        null: false,
        undefined: true
    }
    constructor(config = configParam) {
        if (config === configParam) {
            return // this means undefined provided
        }
        validateConfig(config)
        this.clearUndefineds = 'clearUndefineds' in config ? config.clearUndefineds : this.clearUndefineds
        this.clearNulls = 'clearNulls' in config ? config.clearNulls : this.clearNulls

        this.toDefaults = 'toDefaults' in config ? { ...this.toDefaults, ...config.toDefaults } : this.toDefaults
    }
}

module.exports = AdapterConfig