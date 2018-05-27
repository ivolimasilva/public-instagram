import { isImage, isVideo, isSidecar } from '../utils';

export default (media) => ({
    id: media.id,

    shortcode: media.shortcode,

    caption: media.edge_media_to_caption.edges.length === 0 ? null : media.edge_media_to_caption.edges[0].node.text,

    comments: {
        count: media.edge_media_to_comment.count,
        edges: media.edge_media_to_comment.edges ?
            media.edge_media_to_comment.edges.map(({ node }) => ({
                id: node.id,
                text: node.text,
                timestamp: node.created_at,
                owner: {
                    avatar: node.owner.profile_pic_url,
                    id: node.owner.id,
                    username: node.owner.username,
                },
            })) : [],
    },

    sources: (isImage(media) && [{ url: media.display_url, dimensions: media.dimensions }]) ||
        (isVideo(media) && [{ url: media.video_url, dimensions: media.dimensions }]) ||
        (isSidecar(media) && media.edge_sidecar_to_children.edges.map(({ node }) => ({
            url: node.display_url,
            dimensions: node.dimensions,
        }))),

    likes: {
        count: media.edge_media_preview_like.count,
        edges: media.edge_media_preview_like.edges ?
            media.edge_media_preview_like.edges.map(({ node }) => ({
                avatar: node.profile_pic_url,
                id: node.id,
                username: node.username,
            })) : [],
    },

    owner: {
        avatar: media.owner.profile_pic_url,
        id: media.owner.id,
        name: media.owner.full_name,
        username: media.owner.username,
    },

    timestamp: media.taken_at_timestamp,

    type: (isImage(media) && 'image') || (isVideo(media) && 'video') || (isSidecar(media) && 'sidecar'),
});
