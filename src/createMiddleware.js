const AdapterConfig = require('./AdapterConfig')
const defaultConfig = AdapterConfig.defaultConfig

const createAdapter = require('./createAdapter')

// utils
const { getInPath, setInPath } = require('./utils')

// this not works for importing typedefs.. issue!!!
/**
 * 
 * @typedef { import("./createAdapter").AdapterOptions } AdapterOptions
 */
// /**
//  * 
//  * @typedef {Object} PropertyOptions
//  * @property {any} default property value to fall-out as default.
//  * @property {AdapterOptions} items inner <properties, options> map.
//  */

// /**
//  * 
//  * @typedef {Object.<string, PropertyOptions>} AdapterOptions
//  */

/**
 * MiddlewareConfig
 * @typedef {Object} MiddlewareConfig
 * @property {AdapterConfig} [adapterConfig] configuration for adapter.
 * @property {string} [fromReqPath] path to adapte object from.
 * @property {string} [toReqPath] path to store adapted object in.
 */

/**
 * 
 * @param {AdapterOptions} options schema for adapting resived objects with created adapter.
 * @param {MiddlewareConfig} param1 Middleware configuration parameters.
 * @returns {Function} middleware function to use in express.js
 */
const createAdapterMiddleware = (options, {
    adapterConfig = defaultConfig,
    fromReqPath = 'body',
    toReqPath = 'adapted',
} = {}) => {
    if (options === null || typeof options !== 'object') {
        throw new Error('please provide adapter options object')
    }
    if (typeof fromReqPath !== 'string' || !fromReqPath.trim()) {
        throw new Error('please provide not empty path from request')
    }
    if (typeof toReqPath !== 'string' || !toReqPath.trim()) {
        throw new Error('please provide not empty path to request')
    }

    const fromPath = fromReqPath.split('.')
    const toPath = toReqPath.split('.')

    const adapter = createAdapter(options, adapterConfig)
    return (req, res, next) => {
        try {
            const object = getInPath(req, fromPath)
            setInPath(req, adapter(object), toPath)
            next()
        } catch (error) {
            next(error)
        }
    }
}

createAdapterMiddleware({
    asa: {}
})
module.exports = createAdapterMiddleware