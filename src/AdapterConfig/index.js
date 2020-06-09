const validateConfig = require('./validateConfig')

/**
 * ConfigParam
 * @typedef {Object} ConfigParam
 * @property {boolean} [clearUndefineds] determin if to clear "undefineds" from results.
 * @property {boolean} [clearNulls] determin if to clear "nulls" from results.
 * @property {Object} [toDefaults] configuration for defaults if "null" or "undefined" value occures.
 * @property {boolean} [toDefaults.null] determin if to fall-out to default if "null" occures in result.
 * @property {boolean} [toDefaults.undefined] determin if to fall-out to default if "undefined" occures in result.
 */

/**
 * class for creating adapter configuration instances
 */
class AdapterConfig {
    static defaultConfig = new AdapterConfig()

    clearUndefineds = false
    clearNulls = false
    toDefaults = {
        null: false,
        undefined: true
    }
    /**
     * 
     * @param {ConfigParam} config changes adapter configuration default settings
     */
    constructor(config) {
        if (config === undefined) {
            return
        }
        validateConfig(config)
        this.clearUndefineds = 'clearUndefineds' in config ? config.clearUndefineds : this.clearUndefineds
        this.clearNulls = 'clearNulls' in config ? config.clearNulls : this.clearNulls

        this.toDefaults = 'toDefaults' in config ? { ...this.toDefaults, ...config.toDefaults } : this.toDefaults
    }
}

module.exports = AdapterConfig