const util = require('util')
const { createAdapter, AdapterConfig } = require('../..');

const object = {
    title: 'Hello',
    sections: [{
        title: 'this will stay as is, because it`s primitive and theres not default option provided',
        desc: 'asa',
        picture: {
            Hello: 'assad',
            else: null
        },
        slug: null,
        elseProperty: 'this will not be included in result, as of the options structure'
    }]
}

const options = {
    'title': {},
    'desc': {},
    'sections': {
        default: [],
        items: {
            'title': {
                items: {
                    "Hey item": {
                        default: 'Hey)'
                    }
                }
            },
            'slug': {
                default: 'this is slug'
            },
            'desc': {},
            'picture': {
                items: {
                    else: {}
                }
            },
        }
    },
}

const config = new AdapterConfig({
    clearUndefineds: true,
    toDefaults: {
        null: true // default false
    }
})
const adapter = createAdapter(options, config)

console.log(util.inspect(adapter(object), {
    showHidden: true,
    depth: null
}));