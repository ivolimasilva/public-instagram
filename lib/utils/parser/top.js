'use strict';

var
    Promise = require('bluebird');

/**
 * Returns the top posts of an hashtag search
 * @module Utils.parser
 * @param {String} _response
 * @return {Array} Posts - Parsed popular posts of an hashtag
 */

exports = module.exports = async (_response) => {

    var posts = [];

    try {

        await Promise.all(_response.tag.top_posts.nodes.map((node) => {
            if (!node.is_video) {
                posts.push({
                    id: node.id,
                    caption: node.caption,
                    shortcode: node.code,
                    timestamp: node.date,
                    image: node.display_src,
                    dimensions: node.dimensions,
                    likes: {
                        count: node.likes.count
                    },
                    comments: {
                        count: node.comments.count
                    },
                    owner: {
                        id: node.owner.id
                    }
                });
            }
        }));

        return posts;

    } catch (error) {
        return error;
    }

};