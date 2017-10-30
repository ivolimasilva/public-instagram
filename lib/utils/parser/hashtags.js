'use strict';

var
    Promise = require('bluebird');

/**
 * Returns the hashtags of a search
 * @module Utils.parser
 * @param {String} _response
 * @return {Array} Hashtags - Parsed hashtags that result of given search
 */
exports = module.exports = async (_response) => {

    if (_response.status !== 200) {
        throw _response;
    }

    var hashtags = [];

    await Promise.all(_response.data.hashtags.map((node) => {
        hashtags.push({
            id: node.hashtag.id,
            name: node.hashtag.name,
            count: node.hashtag.media_count
        });
    }));

    return hashtags;

};