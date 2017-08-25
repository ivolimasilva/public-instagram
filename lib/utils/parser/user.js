'use strict';

var
    Promise = require('bluebird');

exports = module.exports = async (_user) => {

    return {
        id: _user.id,
        username: _user.username,
        name: _user.full_name,
        bio: _user.biography,
        followers: {
            count: _user.followed_by.count
        },
        follows: {
            count: _user.follows.count
        },
        image: _user.profile_pic_url_hd,
        posts: {
            count: _user.media.count
        }
    }

};