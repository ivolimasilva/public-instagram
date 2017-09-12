'use strict';

var
    Axios = require('axios');

var
    utils = require('../utils/'),
    defaults = require('../defaults');

var self = exports = module.exports = {

    /**
     * Returns user from username
     * @module Users
     * @param {String} _username
     * @return {Object} user - User identified by username
     */
    info: async (_username) => {
        try {

            var response = await Axios.get(defaults.URL_INSTAGRAM + _username, {
                params: {
                    __a: 1
                }
            });

            return await utils.parser.user(response.data.user);

        } catch (error) {
            return error;
        }
    },

    /**
     * Returns user's posts from username
     * @module Users
     * @param {String} _username
     * @return {Array} posts - All the posts that belong to the user with given username
     */
    posts: async (_username) => {
        var _query_id = await utils.query.user(_username);
        var _info = await self.info(_username);

        try {

            // First request
            var response = await Axios.get(defaults.URL_INSTAGRAM_GRAPHQL_QUERY, {
                params: {
                    query_id: _query_id,
                    variables: {
                        id: _info.id,
                        first: defaults.INSTAGRAM_DEFAULT_FIRST
                    }
                }
            });

            var posts = await utils.parser.timeline(response.data);

            var token = null;

            while (response.data.data.user.edge_owner_to_timeline_media.page_info.has_next_page) {

                token = response.data.data.user.edge_owner_to_timeline_media.page_info.end_cursor;

                response = await Axios.get(defaults.URL_INSTAGRAM_GRAPHQL_QUERY, {
                    params: {
                        query_id: _query_id,
                        variables: {
                            id: _info.id,
                            first: defaults.INSTAGRAM_DEFAULT_FIRST,
                            after: token
                        }
                    }
                });

                posts = posts.concat(await utils.parser.timeline(response.data));

            }

            return posts;

        } catch (error) {
            return error;
        }

    }

}