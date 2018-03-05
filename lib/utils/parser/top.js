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

    if (_response.status !== 200) {
        throw _response;
    }

    var posts = [];

    await Promise.all(_response.data.graphql.hashtag.edge_hashtag_to_top_posts.edges.map((edge) => {
        if (!edge.node.is_video) {
            posts.push({
                id: edge.node.id,
                caption: edge.node.edge_media_to_caption.edges.length == 0 ? null : edge.node.edge_media_to_caption.edges[0].node.text,
                shortcode: edge.node.shortcode,
                timestamp: edge.node.taken_at_timestamp,
                image: edge.node.display_url,
                dimensions: edge.node.dimensions,
                likes: {
                    count: edge.node.edge_liked_by.count
                },
                comments: {
                    count: edge.node.edge_media_to_comment.count
                },
                owner: {
                    id: edge.node.owner.id
                }
            });
        }
    }));

    return posts;

};