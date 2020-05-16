const cache = require("memory-cache");

const _maskField = (field) => {
    if (field === undefined || field === null) {
        return '#'
    }
    return field
};

async function genericCache(lambda, timeout, ...items) {

    let key = 'key-';
    for (let i = 0; i < items.length; i++) {
        let current = items[i];
        key += _maskField(current);
    }

    const cacheResult = cache.get(key);

    if (cacheResult != null) {
        return cacheResult;
    }

    const events = await lambda(...items);
    cache.put(key, events, 1000 * timeout, () => {
        genericCache(lambda, timeout, ...items)
    });


    return events;

}

module.exports = {
    genericCache:genericCache
}
