const setInPath = (object, value, paths, { createIfUndefined = true } = {}) => {
    // find first path
    let lastPath = null
    let lastIndex = -1
    for (let path of paths) {
        lastIndex++
        if (path === '') {
            continue
        }
        lastPath = path
        break
    }
    if (!lastPath) {
        throw new Error(`invalid paths array: ${paths} provided`)
    }

    // diving in to object
    let current = object
    for (let i = lastIndex + 1; i < paths.length; i++) {
        if (paths[i] !== '') {
            if (current[lastPath] === undefined && createIfUndefined) {
                current[lastPath] = {}
            }
            current = current[lastPath]

            lastPath = paths[i]
        }
    }
    current[lastPath] = value
}

module.exports = setInPath