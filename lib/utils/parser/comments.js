'use strict';

var
    Promise = require('bluebird');

/**
 * Returns the comments of a post
 * @module Utils.parser
 * @param {String} _response
 * @return {Array} Comments - Parsed comments that belong to that post
 */
exports = module.exports = async (_comments) => {

    var comments = [];

    try {

        await Promise.all(_comments.map((edge) => {
            comments.push({
                id: edge.node.id,
                text: edge.node.text,
                timestamp: edge.node.created_at,
                owner: {
                    id: edge.node.owner.id,
                    username: edge.node.owner.username,
                    image: edge.node.owner.profile_pic_url
                }
            })
        }));

        return comments;

    } catch (error) {

    }

};