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

    var hashtags = [];
    try {
        await Promise.all(_response.hashtags.map((node) => {
            hashtags.push({
                id: node.hashtag.id,
                name: node.hashtag.name,
                count: node.hashtag.media_count
            });
        }));

        return hashtags;
    } catch (error) {
        return error;
    }

};