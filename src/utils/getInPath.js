const getInPath = (object, paths) => {
    let current = object
    for (let path of paths) {
        if (path === '') {
            continue
        }
        current = current[path]
    }
    return current
}

module.exports = getInPath