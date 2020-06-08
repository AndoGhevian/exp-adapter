const AdapterConfig = require('./AdapterConfig')
const createAdapter = require('./createAdapter')

const { getInPath, setInPath } = require('./utils')

const createAdapterMiddleware = (options, {
    adapterConfig = AdapterConfig.defaultConfig,
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

module.exports = createAdapterMiddleware