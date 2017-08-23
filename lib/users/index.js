'use strict';

var
    Axios = require('axios');

var
    utils = require('../utils/'),
    defaults = require('../defaults');

exports = module.exports = {

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

    }

}