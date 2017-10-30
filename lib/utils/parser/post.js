'use strict';

/**
 * Returns the post of a media query
 * @module Utils.parser
 * @param {String} _response
 * @return {Object} Post - Parsed post that result of given media query
 */
exports = module.exports = async (_response) => {

    if (_response.status !== 200) {
        throw _response;
    }

    if (_response.data.graphql.shortcode_media.__typename == 'GraphImage') {
        return {
            id: _response.data.graphql.shortcode_media.id,
            caption: _response.data.graphql.shortcode_media.edge_media_to_caption.edges.length == 0 ? null : _response.data.graphql.shortcode_media.edge_media_to_caption.edges[0].node.text,
            shortcode: _response.data.graphql.shortcode_media.shortcode,
            image: _response.data.graphql.shortcode_media.display_url,
            dimensions: _response.data.graphql.shortcode_media.dimensions,
            likes: {
                count: _response.data.graphql.shortcode_media.edge_media_preview_like.count
            },
            comments: {
                count: _response.data.graphql.shortcode_media.edge_media_to_comment.count
            },
            owner: {
                id: _response.data.graphql.shortcode_media.owner.id,
                username: _response.data.graphql.shortcode_media.owner.username
            },
            timestamp: _response.data.graphql.shortcode_media.taken_at_timestamp
        }
    } else {
        return null;
    }

};