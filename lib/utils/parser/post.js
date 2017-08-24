'use strict';

/**
 * Returns the post of a media query
 * @module Utils.parser
 * @param {String} _response
 * @return {Object} Post - Parsed post that result of given media query
 */
exports = module.exports = async (_post) => {

    if (_post.__typename == 'GraphImage') {
        return {
            id: _post.id,
            caption: _post.edge_media_to_caption.edges.length == 0 ? null : _post.edge_media_to_caption.edges[0].node.text,
            shortcode: _post.shortcode,
            image: _post.display_url,
            dimensions: _post.dimensions,
            likes: {
                count: _post.edge_media_preview_like.count
            },
            comments: {
                count: _post.edge_media_to_comment.count
            },
            owner: {
                id: _post.owner.id,
                username: _post.owner.username
            },
            timestamp: _post.taken_at_timestamp
        }
    } else {
        return null;
    }

};