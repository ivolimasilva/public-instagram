'use strict';

var
    Promise = require('bluebird');

exports = module.exports = async (_response) => {

    var hashtags = [];

    await Promise.all(_response.hashtags.map((node) => {
        hashtags.push({
            id: node.hashtag.id,
            name: node.hashtag.name,
            count: node.hashtag.media_count
        });
    }));

    return hashtags;

};