'use strict';

var
    Axios = require('axios');

var
    utils = require('../utils/'),
    defaults = require('../defaults');

exports = module.exports = {

    /**
     * Returns post from shortcode
     * @module Media
     * @param {String} _shortcode
     * @return {Object} post - Post identified by shortcode
     */
    get: async (_shortcode) => {
        try {

            var response = await Axios.get(defaults.URL_INSTAGRAM_MEDIA_SHORTCODE + _shortcode, {
                params: {
                    __a: 1
                }
            });

            return await utils.parser.post(response);

        } catch (error) {
            throw error;
        }
    },

    /**
     * Returns post's comments from shortcode
     * @module Media
     * @param {String} _shortcode
     * @param {Number} _limit
     * @return {Array} comments - Array of the post's comments
     */
    comments: async (_shortcode, _limit) => {

        var _comments = [];

        try {

            var response = await Axios.get(defaults.URL_INSTAGRAM_MEDIA_SHORTCODE + _shortcode, {
                params: {
                    __a: 1
                }
            });

            // If all comments are in the media page or it's paginated
            if (!response.data.graphql.shortcode_media.edge_media_to_comment.page_info.has_next_page) {
                _comments = await utils.parser.comments(response);
            } else {

                var _query_id;

                try {
                    _query_id = await utils.query.comments(_shortcode);
                } catch (error) {
                    _query_id = defaults.INSTAGRAM_QUERY_COMMENTS;
                }

                // First request
                var response = await Axios.get(defaults.URL_INSTAGRAM_GRAPHQL_QUERY, {
                    params: {
                        query_id: _query_id,
                        variables: {
                            shortcode: _shortcode,
                            first: defaults.INSTAGRAM_DEFAULT_FIRST < _limit ? defaults.INSTAGRAM_DEFAULT_FIRST : _limit
                        }
                    }
                });

                _comments = await utils.parser.comments(response);

                var token = null;

                while (_comments.length < _limit && response.data.data.shortcode_media.edge_media_to_comment.page_info.has_next_page) {

                    token = response.data.data.shortcode_media.edge_media_to_comment.page_info.end_cursor;

                    response = await Axios.get(defaults.URL_INSTAGRAM_GRAPHQL_QUERY, {
                        params: {
                            query_id: _query_id,
                            variables: {
                                shortcode: _shortcode,
                                first: defaults.INSTAGRAM_DEFAULT_FIRST,
                                after: token
                            }
                        }
                    });

                    _comments = _comments.concat(await utils.parser.comments(response));

                }

            }

            if (_comments.length > _limit) {
                _comments.splice(_limit, _comments.length);
            }

            return _comments;

        } catch (error) {
            throw error;
        }
    }

}