import adapters from './';

export default (media) => ({
    name: media.name,

    avatar: media.profile_pic_url,

    posts: {
        count: media.edge_hashtag_to_media.count,

        top: media.edge_hashtag_to_top_posts.edges.map(({ node }) =>
            adapters.media(node)),

        recent: media.edge_hashtag_to_media.edges.map(({ node }) =>
            adapters.media(node)),
    },
});
