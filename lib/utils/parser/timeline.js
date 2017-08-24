'use strict';

var
    Promise = require('bluebird');

exports = module.exports = async (_response) => {

    var posts = [];

    await Promise.all(_response.data.user.edge_owner_to_timeline_media.edges.map((edge) => {
        if (!edge.node.is_video && edge.node.__typename == 'GraphImage') {
            posts.push({
                id: edge.node.id,
                caption: edge.node.edge_media_to_caption.edges.length == 0 ? null : edge.node.edge_media_to_caption.edges[0].node.text,
                shortcode: edge.node.shortcode,
                timestamp: edge.node.taken_at_timestamp,
                image: edge.node.display_url,
                dimensions: edge.node.dimensions,
                likes: {
                    count: edge.node.edge_media_preview_like.count
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