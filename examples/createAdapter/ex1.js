const util = require('util')
const { createAdapter, AdapterConfig } = require('../..');

const object = {
    title: 'Hello',
    sections: [{
        title: {},
        desc: 'asa',
        picture: {
            Hello: 'assad'
        }
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
                    "Hey item": { default: 'Hey)' }
                }
            },
            'desc': {},
            'picture': {}
        }
    },
    'kinds': {
        default: [{}, { slug: null }, { name: undefined, slug: undefined }],
        items: {
            'name': {
                default: 'name hey'
            },
            'slug': {}
        }
    },
    'tags': {
        items: {
            'name': {
                default: 'name hey'
            }
        }
    }
}

const config = new AdapterConfig({
    clearUndefineds: true
})
const adapter = createAdapter(options, config)

console.log(util.inspect(adapter(object), {
    showHidden: true,
    depth: null
}));