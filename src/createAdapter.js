const AdapterConfig = require('./AdapterConfig')
const { defaultConfig } = AdapterConfig

function createAdapter(options, adapterConfig = defaultConfig) {
    if (!(adapterConfig instanceof AdapterConfig)) {
        throw new Error(`adapter config expect to be instance of class "AdapterConfig"`)
    }
    const {
        clearUndefineds,
        clearNulls,
    } = adapterConfig

    return (object) => {
        const fields = Object.keys(options)
        const adapted = {}
        for (let field of fields) {
            const fieldOptions = options[field]
            const fieldValue = object[field]

            adapted[field] = optionReducer(fieldOptions, adapterConfig)(fieldValue)

            if (clearUndefineds && adapted[field] === undefined) {
                delete adapted[field]
            }
            if (clearNulls && adapted[field] === null) {
                delete adapted[field]
            }
        }
        return adapted
    }
}

const optionReducer = (options, adapterConfig) => (object) => {
    const {
        toDefaults: {
            null: nullToDefault,
            undefined: undefinedToDefault,
        },
    } = adapterConfig

    let adapted = object
    // 1. if null || undefined and toDefautl === false
    if ((object === undefined && !undefinedToDefault) || (object === null && !nullToDefault)) {
        return adapted
    }

    // 2. set defaults if needed
    if (adapted === undefined || adapted === null) {
        if ('default' in options) {
            adapted = options.default
        }
    }
    // 3. if primitive return adapted
    if (adapted === null || typeof adapted !== 'object') {
        return adapted
    }

    // 4. if no items return object
    if (!('items' in options)) {
        return adapted
    }

    const adapter = createAdapter(options.items, adapterConfig)

    // 5. if Array
    if (adapted instanceof Array) {
        const adaptedArray = []
        for (let item of adapted) {
            adaptedArray.push(adapter(item))
        }
        return adaptedArray
    }

    // 6. if object
    return adapter(adapted)
}

module.exports = createAdapter