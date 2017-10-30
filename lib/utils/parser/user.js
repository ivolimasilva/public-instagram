'use strict';

var
    Promise = require('bluebird');

exports = module.exports = async (_response) => {

    if (_response.status !== 200) {
        throw _response;
    }

    return {
        id: _response.data.user.id,
        username: _response.data.user.username,
        name: _response.data.user.full_name,
        bio: _response.data.user.biography,
        private: _response.data.user.is_private,
        verified: _response.data.user.is_verified,
        followers: {
            count: _response.data.user.followed_by.count
        },
        follows: {
            count: _response.data.user.follows.count
        },
        image: _response.data.user.profile_pic_url_hd,
        posts: {
            count: _response.data.user.media.count
        }
    }

};