function validateConfig(config) {
    const error = {
        clearUndefineds: '',
        clearNulls: '',
        toDefaults: {
            null: '',
            undefined: ''
        }
    }
    let isValid = true
    if (!config) {
        isValid = false
        error.clearUndefineds = `must be [Boolean]`
        error.clearNulls = `must be [Boolean]`
        error.toDefaults = `must be [Object]`
        error.toDefaults.null = `must be [Boolean]`
        error.toDefaults.undefined = `must be [Boolean]`
    } else {
        if (('clearUndefineds' in config) && typeof config.clearUndefineds !== 'boolean') {
            isValid = false
            error.clearUndefineds = `must be [Boolean]`
        }
        if (('clearNulls' in config) && typeof config.clearNulls !== 'boolean') {
            isValid = false
            error.clearNulls = `must be [Boolean]`
        }
        if ('toDefaults' in config) {
            if (config.toDefaults === null || typeof config.toDefaults !== 'object') {
                isValid = false
                error.toDefaults = `must be [Object]`
                error.toDefaults.null = `must be [Boolean]`
                error.toDefaults.undefined = `must be [Boolean]`
                return
            }
            // if error.toDefaults is Object
            if (('null' in config.toDefaults) && typeof config.toDefaults.null !== 'boolean') {
                isValid = false
                error.toDefaults.null = `must be [Boolean]`
            }
            if (('undefined' in config.toDefaults) && typeof config.toDefaults.undefined !== 'boolean') {
                isValid = false
                error.toDefaults.undefined = `must be [Boolean]`
            }
        }
    }

    if (!isValid) {
        const errorObject = new Error(`Error occures on AdapterConfig creation:\n${JSON.stringify(error, undefined, 2)}`)
        errorObject.info = error
        throw errorObject
    }
}

module.exports = validateConfig