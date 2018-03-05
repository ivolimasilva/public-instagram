'use strict';

var
    Promise = require('bluebird');

/**
 * Returns the comments of a post
 * @module Utils.parser
 * @param {String} _response
 * @return {Array} Comments - Parsed comments that belong to that post
 */
exports = module.exports = async (_response) => {

    if (_response.status !== 200) {
        throw _response;
    }

    var comments = [];

    var parent_path = _response.data.data ? _response.data.data : _response.data.graphql;
    await Promise.all(parent_path.shortcode_media.edge_media_to_comment.edges.map((edge) => {
        comments.push({
            id: edge.node.id,
            text: edge.node.text,
            timestamp: edge.node.created_at,
            owner: {
                id: edge.node.owner.id,
                username: edge.node.owner.username,
                image: edge.node.owner.profile_pic_url
            }
        })
    }));

    return comments;

};