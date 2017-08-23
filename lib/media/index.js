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

            return await utils.parser.post(response.data.graphql.shortcode_media);

        } catch (error) {
            return error;
        }
    }

}