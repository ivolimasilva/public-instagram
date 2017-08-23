'use strict';

exports = module.exports = async (_response) => {

    return {
        id: _response.graphql.shortcode_media.id,
        caption: _response.graphql.shortcode_media.edge_media_to_caption.edges.length == 0 ? null : _response.graphql.shortcode_media.edge_media_to_caption.edges[0].node.text,
        shortcode: _response.graphql.shortcode_media.shortcode,
        image: _response.graphql.shortcode_media.display_url,
        dimensions: _response.graphql.shortcode_media.dimensions,
        likes: _response.graphql.shortcode_media.edge_media_preview_like.count,
        owner: {
            id: _response.graphql.shortcode_media.owner.id,
            username: _response.graphql.shortcode_media.owner.username
        },
        timestamp: _response.graphql.shortcode_media.taken_at_timestamp
    }

};