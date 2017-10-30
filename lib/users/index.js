'use strict';

var
    Axios = require('axios');

var
    utils = require('../utils/'),
    Puppeteer = require('puppeteer'),
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

            return await utils.parser.user(response);

        } catch (error) {
            throw error.data;
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

            var posts = await utils.parser.timeline(response);
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

                posts = posts.concat(await utils.parser.timeline(response));

            }

            if (posts.length > limit) {
                posts.splice(limit, posts.length);
            }

            return posts;

        } catch (error) {
            throw error.data;
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

            var _query_id = await utils.query.user(defaults.INSTAGRAM_DEFAULT_USER);

            var response = await Axios.get(defaults.URL_INSTAGRAM_GRAPHQL_QUERY, {
                params: {
                    query_id: _query_id,
                    variables: {
                        id: _id,
                        first: 1
                    }
                }
            });

            if (response.data.data.user.edge_owner_to_timeline_media.edges.length == 0) {
                return null;
            }

            const _shortcode = response.data.data.user.edge_owner_to_timeline_media.edges[0].node.shortcode;

            const browser = await Puppeteer.launch();
            const page = await browser.newPage();

            await page.goto(defaults.URL_INSTAGRAM_MEDIA_SHORTCODE + _shortcode);

            const _username = await page.evaluate(() => document.querySelector('._2g7d5.notranslate._iadoq').title);

            return _username;

        } catch (error) {
            throw error.data;
        }
    }

}