'use strict';

var
    Axios = require('axios');

var
    utils = require('../utils/'),
    defaults = require('../defaults');

exports = module.exports = {

    /**
     * Returns information about hashtag
     * @module Tags
     * @param {String} _hashtag
     * @return {Object} info - Information containing name of hashtag and its media count.
     */
    info: async (_hashtag) => {
        try {

            var response = await Axios.get(defaults.URL_INSTAGRAM_EXPLORE_TAGS + _hashtag, {
                params: {
                    __a: 1
                }
            });

            return {
                name: response.data.tag.name,
                count: response.data.tag.media.count
            };

        } catch (error) {
            throw error.data;
        }
    },

    /**
     * Returns array of posts from recent feed of an hashtag
     * @module Tags
     * @param {String} _hashtag
     * @param {Number} _limit
     * @return {Array} Array of the most recent posts that contain the hashtag
     */
    recent: async (_hashtag, _limit) => {
        var _query_id = await utils.query.tags(_hashtag);

        try {

            // First request
            var response = await Axios.get(defaults.URL_INSTAGRAM_GRAPHQL_QUERY, {
                params: {
                    query_id: _query_id || defaults.INSTAGRAM_QUERY_TAGS_RECENT,
                    variables: {
                        tag_name: _hashtag,
                        first: defaults.INSTAGRAM_DEFAULT_FIRST < _limit ? defaults.INSTAGRAM_DEFAULT_FIRST : _limit
                    }
                }
            });

            var posts = await utils.parser.posts(response);

            var token = null;

            while (posts.length < _limit && response.data.data.hashtag.edge_hashtag_to_media.page_info.has_next_page) {

                token = response.data.data.hashtag.edge_hashtag_to_media.page_info.end_cursor;

                response = await Axios.get(defaults.URL_INSTAGRAM_GRAPHQL_QUERY, {
                    params: {
                        query_id: _query_id || defaults.INSTAGRAM_QUERY_TAGS_RECENT,
                        variables: {
                            tag_name: _hashtag,
                            first: defaults.INSTAGRAM_DEFAULT_FIRST,
                            after: token
                        }
                    }
                });

                posts = posts.concat(await utils.parser.posts(response));

            }

            if (posts.length > _limit) {
                posts.splice(_limit, posts.length);
            }

            return posts;

        } catch (error) {
            throw error.response.data;
        }

    },

    /**
     * Returns array of the top posts of an hashtag
     * @module Tags
     * @param {String} _hashtag
     * @return {Array} Array of the most popular posts that contain the hashtag
     */
    top: async (_hashtag) => {
        try {

            var response = await Axios.get(defaults.URL_INSTAGRAM_EXPLORE_TAGS + _hashtag, {
                params: {
                    __a: 1
                }
            });

            return await utils.parser.top(response);

        } catch (error) {
            throw error.data;
        }
    },

    /**
     * Returns search results (only hashtags) that match query
     * @module Tags
     * @param {String} _hashtag
     * @return {Array} info - Information about the hashtags that match query
     */
    search: async (_hashtag) => {
        try {

            var response = await Axios.get(defaults.URL_INSTAGRAM_TOP_SEARCH, {
                params: {
                    query: _hashtag
                }
            });

            return await utils.parser.hashtags(response);

        } catch (error) {
            throw error.data;
        }
    }

}