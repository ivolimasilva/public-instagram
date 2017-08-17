'use strict';

var
    defaults = require('../defaults');

exports = module.exports = {

    info: (_hashtag) => {
        return defaults.INSTAGRAM_GRAPHQL_QUERY_ID;
    },

    recent: (_hashtag) => {
        return -1;
    }

}