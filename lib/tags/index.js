'use strict';

var
    Axios = require('axios'),
    Promise = require('bluebird');

var
    defaults = require('../defaults');

exports = module.exports = {

    info: (_hashtag) => {
        return new Promise((resolve, reject) => {
            Axios.get(defaults.URL_INSTAGRAM_EXPLORE_TAGS + _hashtag, {
                params: {
                    __a: 1
                }
            })
                .then((response) => {
                    resolve({
                        name: response.data.tag.name,
                        count: response.data.tag.media.count
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    recent: (_hashtag) => {
        return -1;
    }

}