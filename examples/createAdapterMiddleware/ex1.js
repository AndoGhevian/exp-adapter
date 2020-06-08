const util = require('util')
const { createAdapterMiddleware, AdapterConfig } = require('../..');

const object = {
    title: 'Hello',
    sections: [{
        title: {},
        desc: 'asa',
        picture: {
            Hello: 'assad'
        }
    }, {
        hjagsd: 'jashgda'
    }],
    vhb: 'asdad'
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
const adapterMiddleware = createAdapterMiddleware(options, {
    adapterConfig: config,
    fromReqPath: 'body....someWhere',
    toReqPath: 'adapted.pupu.lala'
});

(() => {
    const req = { body: { someWhere: object } }
    const res = {}
    adapterMiddleware(req, res, (error) => {
        if (error) {
            console.log(error)
            console.log(`error occures when trying to adapte from: req.body, to: req.adapted`)
            return
        }
        console.log(util.inspect(req, {
            showHidden: true,
            depth: null
        }));
    })
})()
