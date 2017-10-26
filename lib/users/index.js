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
     * @param {Number} _limit
     * @return {Array} posts - All the posts that belong to the user with given username
     */
    posts: async (_username, _limit) => {

        var _query_id = await utils.query.user(_username);
        var _info = await self.info(_username);

        var limit = (typeof _limit === 'undefined') ? _info.posts.count : _limit;

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

            while (response.data.data.user.edge_owner_to_timeline_media.page_info.has_next_page && posts.length < limit) {

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

            if (posts.length > limit) {
                posts.splice(limit, posts.length);
            }

            return posts;

        } catch (error) {
            return error;
        }

    },

    /**
     * Returns username from ID
     * @module Users
     * @param {Number} _id
     * @return {String} username - Current username
     */
    username: async (_id) => {
        try {

            

        } catch (error) {
            return error;
        }
    }

}