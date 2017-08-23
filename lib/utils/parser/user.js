'use strict';

var
    Promise = require('bluebird');

exports = module.exports = async (_user) => {

    // var _posts = [];

    // await Promise.all(_user.media.nodes.map(async (node) => {
    //     if (node.__typename == 'GraphImage') {
    //         _posts.push({
    //             id: node.id,
    //             caption: node.caption,
    //             shortcode: node.code,
    //             image: node.display_url,
    //             dimensions: node.dimensions,
    //             likes: {
    //                 count: node.likes.count
    //             },
    //             comments: {
    //                 count: node.comments.count
    //             },
    //             owner: {
    //                 id: node.owner.id
    //             },
    //             timestamp: node.date
    //         });
    //     }
    // }));

    // console.log(_posts);

    return {
        id: _user.id,
        username: _user.username,
        name: _user.full_name,
        bio: _user.biography,
        followers: _user.followed_by.count,
        follows: _user.follows.count,
        image: _user.profile_pic_url_hd,
        posts: {
            count: _user.media.count
        }
    }

};